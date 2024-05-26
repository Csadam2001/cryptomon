const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("Lock");

    const addressesFilePath = path.join(__dirname, "deployedAddress.json");
    const { address } = JSON.parse(fs.readFileSync(addressesFilePath, "utf-8"));
    const cryptoMon = await CryptoMon.attach(address);

    const monstersData = [
        { health: 100, mana: 50, attack: 20, defense: 15, speed: 10, uri: "https://example.com/monster1-metadata" },
        { health: 120, mana: 60, attack: 25, defense: 20, speed: 12, uri: "https://example.com/monster2-metadata" }
    ];

    for (const data of monstersData) {
        const tx = await cryptoMon.createMonster(
            data.health, 
            data.mana, 
            data.attack, 
            data.defense, 
            data.speed, 
            data.uri
        );
        await tx.wait();
    }

    console.log("Monsters created");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
