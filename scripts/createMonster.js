const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.deploy(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266); // Pass deployer's address as initial owner
    await cryptoMon.deployed();

    // Create a new monster
    const tx1 = await cryptoMon.createMonster(
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
    await tx1.wait();
    const tx2 = await cryptoMon.createMonster(
        2,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx2.wait();
    const tx3 = await cryptoMon.createMonster(
        3,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx3.wait();
    const tx4 = await cryptoMon.createMonster(
        4,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx4.wait();
    const tx5 = await cryptoMon.createMonster(
        5,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx5.wait();
    const tx6 = await cryptoMon.createMonster(
        6,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx6.wait();
    const tx7 = await cryptoMon.createMonster(
        7,
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        1,
        0,
        "https://example.com/monster-metadata-uri"
    );
    await tx7.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
