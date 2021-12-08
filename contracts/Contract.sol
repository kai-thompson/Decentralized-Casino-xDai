//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Pool is ERC20{
    constructor() ERC20("LPToken", "LPT") {}

    event Deposit(address sender, uint amount);
    event Withdrawal(address receiver, uint amount, uint contractBalance);

    receive() external payable {}

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
        uint amountMinted = msg.value * (msg.value * 1000000 / address(this).balance) / 1000000;
        _mint(msg.sender, amountMinted);
    }

    function withdraw(uint amount) public {
        require((balance(msg.sender) >= amount), "Insufficient Funds");

        uint amountBurned = (amount / totalSupply()) / address(this).balance;
        payable(msg.sender).transfer(amount);
        _burn(msg.sender, amountBurned);
        emit Withdrawal(msg.sender, amount, balance(msg.sender));
    }

    function balance(address _address) public view returns(uint256) {
        return address(this).balance * (balanceOf(_address) * 1000000 / totalSupply()) / 1000000;
    }

    function placeBet(uint _amount, address rouletteAddress) external {
        require(address(this).balance >= _amount, "Insufficient House Funds");
        require(msg.sender == rouletteAddress, "Function not Called by Game");
        Roulette roulette = Roulette(payable(rouletteAddress));
        roulette.houseBet{ value: _amount }();
    }
}

contract Roulette {
    enum GameStatus { PENDING, LOST, WON }
    
    event NewBet(uint value, address addr);
    event Winner(string name, uint value, string betResult, uint gameOutcome);

    address payable house;
    address payable owner;
    uint8 public loseStreak;
    uint8 public risk;

    constructor(address payable _house) { 
        house = _house;
        owner = payable(msg.sender);
        risk = 8;
    }
    
    struct Game {
        address payable betterAddress;
        uint betAmount;
        uint guess;
        uint outcome;
        GameStatus status;
    }

    Game game;

    receive() external payable {}

    function createBet(uint guess) public payable {
        //generate a bet struct based on current better
        require(msg.value <= determineMaxBet());
        owner.transfer(msg.value / 100);
        emit NewBet(msg.value, msg.sender);
        GameStatus status = GameStatus.PENDING;
        game = Game(payable(msg.sender), msg.value, guess, 0, status);
        Pool pool = Pool(house);
        pool.placeBet(msg.value * 11, address(this));
    }

    function houseBet() public payable {
        //require(msg.value == game.betAmount * 12, "Incorrect Bet Size");
        require(msg.sender == house, "Function was not Called Internally by House");
        payout();
    }

    function payout() private {
        game.outcome = generateBetOutcome();
        
        if( (game.guess == 0 && game.outcome < 17) || (game.guess == 1 && 17 <= game.outcome && game.outcome < 34) || (game.guess == 2 && game.outcome >= 34)) {
            game.status = GameStatus.WON;
        }else {
            game.status  = GameStatus.LOST;
        }

        //payout house and better based on corresponding game results
        if (game.status == GameStatus.WON) {
            loseStreak++;
            if(game.guess == 0) {
                emit Winner("PLAYER", game.betAmount * 2, "BLACK", game.outcome);
                game.betterAddress.transfer(game.betAmount * 2);
                house.transfer(address(this).balance);
            }else if (game.guess == 1) {
                emit Winner("PLAYER", game.betAmount * 2, "RED", game.outcome);
                game.betterAddress.transfer(game.betAmount * 2);
                house.transfer(address(this).balance);
            }else {
                emit Winner("PLAYER", game.betAmount * 12, "GREEN", game.outcome);
                game.betterAddress.transfer(game.betAmount * 12);
                house.transfer(address(this).balance);
            }
        }else {
            loseStreak = 0;
            emit Winner("HOUSE", 0, "LOST", game.outcome);
            house.transfer(address(this).balance);
        }
    }

    function generateBetOutcome() private view returns(uint){
         //generate a random number from 0 - 35 (36 number range)
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 36;
    }

    function adjustRisk(uint8 _risk) external {
        require(msg.sender == owner, "Function not called by owner");
        risk = _risk;
    }

    function determineMaxBet() public view returns(uint) {
        uint exp = risk - loseStreak;
        return address(house).balance / (2 ** exp) / 12;
    }
}