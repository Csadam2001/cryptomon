const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let cryptoMon;
  let owner;

  beforeEach(async function () {
    const CryptoMon = await ethers.getContractFactory("Lock");
    [owner] = await ethers.getSigners();
    cryptoMon = await CryptoMon.deploy(owner.address); // Pass the owner address here
  });

  it("Should set the right owner", async function () {
    expect(await cryptoMon.owner()).to.equal(owner.address);
  });

  // Add your other tests here

  it("Should create a monster and assign it to owner", async function () {
    // Example test logic
    await cryptoMon.createMonster(100, 50, 20, 20, 10, "monsterURI");
    const monster = await cryptoMon.monsters(0);
    expect(monster.uri).to.equal("monsterURI");
  });

  it("Should allow monsters to battle and transfer XP", async function () {
    // Add test logic here
  });

  it("Should level up a monster after gaining enough XP", async function () {
    // Add test logic here
  });
});