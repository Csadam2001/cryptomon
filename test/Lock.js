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

});
