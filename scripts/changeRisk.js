const ROULETTE_ADDRESS = "0x64040e35d6EcB5fC4dd25882dd411f7094a63E81";

async function main() {
  const roulette = await hre.ethers.getContractAt("Roulette", ROULETTE_ADDRESS);

  await roulette.adjustRisk(1);
}

main();