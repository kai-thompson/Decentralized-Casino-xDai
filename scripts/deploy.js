async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Pool = await ethers.getContractFactory("Pool");
  const Roulette = await ethers.getContractFactory("Roulette");

  // const pool = await Pool.deploy();
  // console.log("Pool address:", pool.address);
  const roulette = await Roulette.deploy("0xA34BA6F311Ad032e8F8a03Ab39f16007bf669764");
  console.log("Roulette address:", roulette.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
