const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("Lock");

    const addressesFilePath = path.join(__dirname, "deployedAddress.json");
    const { address } = JSON.parse(fs.readFileSync(addressesFilePath, "utf-8"));
    const cryptoMon = await CryptoMon.attach(address);

    const totalSupply = await cryptoMon.totalSupply();
    console.log("Total Monsters:", totalSupply.toString());

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
