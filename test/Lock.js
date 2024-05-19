const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let lock;
  let unlockTime;
  let owner;

  before(async function () {
    const [deployer] = await ethers.getSigners();
    owner = deployer;
  });

//  beforeEach(async function () {
    // Get the compiled contract
  //  const Lock = await ethers.getContractFactory("Lock");

    // Get the current block timestamp
   // const latestBlock = await ethers.provider.getBlock('latest');
   // unlockTime = latestBlock.timestamp + 60; // 1 minute in the future

    // Deploy the contract with initial funds
   // lock = await Lock.deploy(unlockTime, { value: ethers.utils.parseEther("1") });
    //await lock.deployed();
  //});

 // it("Should set the right unlockTime", async function () {
  //  const contractUnlockTime = await lock.unlockTime();
   // expect(Number(contractUnlockTime)).to.equal(unlockTime);
  //});
});
