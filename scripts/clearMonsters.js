const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("Lock");

    const addressesFilePath = path.join(__dirname, "deployedAddress.json");
    const { address } = JSON.parse(fs.readFileSync(addressesFilePath, "utf-8"));
    const cryptoMon = await CryptoMon.attach(address);

    const tx = await cryptoMon.clearMonsters();
    await tx.wait();

    console.log("All monsters have been cleared");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
