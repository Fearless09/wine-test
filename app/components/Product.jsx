import React, { useContext } from 'react'
import { DeleteSVG } from './Svgs'
import Image from 'next/image'
import Link from 'next/link'
import { AppContext } from '../Context'

export default function Product({ item }) {
    const { removeWineById, wines, setWines, address } = useContext(AppContext)

    const deleteWine = () => {
        if (address.toLowerCase() === item.owner.toLowerCase()) {
            removeWineById(address, item.id)
            console.log("Delete", item.id)
            console.log("Delete", address)
        }
    }
    return (
        <div
            className='relative border border-[#DEDDD9] p-4 rounded-lg shadow-lg'
        >
            {(address?.toLowerCase() === item.owner.toLowerCase()) && (
                <button
                    className='absolute z-20 right-4 top-4 rounded-full p-2 bg-red-200/50 text-red-700 flex items-center justify-center'
                    onClick={() => deleteWine()}
                >
                    <DeleteSVG />
                </button>
            )}
            <div className='h-[460px] overflow-hidden'>
                <Link
                    href={`/wine/${item.id}`}
                >
                    <Image
                        src={"/wine.jpeg"}
                        width={1080}
                        height={1080}
                        alt={item.name}
                        className='object-contain w-full h-full'
                    />
                </Link>
            </div>
            <div className='text-center px-[10px] pb-[50px] w-[250px] mx-auto'>
                <Link
                    href={`/wine/${item.id}`}
                >
                    <h1 className='pt-7 pb-2 text-3xl leading-normal font-serif text-[#545C5D]'>
                        {item.name}
                    </h1>
                    {/* <p className='font-serif mb-2 text-[#242E35]'>
                        {item.type}
                    </p>
                    <p className='font-medium text-[#b3af54]'>
                        {item.price}
                    </p> */}
                </Link>
            </div>
        </div>
    )
}
