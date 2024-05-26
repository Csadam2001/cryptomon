import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const CryptoMon = await ethers.getContractFactory("Lock");
  const cryptoMon = await CryptoMon.deploy();

  await cryptoMon.waitForDeployment();

  const address = await cryptoMon.getAddress();
  console.log("CryptoMon deployed to:", address);

  const addressesFilePath = path.join(__dirname, "deployedAddress.json");
  fs.writeFileSync(addressesFilePath, JSON.stringify({ address }));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
