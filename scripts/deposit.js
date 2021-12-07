const { ethers } = require("hardhat");

const POOL_ADDRESS = "0x3983048c1b176a7118Dc16bA142Ba28e1125E94f";

async function main() {
  const pool = await hre.ethers.getContractAt("Pool", POOL_ADDRESS);

  await pool.deposit({ value: ethers.utils.parseUnits("15") });

  pool.on("Deposit", (addr) => {
    console.log(addr + " Deposited to Pool");
  });
}

main();