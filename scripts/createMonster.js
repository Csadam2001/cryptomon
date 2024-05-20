const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.deploy(deployer.address); // Pass deployer's address as initial owner
    await cryptoMon.waitForDeployment();

    const monstersData = [
        { health: 100, mana: 50, attack: 20, defense: 15, speed: 10, uri: "https://example.com/monster-metadata-uri" },
        // Add more monster data here if needed
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
