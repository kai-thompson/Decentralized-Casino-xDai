const { ethers } = require("hardhat");

const POOL_ADDRESS = "0x3983048c1b176a7118Dc16bA142Ba28e1125E94f";

async function main() {
  const pool = await hre.ethers.getContractAt("Pool", POOL_ADDRESS);

  await pool.withdraw(ethers.utils.parseUnits("5"));

  pool.on("Withdrawal", (addr, amount, contratBalance) => {
    console.log(addr, "Withdrew", amount.toString(), contratBalance.toString());
  });
}

main();
