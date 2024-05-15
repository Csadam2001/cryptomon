const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let lock;
  let owner;

  beforeEach(async function () {
    const Lock = await ethers.getContractFactory("Lock");
    lock = await Lock.deploy();
    await lock.deployed();
    [owner] = await ethers.getSigners();
  });

  it("Should set the right unlockTime", async function () {
    const unlockTime = await lock.unlockTime();
    expect(unlockTime).to.be.a('number');
  });

  it("Should set the right owner", async function () {
    expect(await lock.owner()).to.equal(owner.address);
  });

  it("Should receive and store the funds to lock", async function () {
    const value = ethers.utils.parseEther("1");
    await lock.deposit({ value });
    const balance = await ethers.provider.getBalance(lock.address);
    expect(balance).to.equal(value);
  });

  it("Should fail if the unlockTime is not in the future", async function () {
    await expect(lock.setUnlockTime(Date.now() - 1000)).to.be.revertedWith("Unlock time should be in the future");
  });

  it("Should revert with the right error if called too soon", async function () {
    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should revert with the right error if called from another account", async function () {
    const [_, addr1] = await ethers.getSigners();
    await expect(lock.connect(addr1).withdraw()).to.be.revertedWith("You aren't the owner");
  });

  it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    await lock.setUnlockTime(Math.floor(Date.now() / 1000) - 1000);
    await expect(lock.withdraw()).to.not.be.reverted;
  });

  it("Should emit an event on withdrawals", async function () {
    await lock.setUnlockTime(Math.floor(Date.now() / 1000) - 1000);
    await expect(lock.withdraw()).to.emit(lock, 'Withdraw').withArgs(owner.address, anyValue);
  });

  it("Should transfer the funds to the owner", async function () {
    await lock.setUnlockTime(Math.floor(Date.now() / 1000) - 1000);
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    await lock.withdraw();
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
    expect(finalOwnerBalance).to.be.above(initialOwnerBalance);
  });
});
