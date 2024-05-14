const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.deploy(0xee30045A8E684340801ff404Cf6d3a8B9b0934C7); // Pass deployer's address as initial owner
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

    console.log("New monster created by", 0xee30045A8E684340801ff404Cf6d3a8B9b0934C7);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
