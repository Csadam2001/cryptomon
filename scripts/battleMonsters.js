const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("Lock");

    const addressesFilePath = path.join(__dirname, "deployedAddress.json");
    const { address } = JSON.parse(fs.readFileSync(addressesFilePath, "utf-8"));
    const cryptoMon = await CryptoMon.attach(address);

    // Battle between two monsters
    const tx = await cryptoMon.attackMonster(0, 1); // Use actual monster IDs
    await tx.wait();

    console.log("Battle executed between monster 0 and monster 1");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
