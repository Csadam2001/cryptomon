const { ethers, hardhat } = require("hardhat");
const Web3 = require("web3");

describe("Lock Contract", function () {
  let lock;
  let unlockTime;
  let owner;
  let web3;
  let accounts;

  before(async function () {
    // Initialize Web3
    web3 = new Web3(hardhat.network.provider); // Ensure that hardhat.network.provider is defined
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
  });

  beforeEach(async function () {
    // Get the compiled contract
    const Lock = artifacts.require("Lock"); // Use artifacts object from hardhat

    // Get the current block timestamp
    const latestBlock = await web3.eth.getBlock('latest');
    unlockTime = latestBlock.timestamp + 60; // 1 minute in the future

    // Deploy the contract with initial funds
    lock = await Lock.new(unlockTime, { from: owner, value: web3.utils.toWei("1", "ether") });
  });

  it("Should set the right unlockTime", async function () {
    const contractUnlockTime = await lock.unlockTime();
    expect(Number(contractUnlockTime)).to.equal(unlockTime);
  });
});
