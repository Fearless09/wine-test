"use client"
import React, { useContext, useEffect, useState } from 'react'
import { BackSVG, DeleteSVG, MarkSVG } from '../components/Svgs'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/navigation'
import { AppContext } from '../Context'

export default function Page() {
    const { contract, address, authorizedAddress, setAuthorizedAddress, requestingAuthorization, setRequestingAuthorization, owner, addOwner, removeOwner } = useContext(AppContext)
    const [addAddress, setAddAddress] = useState("")
    const [isDiable, setIsDisable] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (contract && owner && address) {
            if (owner?.toLowerCase() !== address?.toLowerCase()) {
                router.push('/')
                return
            }
        }
    }, [address, owner, contract])

    useEffect(() => {
        if (!addAddress || addAddress === "" || addAddress?.trim() === "") {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [addAddress])

    const onAdd = async (e) => {
        e.preventDefault()
        await addOwner(addAddress)
        setAddAddress("")
    }

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
                            className='p-3 pe-16 odd:bg-[#B98D58]/25 even:bg-[#B98D58]/10 hover:bg-white flex items-center gap-5 justify-between'
                            key={index}
                        >
                            <span className='flex items-center gap-2'>
                                <span className='italic font-serif text-sm font-extralight select-none'>{index + 1}.</span>
                                <span> {item}</span>
                            </span>
                            {item?.toLowerCase() !== owner?.toLowerCase() && (
                                <button
                                    className='text-red-700'
                                    onClick={() => removeOwner(item)}
                                >
                                    <DeleteSVG />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                {/* <h4 className='py-5 mt-20 mb-5 border-b border-[#DEDDD9] text-[#545D5C] text-3xl font-medium font-serif'>
                    Address Requesting for Authorization
                </h4> */}
                {/* <ul className='flex flex-col gap1'>
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
                </ul> */}

                <h4 className='py-5 mt-20 mb-5 border-b border-[#DEDDD9] text-[#545D5C] text-3xl font-medium font-serif'>
                    Add Address
                </h4>
                <form
                    className='flex items-center gap-5'
                    onSubmit={onAdd}
                >
                    <input
                        className='bg-[#B98D58]/10 border-2 border-[#B98D58]/25 focus-visible:outline-[#B98D58] outline-2 outline-transparent py-3 px-6 rounded-lg w-full max-w-[550px]'
                        type="text"
                        placeholder='Address'
                        value={addAddress}
                        onChange={(e) => setAddAddress(e.target.value)}
                        required
                    />
                    <button
                        className='w-max py-3 px-12 rounded-lg border-2 border-[#B98D58] bg-[#B98D58]/25 text-[#545D5C] disabled:bg-[#B98D58]/10 disabled:border-[#B98D58]/25 font-medium active:scale-[0.95]'
                        type='submit'
                        disabled={isDiable}
                    >
                        ADD
                    </button>
                </form>
            </div>
        </section>
    )
}
