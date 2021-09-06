//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

 contract YourContract is ERC20 {
    constructor() public ERC20("Crabby", "CBY") {
       
    }
    function airDrop() public {
         _mint(msg.sender, 1e18);
    }
 }