"use client"
import React, { useContext, useEffect } from 'react'
import { BackSVG, DeleteSVG, MarkSVG } from '../components/Svgs'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/navigation'
import { AppContext } from '../Context'

export default function Page() {
    const { address, authorizedAddress, setAuthorizedAddress, requestingAuthorization, setRequestingAuthorization, owner } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if (owner?.toLowerCase() !== address?.toLowerCase()) {
            router.push('/')
            return
        }
    }, [address, owner])

    const deleteRequest = (value) => {
        setRequestingAuthorization(prevArray => prevArray.filter(item => item !== value))
    }

    const authorizedRequest = (value) => {
        setAuthorizedAddress(prevArray => [...prevArray, value]);
        deleteRequest(value)
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

                <h4 className='py-5 mt-20 mb-5 border-b border-[#DEDDD9] text-[#545D5C] text-3xl font-medium font-serif'>
                    Authorized Address
                </h4>
                <ul className='flex flex-col gap1'>
                    {authorizedAddress?.map((item, index) => (
                        <li
                            className='p-3 odd:bg-[#B98D58]/25 even:bg-[#B98D58]/10 hover:bg-white flex items-center gap-2'
                            key={index}
                        >
                            <span className='italic font-serif text-sm font-extralight select-none'>{index + 1}.</span>
                            <span> {item}</span>
                        </li>
                    ))}
                </ul>

                <h4 className='py-5 mt-20 mb-5 border-b border-[#DEDDD9] text-[#545D5C] text-3xl font-medium font-serif'>
                    Address Requesting for Authorization
                </h4>
                <ul className='flex flex-col gap1'>
                    {requestingAuthorization?.map((item, index) => (
                        <li
                            className='p-3 odd:bg-[#B98D58]/25 even:bg-[#B98D58]/10 hover:bg-white flex items-center justify-between gap-3'
                            key={index}
                        >
                            <span className='flex items-center gap-2'>
                                <span className='italic font-serif text-sm font-extralight select-none'>{index + 1}.</span>
                                <span>{item}</span>
                            </span>
                            <span className='flex items-center gap-4'>
                                <button
                                    className='text-green-600'
                                    onClick={() => authorizedRequest(item)}
                                >
                                    <MarkSVG />
                                </button>
                                <button
                                    className='text-red-700'
                                    onClick={() => deleteRequest(item)}
                                >
                                    <DeleteSVG />
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
