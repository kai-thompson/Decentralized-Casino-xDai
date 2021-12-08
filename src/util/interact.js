import { ethers } from "ethers";

const rouletteABI = require("../contracts/Roulette.json");
const poolABI = require("../contracts/Pool.json");
const rouletteAddress = "0x1C50827B5e11Cdb17C2638AAFC54294B55dd970B";
const poolAddress = "0xA34BA6F311Ad032e8F8a03Ab39f16007bf669764";


export const deposit = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const poolContract = new ethers.Contract(poolAddress, poolABI, signer);

  await poolContract
    .connect(signer)
    .deposit({ value: ethers.utils.parseEther(amount) });

  poolContract.on("Deposit", (addr, amount) => {
    console.log(addr + " Deposited" + amount + "to Pool");
  });
};

export const withdraw = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const poolContract = new ethers.Contract(poolAddress, poolABI, signer);

  await poolContract.connect(signer).withdraw(ethers.utils.parseEther(amount));

  poolContract.on("Withdrawal", (addr, amount, contratBalance) => {
    console.log(addr, "Withdrew", amount.toString(), contratBalance.toString());
  });
};

export const gamble = async (betColour, betValue) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const rouletteContract = new ethers.Contract(
    rouletteAddress,
    rouletteABI,
    signer
  );

  await rouletteContract.connect(signer).createBet(betColour, {value: ethers.utils.parseEther(betValue)});

  rouletteContract.on("NewBet", (value, addr) => {
    console.log(addr, "Bet", value.toString());
  });
  // rouletteContract.on("Winner", (winner, amount, colour, number) => {
  //   return(winner);
  // });
};

export const determineMax = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const rouletteContract = new ethers.Contract(
    rouletteAddress,
    rouletteABI,
    signer
  );

  return await rouletteContract.connect(signer).determineMaxBet();
};

export const getBalance = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const poolContract = new ethers.Contract(poolAddress, poolABI, signer);

  const { address } = await getCurrentWalletConnected();

  return await poolContract
    .connect(signer)
    .balance(address);
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
        };
      }
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
    };
  }
};
