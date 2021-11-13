const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Store Contract", function () {
  it("Should be deployed", async function () {
    const [deployer] = await ethers.getSigners();

    const UCPToken = await hre.ethers.getContractFactory("UCPToken");
    const USD = await hre.ethers.getContractFactory("USDT");
    const Store = await hre.ethers.getContractFactory("Store");
    const AdminProtocol = await hre.ethers.getContractFactory("AdminProtocol");
    
    const usdt = await USD.deploy(10000);
    await usdt.deployed();
    
    const adminProtocol = await AdminProtocol.deploy(usdt.address);
    await adminProtocol.deployed();


    const ucp = await UCPToken.deploy(usdt.address);
    await ucp.deployed();
    const store = await Store.deploy(deployer.address, 1, "McDonalds", usdt.address, ucp.address, adminProtocol.address); 
    
    const contractAmountPrev = await usdt.balanceOf(store.address)
    const deployerAmountPrev = await usdt.balanceOf(deployer.address)
    
    console.log("El amount previo del contrato es: " + contractAmountPrev);
    console.log("El amount previo del deployer es: " + deployerAmountPrev);

    //const allowToMint = await ucp.addAddressAllowToMint(store.address);
    //console.log("El contrato está habilitado para mintear: " + allowToMint);

    const resApprove = await usdt.approve(store.address, ethers.utils.parseEther('1000000'))
    const allowance = await usdt.allowance(deployer.address, store.address)    
    console.log("El allowance del contrato es: " + allowance);
    console.log("El contrato store en un inicio tiene UCP: " + await ucp.balanceOf(store.address));

    //Contract Price Feed USDT Mainnet Etherem
    let chainlinkUSDTContract = "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D";
    //USDT contract Mainnet Etherem
    let USDTContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    await store.addTokenToPriceFeed(USDTContract, chainlinkUSDTContract);

    const buy = await store.buyToken(ethers.utils.parseEther('100'), USDTContract);
    console.log("El monto en USDT a pagar es: " + buy);

    const priceUSDT = await store.getTokenPriceByChainlink(USDTContract);
    console.log("El precio de USDT es: " + priceUSDT);
    
    const contractAmount = await usdt.balanceOf(store.address)
    const deployerAmount = await usdt.balanceOf(deployer.address)
    const finalAllowance = await usdt.allowance(deployer.address, store.address)
    
    //console.log("El amount del contrato es: " + contractAmount);
    //console.log("El amount del deployer es: " + deployerAmount);
    //console.log("El allowance final es: " + finalAllowance);
    //console.log("El contrato store AHORA! tiene UCP: " + await ucp.balanceOf(store.address));
  });

  it.skip("should return valid price", async function(){
    const [deployer] = await ethers.getSigners();

    const UCPToken = await hre.ethers.getContractFactory("UCPToken");
    const USD = await hre.ethers.getContractFactory("USDT");
    const Store = await hre.ethers.getContractFactory("Store");
    
    const usdt = await USD.deploy(ethers.utils.parseEther('100000000'));
    await usdt.deployed();
  
    const ucp = await UCPToken.deploy(usdt.address);
    await ucp.deployed();
    const store = await Store.deploy(deployer.address, 1, "McDonalds", usdt.address, ucp.address); 

    let chainlinkUSDTContract = "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D";
    let USDTContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    let resultAddPriceFeed = await store.addTokenToPriceFeed(USDTContract, chainlinkUSDTContract);



    const priceFeed = await store.getTokenPriceByChainlink(USDTContract)
    
    console.log("El precio es: " + priceFeed);
  });
});
