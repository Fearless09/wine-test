"use client"
import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useState, useEffect } from "react";
import { BigNumber, ethers } from 'ethers';
import WineRegistryContract from './blockchain/WineRegistry.json';

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
    // Owner's Address
    const [owner, setOwner] = useState("")
    const [authorizedAddress, setAuthorizedAddress] = useState([owner, "0x76c294af238210c76F648a66cCF23505E66BD4AC", "0xbaA0075978fD5304AE4222E3E0726f6A5081D550"])
    const [requestingAuthorization, setRequestingAuthorization] = useState(["0x28C510604bb964E7A01A6C1E0D4B6fE0483f3688", "0xd872D69922F0462b50c38f8Fb70154e67A0A49Dc", "0x601C6F4962F4697831732c0Da481f16A06579c88"])

    const [wines, setWines] = useState(null)
    // Connected Address
    const [address, setAddress] = useState(null)

    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                // Modern dapp browsers
                window.ethereum.autoRefreshOnNetworkChange = false;
                try {
                    // Request account access
                    await window.ethereum.request({ method: 'eth_requestAccounts' })
                        .then(result => {
                            setAddress(result[0])
                        })
                } catch (error) {
                    console.error('User denied account access');
                }
                const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(providerInstance);
            } else {
                // Non-dapp browsers
                console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (provider) {
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(
                WineRegistryContract.address,
                WineRegistryContract.output.abi,
                signer
            );
            setContract(contractInstance);
        }
    }, [provider]);

    const getAllWinesByOwner = async (ownerAddress) => {
        try {
            const wine = await contract.getAllWinesByOwner(ownerAddress);
            setWines(wine)
            // console.log('Wines:', wine)
            return wine;
        } catch (error) {
            console.error('Error getting wines:', error);
            return [];
        }
    };

    const removeWineById = async (ownerAddress, wineIndex) => {
        try {
            const tx = await contract.removeWineByOwner(ownerAddress, wineIndex);
            const res = await tx.wait();
            console.log('Wine removed successfully', res);
            getAllWinesByOwner(address)
        } catch (error) {
            console.error('Error removing wine:', error);
        }
    };

    const getWineById = async (ownerAddress, wineIndex) => {
        try {
            const wine = await contract.getWineById(ownerAddress, wineIndex);
            console.log('Wine:', wine);
            return wine;
        } catch (error) {
            console.error('Error getting wine:', error);
            return null;
        }
    };

    const getOwner = async () => {
        try {
            const block_owner = await contract.owner();
            // console.log('Owner:', block_owner);
            setOwner(block_owner)
            return block_owner;
        } catch (error) {
            console.error('Error getting owner:', error);
            return [];
        }
    };

    const getAllOwners = async () => {
        try {
            const owners = await contract.getOwners();
            console.log('Owners:', owners);
            setAuthorizedAddress(owners)
            return owners;
        } catch (error) {
            console.error('Error getting owners:', error);
            return [];
        }
    };

    const addOwner = async (ownerAddress) => {
        console.log("Adding ", ownerAddress)
        try {
            const tx = await contract.addOwner(ownerAddress);
            const res = await tx.wait();
            getAllOwners()
            console.log('Owner added successfully', res);
        } catch (error) {
            console.error('Error adding owner:', error);
        }
    };

    const removeOwner = async (ownerAddress) => {
        console.log("Removing ", ownerAddress)
        try {
            const tx = await contract.removeOwner(ownerAddress);
            const res = await tx.wait();
            getAllOwners()
            console.log('Owner removed successfully', res);
        } catch (error) {
            console.error('Error removing owner:', error);
        }
    };

    useEffect(() => {
        if (address && contract) {
            getAllWinesByOwner(address)
            getOwner()
            getAllOwners()
            // console.log(address)
        }
    }, [address, contract])

    // address && removeWineById(address, "0x41f0675afad34455c67b56c91788d6be3134d341769fbf23adfea8b69f6696f6")
    // address && getAllWinesByOwner(address)
    return (
        <AppContext.Provider
            value={{ contract, addOwner, removeOwner, removeWineById, wines, setWines, address, setAddress, owner, authorizedAddress, setAuthorizedAddress, setRequestingAuthorization, requestingAuthorization }}
        >
            {children}
        </AppContext.Provider>
    )
}