"use client"
import { useEffect, useState } from "react";
import Header from "./components/Header";
// import Products from "./components/Products";
import useWineRegistry from './blockchain/useWineRegistry';


export default function Home() {
  const {
    provider,
    contract,
    addOwner,
    removeOwner,
    getAllOwners,
    addWine,
    removeWineById,
    getAllWinesByOwner,
    getWineById,
    addMultipleWinesByOwner,
    removeMultipleWinesByOwner,
    getStringOfBigNumber
  } = useWineRegistry();

  const [ownerAddress, setOwnerAddress] = useState('');

  const handlegetAllOwners = async () => {

    //1. add owner
    // addOwner('0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3')

    //======================

    //2. remove owner
    // removeOwner('0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3')

    //======================

    //3. Get all owners
    // getAllOwners()

    //====================

    //4. add wine by owner
    /* addWine(
      '0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3',
      'wine name2',
      11,
      'wine region',
      'wine country',
      'wine area',
      110,
      'wine website'
    ) */

    //=======================

    //5. remove wine by address and id
    // removeWineById('0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3', '0xf1412a247f91d0e27ec56d92f70195d30e6777de0f30f633f7f40ba3c4d85b84')

    //========================

    //6. add multiple wines by owner
    /* addMultipleWinesByOwner(
      '0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3',
      ['wine name3', 'wine name4'],
      [11, 12],
      ['wine region', 'wine region'],
      ['wine country', 'wine country'],
      ['wine area', 'wine area'],
      [110, 111],
      ['wine website', 'wine website']
    ) */

    //======================

    // 7. get all wines by owner
    // const wines = await getAllWinesByOwner(
    //   '0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3'
    // ).catch(error => console.error(error))
    // //get values of type BigNumber like lotsize from blockchain response.
    // //Note that we got multiple wines
    //console.log(getStringOfBigNumber(wines[0][3]))
    // if (wines) console.log(wines)
    // wines()

    //================

    //8. get a particular wine by address and id
    const wine = await getWineById(
      '0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3',
      '0x5967d1b6e95f2350395f643f5be97eae726bd40febbc98ad6f2f1e7321e7ddfe'
    ).catch(error => console.error(error))
    //get values of type BigNumber like lotsize from blockchain response.
    //Note that we got a single wine
    // if (wine) console.log(getStringOfBigNumber(wine[3]))
    if (wine) console.log(wine)

    //====================

    //9. remove multiple wines by owner
    /* removeMultipleWinesByOwner(
      '0x5CFb4D18bAfDb4A7E9663cf8CE87dB149D5611B3',
      [
        '0x41ce1ad0d1acabb8706e485d84da5590697bd95001583b21fee0d7e9f059e609',
        '0x5967d1b6e95f2350395f643f5be97eae726bd40febbc98ad6f2f1e7321e7ddfe'
      ]
    ) */

  };

  /* For NodeJS
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
      {/* <Products /> */}
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
