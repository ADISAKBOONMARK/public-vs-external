// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Comparison.sol
/// @dev Comparison between public and external. NOTE: The lab will be a simulation, Calculation pricing of the land.
contract Comparison is Pausable, Ownable {

    /// @dev Emitted when the price changed.
    event PriceChanged(address actionBy, uint256 oldPrice, uint256 newPrice);

    /// @dev Emitted when the land was added.
    event LandAdded(address createBy, uint256 id);

    /// @dev Struct of land.
    /// @param id Id of land.
    /// @param width Wdth of land.
    /// @param length Length of land.
    /// @param area Area of land.
    /// @param price Price of land.
    struct Land {
        uint256 id;
        uint256 width;
        uint256 length;
        uint256 area;
        uint256 price;
        address owner;
    }

    /// @dev Land by owner.
    mapping(address => Land) public land;

    /// @dev Price per unit. (USD)
    uint256 public price = 100; 

    /// @dev Use for pause state.
    function pause() external onlyOwner {
        _pause();
    }

    /// @dev Use for unpause state.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @dev Use for setting the price of land per unit. (public)
    /// @param _price Price per unit. (USD)
    function setPriceWithPublic(uint256 _price) public onlyOwner {
        require(price != _price, "Comparison: Price is already set");
        emit PriceChanged(msg.sender, price, _price);
        price = _price;
    }

    /// @dev Use for setting the price of land per unit. (external)
    /// @param _price Price per unit. (USD)
    function setPriceWithExternal(uint256 _price) external onlyOwner {
        require(price != _price, "Comparison: Price is already set");
        emit PriceChanged(msg.sender, price, _price);
        price = _price;
    }

    /// @dev Use for calculating the land area. (public)
    /// @param _x Wdth of land. (meter)
    /// @param _y Length of land. (meter)
    function calculateWithPublic(uint256 _x, uint256 _y) public pure returns(uint256) {
        return _x * _y;
    }

    /// @dev Use for calculating the land area. (external)
    /// @param _x Wdth of land. (meter)
    /// @param _y Length of land. (meter)
    function calculateWithExternal(uint256 _x, uint256 _y) external pure returns(uint256) {
        return _x * _y;
    }

    /// @dev Use for calculating the price of land.
    /// @param _area Area of land.
    function calculatePrice(uint256 _area) internal view returns(uint256) {
        return _area * price;
    }

    /// @dev Use for adding land. (public)
    /// @param _x Wdth of land. (meter)
    /// @param _y Length of land. (meter)
    /// @param _salt Salt for random id.
    function addLandWithPublic(uint256 _x, uint256 _y, uint256 _salt) external onlyOwner {
        uint256 area = calculateWithPublic(_x, _y);
        uint256 id = uint256(keccak256(abi.encodePacked(block.number, msg.sender, _salt)));
        land[msg.sender] = Land({
            id: id,
            width: _x,
            length: _y,
            area: area,
            price: calculatePrice(area),
            owner: msg.sender
        });
        emit LandAdded(msg.sender, id);
    }

    /// @dev Use for adding land. (external)
    /// @param _x Wdth of land. (meter)
    /// @param _y Length of land. (meter)
    /// @param _salt Salt for random id.
    function addLandWithExternal(uint256 _x, uint256 _y, uint256 _salt) external onlyOwner {
        uint256 area = this.calculateWithExternal(_x, _y);
        uint256 id = uint256(keccak256(abi.encodePacked(block.number, msg.sender, _salt)));
        land[msg.sender] = Land({
            id: id,
            width: _x,
            length: _y,
            area: area,
            price: calculatePrice(area),
            owner: msg.sender
        });
        emit LandAdded(msg.sender, id);
    }
}
