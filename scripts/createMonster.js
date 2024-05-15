const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.deploy(0xC543323e152Cc70c58af505Be515D019Aa28656B); // Pass deployer's address as initial owner
    await cryptoMon.deployed();

    // Create a new monster
    const tx = await cryptoMon.createMonster(
        1,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
