# Decentralized-Casino/ChainBet

![FrontEnd](https://github.com/kai-thompson/Decentralized-Casino/blob/xDai-Mainnet/casino-example.png)

## Deposit & Withdrawal

Since this is a fully decentralized casino, there must be a "house" entity to pay-out gamblers. This is achieved through a pool contract, where participants can delegate ether and receive a return. A return is made possible through the implementation of the house advantage.

Upon deposit, a staker is issued an LP token to reflect their percent share in the pool. When a withdrawal is initiated, their percent share is calculated, their LP tokens are burned, and a proportional amount of ether is sent back to their wallet address.

## Betting

When placing a bet, a player chooses between either red, black, or green, and submits a transaction to the game contract. Next, the game contract calls the pool contract to make a bet of 12x the player's bet, which is necessary to pay out the max win(green). A random number is generated within a 36 figure range, and the funds are paid back to the pool and player depending on the player's guess and the outcome.

## Live Deployment
** NO MOBILE SUPPORT **
Website:
https://decentralized-casino-xdai.vercel.app/

A prototype is live on xDai Mainnet. Please be careful and ensure you are comfortable with the code before you interact with this contract. You WILL lose money whether it be through gambling or a bug.
