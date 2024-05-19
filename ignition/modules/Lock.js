const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VALID_ADDRESS = "0xee30045A8E684340801ff404Cf6d3a8B9b0934C7";  // Replace with a valid Ethereum address

module.exports = buildModule("LockModule", (m) => {
  const lock = m.contract("Lock", [VALID_ADDRESS]);

  return { lock };
});
