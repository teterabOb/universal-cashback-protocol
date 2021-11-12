// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract UCPToken is ERC20 {

    ERC20 private USDT;

    mapping(address => bool) contractAllowedToMint;
    mapping(address => uint) amountAllowedToMint;

    constructor(address _USDT) ERC20("Cashback", "UCP") {
        USDT = ERC20(_USDT);        
    }

    /*    
    function transfer(address _to, uint256 _amount) public virtual override returns (bool) {
        require(_amount >= 1, "Minimun 1 Token");
        transfer(_to, _amount);
        return true;
    }  
    */  

    function mintToken(uint256 _amount) external virtual {
        require(contractAllowedToMint[msg.sender] == true, "Must be allowed to mint");
        _mint(msg.sender, _amount);
    } 

    function addAddressAllowToMint(address _contractAddress) public returns(bool){
        //require(contractAllowsToMint[msg.sender] == false, "it exists");
        contractAllowedToMint[_contractAddress] = true;
        return true;
    }

    function setAmountAllowedToMint() public {

    }

    function getAmountAllowedToMintByAddress(address _account) public view returns(uint){
        require(contractAllowedToMint[_account], "Account is not allowed to mint");
        return(amountAllowedToMint[_account]);
    }

    function getAddressAllowToMint(address _contractAddress) public view returns(bool){        
        contractAllowedToMint[_contractAddress];
        return true;
    }  
}