// SPDX-License-Identifier: MIT
//0x0725f5ec493e0f13147b50c2b60d4840c6c679e0
//0x53c520a02eaa509fe277c52f33891f8a42faf908
pragma solidity ^0.8.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract WineRegistry {
    struct Wine {
        address owner;
        string id;
        string name;
        uint vintage;
        string region;
        string country;
        string area;
        uint lotSize;
        string website;
    }

    mapping(address => mapping(string => Wine)) private winesByOwner;
    mapping(address => string[]) private wineIdsByOwner;
    mapping(address => bool) private owners;
    address[] private ownerAddresses; // New array to store owner addresses

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event WineAdded(address indexed owner, string indexed wineId, string name, uint vintage, string region, string country, string area, uint lotSize, string website);
    event WinesAdded(address indexed owner, string[] wineIds, string[] names, uint[] vintages, string[] regions, string[] countries, string[] areas, uint[] lotSizes, string[] websites);
    event WineRemoved(address indexed owner, string indexed wineId);
    event WinesRemoved(address indexed owner, string[] wineIds);
    event OwnerAndWinesRemoved(address indexed owner, string[] wineIds);

    constructor() {
        owner = msg.sender;
        owners[msg.sender] = true;
        ownerAddresses.push(msg.sender); // Initialize owner addresses array with contract owner
        emit OwnerAdded(msg.sender);
    }

    function addOwner(address _owner) external onlyOwner {
        require(_owner != address(0), "Invalid owner address");
        require(!owners[_owner], "Owner already exists");
        
        owners[_owner] = true;
        ownerAddresses.push(_owner); // Add owner address to the array
        emit OwnerAdded(_owner);
    }

    function removeOwner(address _owner) external onlyOwner {
        require(owners[_owner], "Owner does not exist");
        require(ownerAddresses.length < 2, "App owner cannot be deleted");
        
        // Remove all wines belonging to the owner
        string[] memory wineIds = wineIdsByOwner[_owner];
        for (uint i = 0; i < wineIds.length; i++) {
            delete winesByOwner[_owner][wineIds[i]];
        }
        delete wineIdsByOwner[_owner];

        // Remove the owner from the owners mapping and owner addresses array
        delete owners[_owner];
        for (uint i = 0; i < ownerAddresses.length; i++) {
            if (ownerAddresses[i] == _owner) {
                delete ownerAddresses[i];
                break;
            }
        }

        emit OwnerAndWinesRemoved(_owner, wineIds);
        emit OwnerRemoved(_owner);
    }

    function getOwners() external view onlyOwner returns (address[] memory) {
        return ownerAddresses;
    }


    function addWineByOwner(
        address _owner,
        string memory _name,
        uint _vintage,
        string memory _region,
        string memory _country,
        string memory _area,
        uint _lotSize,
        string memory _website
    ) external {
        require(owners[_owner], "Owner does not exist");
        
        bytes32 wineIdBytes32 = keccak256(abi.encodePacked(_name, _vintage, _region, _country, _area, _lotSize, _website));
        uint256 wineIdUint256 = uint256(wineIdBytes32);
        string memory wineId = Strings.toHexString(wineIdUint256);
        // string memory wineId = string(abi.encodePacked(wineIdBytes32));
        winesByOwner[_owner][wineId] = Wine(_owner, wineId, _name, _vintage, _region, _country, _area, _lotSize, _website);
        wineIdsByOwner[_owner].push(wineId);
        
        emit WineAdded(_owner, wineId, _name, _vintage, _region, _country, _area, _lotSize, _website);
    }

    function addMultipleWinesByOwner(
        address _owner,
        string[] memory _names,
        uint[] memory _vintages,
        string[] memory _regions,
        string[] memory _countries,
        string[] memory _areas,
        uint[] memory _lotSizes,
        string[] memory _websites
    ) external {
        require(owners[_owner], "Owner does not exist");
        require(
            _names.length == _vintages.length &&
            _names.length == _regions.length &&
            _names.length == _countries.length &&
            _names.length == _areas.length &&
            _names.length == _lotSizes.length &&
            _names.length == _websites.length,
            "Input arrays length mismatch"
        );

        string[] memory wineIds = new string[](_names.length);
        
        for (uint i = 0; i < _names.length; i++) {
            bytes32 wineIdBytes32 = keccak256(abi.encodePacked(_names[i], _vintages[i], _regions[i], _countries[i], _areas[i], _lotSizes[i], _websites[i]));
            uint256 wineIdUint256 = uint256(wineIdBytes32);
            string memory wineId = Strings.toHexString(wineIdUint256);
            // string memory wineId = string(abi.encodePacked(wineIdBytes32));
            winesByOwner[_owner][wineId] = Wine(_owner, wineId, _names[i], _vintages[i], _regions[i], _countries[i], _areas[i], _lotSizes[i], _websites[i]);
            wineIdsByOwner[_owner].push(wineId);
            wineIds[i] = wineId;
        }
        
        emit WinesAdded(_owner, wineIds, _names, _vintages, _regions, _countries, _areas, _lotSizes, _websites);
    }

    function removeWineByOwner(address _owner, string memory _wineId) external {
        require(owners[_owner], "Owner does not exist");

        delete winesByOwner[_owner][_wineId];

        // Find and remove the wineId from the wineIdsByOwner array
        string[] storage wineIds = wineIdsByOwner[_owner];
        for (uint i = 0; i < wineIds.length; i++) {
            if (keccak256(bytes(wineIds[i])) == keccak256(bytes(_wineId))) {
            // if (wineIds[i] == _wineId) {
                wineIds[i] = wineIds[wineIds.length - 1];
                wineIds.pop();
                break;
            }
        }

        emit WineRemoved(_owner, _wineId);
    }

    function removeMultipleWinesByOwner(address _owner, string[] memory _wineIds) external {
        require(owners[_owner], "Owner does not exist");

        for (uint i = 0; i < _wineIds.length; i++) {
            string memory wineId = _wineIds[i];
            delete winesByOwner[_owner][wineId];

            // Find and remove the wineId from the wineIdsByOwner array
            string[] storage wineIds = wineIdsByOwner[_owner];
            for (uint j = 0; j < wineIds.length; j++) {
                if (keccak256(bytes(wineIds[j])) == keccak256(bytes(wineId))) {
                // if (wineIds[j] == wineId) {
                    wineIds[j] = wineIds[wineIds.length - 1];
                    wineIds.pop();
                    break;
                }
            }
        }

        emit WinesRemoved(_owner, _wineIds);
    }

    function getWineById(address _owner, string calldata _wineId) external view returns (Wine memory) {
        require(owners[_owner], "Owner does not exist");
        return winesByOwner[_owner][_wineId];
    }

    function getAllWinesByOwner(address _owner) external view returns (Wine[] memory) {
        require(owners[_owner], "Owner does not exist");

        string[] memory wineIds = wineIdsByOwner[_owner];
        Wine[] memory wines = new Wine[](wineIds.length);

        for (uint i = 0; i < wineIds.length; i++) {
            wines[i] = winesByOwner[_owner][wineIds[i]];
        }

        return wines;
    }

    function isOwner(address _owner) external view returns (bool) {
        return owners[_owner];
    }
}
