import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WineRegistryContract from './WineRegistry.json';

const useWineRegistry = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                // Modern dapp browsers
                window.ethereum.autoRefreshOnNetworkChange = false;
                try {
                    // Request account access
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
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

    const addOwner = async (ownerAddress) => {
        try {
            const tx = await contract.addOwner(ownerAddress);
            await tx.wait();
            console.log('Owner added successfully');
        } catch (error) {
            console.error('Error adding owner:', error);
        }
    };

    const removeOwner = async (ownerAddress) => {
        try {
            const tx = await contract.removeOwner(ownerAddress);
            await tx.wait();
            console.log('Owner removed successfully');
        } catch (error) {
            console.error('Error removing owner:', error);
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
            await tx.wait();
            console.log('Wine added successfully');
        } catch (error) {
            console.error('Error adding wine:', error);
        }
    };

    const addMultipleWinesByOwner = async (ownerAddress, wines) => {
        try {
            const tx = await contract.addMultipleWinesByOwner(ownerAddress, wines);
            await tx.wait();
            console.log('Multiple wines added successfully');
        } catch (error) {
            console.error('Error adding multiple wines:', error);
        }
    };

    const removeWineById = async (ownerAddress, wineIndex) => {
        try {
            const tx = await contract.removeWineByOwner(ownerAddress, wineIndex);
            await tx.wait();
            console.log('Wine removed successfully');
        } catch (error) {
            console.error('Error removing wine:', error);
        }
    };


    const removeMultipleWinesByOwner = async (ownerAddress, wineIds) => {
        try {
            const tx = await contract.removeMultipleWinesByOwner(ownerAddress, wineIds);
            await tx.wait();
            console.log('Multiple wines removed successfully');
        } catch (error) {
            console.error('Error removing multiple wines:', error);
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


    const getAllWinesByOwner = async (ownerAddress) => {
        try {
            const wines = await contract.getAllWinesByOwner(ownerAddress);
            console.log('Wines:', wines);
            return wines;
        } catch (error) {
            console.error('Error getting wines:', error);
            return [];
        }
    };


    const getAllOwners = async () => {
        try {
            const owners = await contract.getOwners();
            console.log('Owners:', owners);
            return owners;
        } catch (error) {
            console.error('Error getting owners:', error);
            return [];
        }
    };


    return { provider, contract, addOwner, removeOwner, getAllOwners, addWine, removeWineById, getAllWinesByOwner, getWineById, getWineById, removeMultipleWinesByOwner };
};

export default useWineRegistry;