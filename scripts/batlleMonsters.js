const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const cryptoMonAddress = '0xee30045A8E684340801ff404Cf6d3a8B9b0934C7'; // Update this
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
