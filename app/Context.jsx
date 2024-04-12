"use client"
import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useState, useEffect } from "react";
import { BigNumber, ethers } from 'ethers';
import WineRegistryContract from './blockchain/WineRegistry.json';

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(true)
    // Owner's Address
    const [owner, setOwner] = useState("")
    const [authorizedAddress, setAuthorizedAddress] = useState(null)
    const [requestingAuthorization, setRequestingAuthorization] = useState(["0x28C510604bb964E7A01A6C1E0D4B6fE0483f3688", "0xd872D69922F0462b50c38f8Fb70154e67A0A49Dc", "0x601C6F4962F4697831732c0Da481f16A06579c88"])

    const [wines, setWines] = useState(null)
    // Connected Address
    const [address, setAddress] = useState(null)

    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    const init = async () => {
        setLoading(true)
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            // Modern dapp browsers
            window.ethereum.autoRefreshOnNetworkChange = false;
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(result => {
                        setAddress(result[0])
                        setLoading(false)
                    })
            } catch (error) {
                console.error('User denied account access');
                setLoading(false)
            }
            const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(providerInstance);
        } else {
            // Non-dapp browsers
            setLoading(false)
            console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        setLoading(true)
        if (provider) {
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(
                WineRegistryContract.address,
                WineRegistryContract.output.abi,
                signer
            );
            setContract(contractInstance);
            setLoading(false)
        }
    }, [provider]);

    const getAllWinesByOwner = async (ownerAddress) => {
        setLoading(true)
        try {
            const wine = await contract.getAllWinesByOwner(ownerAddress);
            setWines(wine)
            setLoading(false)
            // console.log('Wines:', wine)
            return wine;
        } catch (error) {
            console.error('Error getting wines:', error);
            setLoading(false)
            return [];
        }
    };

    const addWine = async (
        ownerAddress,
        name,
        vintage,
        region,
        country,
        area,
        lotSize,
        website
    ) => {
        console.log("Adding Wine...")
        setLoading(true)
        try {
            const tx = await contract.addWineByOwner(
                ownerAddress,
                name,
                vintage,
                region,
                country,
                area,
                lotSize,
                website
            );
            const res = await tx.wait();
            getAllWinesByOwner(address)
            setLoading(false)
            console.log('Wine added successfully', res);
        } catch (error) {
            console.error('Error adding wine:', error);
            setLoading(false)
        }
    };

    const removeWineById = async (ownerAddress, wineIndex) => {
        setLoading(true)
        try {
            const tx = await contract.removeWineByOwner(ownerAddress, wineIndex);
            const res = await tx.wait();
            console.log('Wine removed successfully', res);
            getAllWinesByOwner(address)
            setLoading(false)
        } catch (error) {
            console.error('Error removing wine:', error);
            setLoading(false)
        }
    };

    const getWineById = async (ownerAddress, wineIndex) => {
        setLoading(true)
        try {
            const wine = await contract.getWineById(ownerAddress, wineIndex);
            console.log('Wine:', wine);
            setLoading(false)
            return wine;
        } catch (error) {
            console.error('Error getting wine:', error);
            setLoading(false)
            return null;
        }
    };

    const getOwner = async () => {
        setLoading(true)
        try {
            const block_owner = await contract.owner();
            // console.log('Owner:', block_owner);
            setOwner(block_owner)
            setLoading(false)
            return block_owner;
        } catch (error) {
            console.error('Error getting owner:', error);
            setLoading(false)
            return [];
        }
    };

    const getAllOwners = async () => {
        setLoading(true)
        try {
            const owners = await contract.getOwners();
            console.log('Owners:', owners);
            setAuthorizedAddress(owners)
            setLoading(false)
            return owners;
        } catch (error) {
            console.error('Error getting owners:', error);
            setLoading(false)
            return [];
        }
    };

    const addOwner = async (ownerAddress) => {
        console.log("Adding ", ownerAddress)
        setLoading(true)
        try {
            const tx = await contract.addOwner(ownerAddress);
            const res = await tx.wait();
            getAllOwners()
            setLoading(false)
            console.log('Owner added successfully', res);
        } catch (error) {
            console.error('Error adding owner:', error);
            setLoading(false)
        }
    };

    const removeOwner = async (ownerAddress) => {
        console.log("Removing ", ownerAddress)
        setLoading(true)
        try {
            const tx = await contract.removeOwner(ownerAddress);
            const res = await tx.wait();
            getAllOwners()
            setLoading(false)
            console.log('Owner removed successfully', res);
        } catch (error) {
            console.error('Error removing owner:', error);
            setLoading(false)
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

    return (
        <AppContext.Provider
            value={{ init, contract, addOwner, removeOwner, addWine, removeWineById, wines, setWines, address, setAddress, owner, authorizedAddress, setAuthorizedAddress, setRequestingAuthorization, requestingAuthorization, loading }}
        >
            {children}
        </AppContext.Provider>
    )
}