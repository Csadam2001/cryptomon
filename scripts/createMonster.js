const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const cryptoMonAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Update this
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.attach(cryptoMonAddress);

    // Create a new monster
    const tx = await cryptoMon.createMonster(
        100, // health
        50,  // mana
        20,  // attack
        15,  // defense
        10,  // speed
        "https://example.com/monster-metadata-uri"
    );
    await tx.wait();

    console.log("New monster created by", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
