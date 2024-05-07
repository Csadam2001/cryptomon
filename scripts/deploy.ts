const hre = require("hardhat");

async function main() {
    const CryptoMon = await hre.ethers.getContractFactory("CryptoMon");
    const cryptoMon = await CryptoMon.deploy();

    await cryptoMon.deployed();

    console.log("CryptoMon deployed to:", cryptoMon.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
