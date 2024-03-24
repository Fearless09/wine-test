"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { data } from '@/data'
import { useRouter } from 'next/navigation'

export default function Page({ params }) {
    const { id } = params
    const [wine, setWine] = useState({})
    const router = useRouter()
    const currentURL = window.location.href

    console.log(currentURL)
    useEffect(() => {
        const filtereWine = data.filter(item => item.id === Number(id))
        if (filtereWine && (filtereWine.length !== 0)) {
            setWine(filtereWine[0])
        } else {
            router.push('/not-found')
        }
        console.log(filtereWine[0])
    }, [])

    return (
        <div className='container mx-auto p-5 mt-10'>
            <button
                className='px-4 py-2 rounded-lg border border-black text-black font-medium active:scale-[0.98]'
                onClick={() => router.back()}
            >
                Back
            </button>
            <div className='w-[500px] mx-auto mt-10'>
                <Image
                    src={wine?.image}
                    width={1080}
                    height={1080}
                    alt={wine.Image}
                />
                <div className='p-5 grid gap-2 capitalize'>
                    <h1 className='font-medium'>{wine.name}</h1>
                    <h4>{wine.year}</h4>
                    <h4>{wine.country}</h4>
                    <h4>{wine.type}</h4>
                    <h4>{wine.description}</h4>
                </div>
                <h1 className='text-center text-xl mt-10 font-semibold'>
                    Wine QR Code
                </h1>
                <div className='text-center'>
                    <Image
                        src={`http://api.qrserver.com/v1/create-qr-code/?data=${currentURL}&size=150x150`}
                        width={150}
                        height={150}
                        alt='QR Code'
                        className='mt-3 mx-auto'
                    />
                    <a
                        href={`http://api.qrserver.com/v1/create-qr-code/?data=${currentURL}&size=100x100.png`}
                        target='_blank'
                        className='italic hover:text-blue-600'
                        download
                    >
                        Download QR code
                    </a>
                </div>
            </div>
        </div>
    )
}
