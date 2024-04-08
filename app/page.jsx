"use client"
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import useWineRegistry from './blockchain/useWineRegistry';


export default function Home() {
  const { provider, contract, getAllOwners } = useWineRegistry();
  const [ownerAddress, setOwnerAddress] = useState('');

  const handlegetAllOwners = () => {
    console.log(provider)
    console.log(contract)
    getAllOwners();
  };

  /*   async function getData() {
      const res = await fetch('/api/')
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
  
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
  
      return res.json()
    }
  
  
    useEffect(() => {
      getData().then(res => console.log(res)).catch(err => console.log(err))
    }, []) */

  /*  blockchain

    async function getData() {
    const res = await fetch('/api/')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
 
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
 
    return res.json()
  }
 
 
  useEffect(() => {
    getData().then(res => console.log(res)).catch(err => console.log(err))
  }, []) */


  return (
    <>
      <Header />
      <Products />
      {provider && contract && (
        <>
          <input
            type="text"
            placeholder="Enter owner address"
            value={ownerAddress}
            onChange={(e) => setOwnerAddress(e.target.value)}
          />
          <button onClick={handlegetAllOwners}>Add Owner</button>
          {/* Add buttons and UI elements to call other contract functions */}
        </>
      )}
    </>
  );
}
