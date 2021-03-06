// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("El owner es" + deployer.address)

  // We get the contract to deploy
  let chainlinkUSDTContract = "0x9211c6b3BF41A10F78539810Cf5c64e1BB78Ec60";
  let USDTContractAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

  const UCPToken = await hre.ethers.getContractFactory("UCPToken");
  //const USD = await hre.ethers.getContractFactory("USDT");
  const Store = await hre.ethers.getContractFactory("Store");
  const AdminProtocol = await hre.ethers.getContractFactory("AdminProtocol");
  
  const ucp = await UCPToken.deploy(USDTContractAddress);
  await ucp.deployed();
  
  const adminProtocol = await AdminProtocol.deploy(USDTContractAddress, ucp.address);
  await adminProtocol.deployed();
  
  console.log("UCP Token deployed to:", ucp.address);  
  console.log("Admin Protocol deployed to:", adminProtocol.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
