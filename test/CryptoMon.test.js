const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoMon Contract", function () {
  let CryptoMon;
  let cryptoMon;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    CryptoMon = await ethers.getContractFactory("CryptoMon");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    cryptoMon = await CryptoMon.deploy(owner.address);
    await cryptoMon.deployed(); // Correct usage
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await cryptoMon.owner()).to.equal(owner.address);
    });

    it("Should create a monster and assign it to owner", async function () {
      await cryptoMon.createMonster(100, 50, 20, 15, 10, "uri://monster1");
      const monster = await cryptoMon.monsters(0);
      expect(await cryptoMon.ownerOf(0)).to.equal(owner.address);
      expect(monster.health).to.equal(100);
    });
  });

  describe("Monster battles", function () {
    beforeEach(async function () {
      await cryptoMon.createMonster(100, 50, 20, 15, 10, "uri://monster2");
      await cryptoMon.createMonster(100, 50, 20, 15, 10, "uri://monster3");
    });

    it("Should allow monsters to battle and transfer XP", async function () {
      await cryptoMon.connect(addr1).attackMonster(0, 1);
      const monster1 = await cryptoMon.monsters(0);
      const monster2 = await cryptoMon.monsters(1);
      expect(monster2.health).to.be.below(90);
    });
  });

  describe("Leveling and Evolution", function () {
    beforeEach(async function () {
      await cryptoMon.createMonster(100, 50, 20, 15, 10, "uri://monster4");
    });

    it("Should level up a monster after gaining enough XP", async function () {
      // Simulate gaining XP
      await cryptoMon.connect(addr1).battleAndGainXP(0, { value: ethers.utils.parseEther("1") });
      const monster = await cryptoMon.monsters(0);
      expect(monster.level).to.be.above(1);
    });
  });
});
