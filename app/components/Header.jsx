import React from 'react'
import NavBar from './NavBar'

export default function Header() {
    return (
        <header className="relative w-full h-svh bg-[url('/header-bg.jpg')] bg-no-repeat bg-cover bg-center text-white">
            <div className='bg-black/25 h-full bg-[url("/header-bottom.svg")] bg-no-repeat bg-bottom  bg-contain'>
                <NavBar />
                <div className='h-full p-5 container mx-auto flex items-center justify-center text-[#F9F8F4]'>
                    <h1 className='text-center font-semibold font-serif leading-relaxed text-5xl'>
                        Quality Wine from Organically Grown Grape
                    </h1>
                </div>
            </div>
            <div className='absolute w-full h-1 -bottom-1 left-0 -translate-y-1/2 bg-[#F9F8F4]'></div>
        </header>
    )
}
