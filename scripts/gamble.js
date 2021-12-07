const { ethers } = require("hardhat");

const ROULETTE_ADDRESS = "0x6d09599a56d1A35c485fCB8f27063556121c31Cb";
const POOL_ADDRESS = "0xDb544e6172bcB9a16f197e23b7E0B623fD5c6413";

async function main() {
  const roulette = await hre.ethers.getContractAt("Roulette", ROULETTE_ADDRESS);
  const pool = await hre.ethers.getContractAt("Pool", POOL_ADDRESS);

  await roulette.createBet(2, { value: ethers.utils.parseUnits("1") });

  await pool.placeBet(ethers.utils.parseUnits("12"));

  roulette.on("NewBet", (value, addr) => {
    console.log(addr, "Bet", value.toString());
  });
  roulette.on("Winner", (address, amount, betResult, uint3) => {
    console.log(address, "WON", amount.toString(), "Betting On:", betResult);
  });
  roulette.on("HousePay", (value, string) => {
    console.log("House", string, value.toString(), "Returned");
  });
  pool.on("Withdrawal", (addr, amount, contratBalance) => {
    console.log(addr, "Withdrew", amount.toString(), contratBalance.toString());
  });
}

main();
