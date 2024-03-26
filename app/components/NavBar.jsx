"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context'
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const { setAddress, address, authorizedAddress, requestingAuthorization, setRequestingAuthorization, owner } = useContext(AppContext)
    const pathname = usePathname()

    useEffect(() => {
        const finf = authorizedAddress.find(item => item.toLowerCase() != address?.toLowerCase())
    }, [address])

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    setAddress(result[0])
                })
        } else {
            console.log('Meta Mask Not Install')
        }
    }

    const disconnectWallet = () => {
        setAddress(null)
    }

    return (
        <nav className='p-5 absolute top-0 left-0 w-full'>
            <div className='container mx-auto flex items-center justify-between gap-8'>
                <div className='flex items-center gap-4'>
                    {/* Home */}
                    <Link
                        href={'/'}
                        className='relative group'
                    >
                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full w-0 group-hover:w-full bg-[#B98D58] ${pathname === "/" && 'w-full'}`}></span>
                        <span className='p-2'>Home</span>
                    </Link>
                    {/* Admin */}
                    {owner?.toLowerCase() === address?.toLowerCase() && (
                        <Link
                            href={'/admin'}
                            className='relative group'
                        >
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full w-0 group-hover:w-full bg-[#B98D58] ${pathname === "/admin" && 'w-full'}`}></span>
                            <span className='p-2'>Admin</span>
                        </Link>
                    )}
                    {/* Add Wine */}
                    {authorizedAddress.find(item => item.toLowerCase() === address?.toLowerCase()) && (
                        <Link
                            href={'/addwine'}
                            className='relative group'
                        >
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full w-0 group-hover:w-full bg-[#B98D58] ${pathname === "/addwine" && 'w-full'}`}></span>
                            <span className='p-2'>Add Wine</span>
                        </Link>
                    )}
                    {/* Request Authorization */}
                    {address && !(authorizedAddress.find(item => item.toLowerCase() === address?.toLowerCase())) && (
                        <button
                            className='px-2 py-1 rounded border border-white hover:bg-[#F9F8F4] hover:text-black active:scale-[0.98] text-sm disabled:cursor-not-allowed disabled:bg-[#F9F8F4] disabled:text-black'
                            onClick={() => setRequestingAuthorization(prevArray => [...prevArray, address])}
                            disabled={requestingAuthorization.find(item => item.toLowerCase() === address?.toLowerCase())}
                        >
                            {requestingAuthorization.find(item => item.toLowerCase() === address?.toLowerCase())
                                ? "Permission Requested"
                                : "Request For Permission"}
                        </button>
                    )}
                </div>

                <h1 className='text-4xl font-semibold font-serif'>Winery</h1>

                {address ? (
                    <button
                        className='px-4 py-2 rounded bg-red-700 hover:bg-red-700/75 text-white active:scale-[0.98]'
                        onClick={() => disconnectWallet()}
                    >
                        Disconnect Wallet
                    </button>
                ) : (
                    <button
                        className='px-4 py-2 rounded border border-white hover:bg-[#F9F8F4] hover:text-black active:scale-[0.98]'
                        onClick={() => connectWallet()}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    )
}
