"use client"
import React, { useContext } from 'react'
import { AppContext } from '../Context'
import Product from './Product'

export default function Products() {
    const { wines } = useContext(AppContext)

    return (
        <section className='p-5 pb-[100px] bg-[#F9F8F4] bg-[url("/grape.webp")] bg-no-repeat bg-center'>
            <div className='container mx-auto mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10'>
                {wines?.map((item, index) => (
                    <Product
                        key={index}
                        item={item}
                    />
                ))}
            </div>
        </section >
    )
}
