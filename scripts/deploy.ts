import { ethers } from "hardhat";

async function main() {
  const CryptoMon = await ethers.getContractFactory("Lock");
  const cryptoMon = await CryptoMon.deploy();

  await cryptoMon.waitForDeployment();

  console.log("CryptoMon deployed to:", await cryptoMon.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
