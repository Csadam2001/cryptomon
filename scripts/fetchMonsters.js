const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS, CONTRACT_ABI } = require("../src/config");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Fetching monsters with the account:', deployer.address);

  const cryptoMon = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, deployer);

  const totalSupply = await cryptoMon.totalSupply();
  console.log('Total Monsters:', totalSupply.toString());

  for (let i = 0; i < totalSupply; i++) {
    const monster = await cryptoMon.getMonster(i);
    console.log(`Monster ${i}:`, monster);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
