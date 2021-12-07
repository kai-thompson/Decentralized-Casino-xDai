const { ethers } = require("hardhat");

const POOL_ADDRESS = "0xDb544e6172bcB9a16f197e23b7E0B623fD5c6413";

async function main() {
  const pool = await hre.ethers.getContractAt("Pool", POOL_ADDRESS);

  balance = await pool.balance("0x5deD20efC0297B0f4Dad03136C4A49EBc6650b41");

  console.log(balance.toString());
}

main();
