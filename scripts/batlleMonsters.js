const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const cryptoMonAddress = '0xC543323e152Cc70c58af505Be515D019Aa28656B'; // Update this
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.attach(cryptoMonAddress);

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
