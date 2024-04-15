"use client"
import React, { useContext, useEffect, useState } from 'react'
import { BigNumber, ethers } from 'ethers';
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import NavBar from '@/app/components/NavBar'
import { AppContext } from '@/app/Context'
import { BackSVG, DeleteSVG } from '@/app/components/Svgs'
import WineRegistryContract from '../../blockchain/WineRegistry.json';

export default function Page({ params }) {
    const router = useRouter()
    const { contract, removeWineById, address, setLoading } = useContext(AppContext)

    const { id } = params
    // console.log(id)
    const [wine, setWine] = useState([])
    const currentURL = window.location.href
    // console.log(currentURL)

    const getWineById = async () => {
        setLoading(true)
        toast("Geting Wine Information")
        try {
            const block_wine = await contract.getWineById(address, id);
            console.log('Wine:', block_wine);
            setWine(block_wine)
            setLoading(false)
            return block_wine;
        } catch (error) {
            // console.error('Error getting wine:', error);
            setLoading(false)
            toast.error("Error getting wine information")
            return null;
        }
    };

    /* const getContract = async () => {
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/d0f4119a707544e7b1fcbc93c9bf659e");
        const wineryContract = new ethers.Contract(
            WineRegistryContract.address,
            WineRegistryContract.output.abi,
            provider);
        return wineryContract
        /* const balance = await tokenContract.balanceOf("0xabc...");
        console.log('Balance:', balance.toString());
    } */

    useEffect(() => {
        setLoading(true)
        toast("Geting Wine Information")
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/d0f4119a707544e7b1fcbc93c9bf659e");
        const wineryContract = new ethers.Contract(
            WineRegistryContract.address,
            WineRegistryContract.output.abi,
            provider);

        if (provider && wineryContract && id && id.length) {
            wineryContract.getWineById(id[0], id[1]).then(block_wine => {
                console.log('Wine:', block_wine);
                setWine(block_wine)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.error(err)
            })

            // getWineById(id[0], id[1])
        }

        return () => setWine([])
    }, [id])

    const deleteWine = async () => {
        if (address?.toLowerCase() === (wine.length && wine[0].toLowerCase())) {
            console.log("Delete Clicked")
            try {
                await removeWineById(address, wine[2])
                getWineById(address, id[1])
                console.log("Wine Removed")
            } catch (error) {
                console.error('Error removing wine:', error);
            }
        }
    }

    return (
        <section className='bg-[#F9F8F4] min-h-screen'>
            <header className="h-[82px] bg-[url('/header-bg.jpg')] bg-no-repeat bg-cover bg-center text-white">
                <div className='bg-black/20 h-full'>
                    <NavBar />
                </div>
            </header>

            <div className='container mx-auto mt-20 p-5'>
                <button
                    className='px-4 py-2 rounded-md border border-black/50 flex items-center gap-2 hover:bg-white'
                    onClick={() => router.back()}
                >
                    <BackSVG />
                    <span>Go Back</span>
                </button>

                {/* Wine */}
                {wine === null || wine === undefined ?
                    <h1 className='mt-20 font-semibold font-serif text-center text-4xl'>Wine Not Found</h1> :
                    <div className='mt-20 grid md:grid-cols-2 gap-x-5 gap-y-10'>
                        {/* Wine Image */}
                        <div className='relative text-center'>
                            <Image
                                src={"/wine.jpeg"}
                                width={555}
                                height={1024}
                                alt={wine.length && wine[2]}
                                className='mx-auto sticky top-10'
                            />
                        </div>
                        {/* Wine Details */}
                        <div className='md:pt-32'>
                            <h1 className='text-6xl leading-tight font-light text-[#545D5C] mb-5'>
                                {wine.length && wine[2]}
                            </h1>
                            {/* <p className='mb-5 font-medium text-[#B98D58]'>
                                {wine?.price}
                            </p>
                            <p className='text-lg font-extralight text-[#545D5C] font-serif leading-8'>
                                {wine?.description}
                            </p> */}

                            <h4 className='py-5 my-5 border-b border-[#DEDDD9] text-[#545D5C] text-xl font-medium font-serif'>
                                Technical
                            </h4>
                            {/* <p className='text-[#545D5C] font-serif text-lg flex items-center gap-3 mb-2'>
                                <span className='font-medium'>Harvest Date:</span>
                                <span className='font-extralight'>{wine?.year}</span>
                            </p> */}
                            <p className='text-[#545D5C] font-serif text-lg flex items-center gap-3 mb-2'>
                                <span className='font-medium'>Country:</span>
                                <span className='font-extralight'>{wine.length && wine[5]}</span>
                            </p>
                            <p className='text-[#545D5C] font-serif text-lg flex items-center gap-3 mb-2'>
                                <span className='font-medium'>Region:</span>
                                <span className='font-extralight'>{wine.length && wine[4]}</span>
                            </p>
                            <p className='text-[#545D5C] font-serif text-lg flex items-center gap-3 mb-2'>
                                <span className='font-medium'>Area:</span>
                                <span className='font-extralight'>{wine.length && wine[6]}</span>
                            </p>
                            {/* <p className='text-[#545D5C] font-serif text-lg flex items-center gap-3'>
                                <span className='font-medium'>Type:</span>
                                <span className='font-extralight'>{wine?.type}</span>
                            </p> */}

                            <h4 className='py-5 my-5 border-b border-[#DEDDD9] text-[#545D5C] text-xl font-medium font-serif'>
                                QR Code
                            </h4>
                            <Image
                                src={`http://api.qrserver.com/v1/create-qr-code/?data=${currentURL}&size=150x150`}
                                width={150}
                                height={150}
                                alt={`${wine?.name} QR Code`}
                            />
                            <span>
                                <a
                                    href={`http://api.qrserver.com/v1/create-qr-code/?data=${currentURL}&size=150x150`}
                                    download={true}
                                    className='hover:text-orange-500'
                                    target='_blank'
                                >
                                    Download QR Code
                                </a>
                            </span>

                            {(wine.length && wine[0].toLowerCase()) === address?.toLowerCase() && (
                                <button
                                    className='mt-10 w-full px-4 py-2 rounded-lg bg-red-700/95 text-white active:scale-[0.98] flex items-center gap-3 justify-center'
                                    onClick={() => deleteWine()}
                                >
                                    <DeleteSVG />
                                    <span className='font-medium text-lg'>Delete Wine</span>
                                </button>
                            )}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}