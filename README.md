# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

APP RUNNING COMMANDS:
cd ethers-react-app
npm install --legacy-peer-deps //ezt cd-ve a ethers appba
npm install --save-dev ts-node --legacy-peer- /ezt cd-ve a ethers appba
cd ..
npx hardhat node
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localhost 
npx hardhat run ./scripts/createMonster.js --network localhost
//good result: Monsters created
 npx hardhat run ./scripts/fetchMonsters.js --network localhost
//good resultTotal Monsters: 1
Monster 0: Result(9) [
  0n,
  100n,
  50n,
  20n,
  15n,
  10n,
  1n,
  0n,
  'https://example.com/monster-metadata-uri' //

  cd ethers-react-app
  npm start
  + Add MetaMask extension to chrome and log in
  npx hardhat run scripts/battleMonsters.js --network localhost