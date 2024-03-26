"use client"
import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { BackSVG } from '../components/Svgs'
import { useRouter } from 'next/navigation'
import { AppContext } from '../Context'
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const { setWines, address, authorizedAddress } = useContext(AppContext)
    const [newWine, setNewWine] = useState({
        name: null,
        year: null,
        country: null,
        type: null,
        price: null,
        description: null,
        image: null
    })

    const router = useRouter()

    useEffect(() => {
        if (!(authorizedAddress.find(item => item.toLowerCase() === address?.toLowerCase()))) {
            router.push('/')
            return
        }
    }, [authorizedAddress, address])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWine(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        const { name } = e.target;
        reader.onloadend = () => {
            setNewWine(prevState => ({
                ...prevState,
                [name]: reader.result
            }));
            // console.log(reader.result)
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const addWine = (e) => {
        e.preventDefault()

        if ((address === null) || (address === undefined)) {
            alert('Connect your wallect before you can add wine')
            return
        } else {
            const concatenatedNewWine = {
                ...newWine,
                ...{ owner_address: address },
                ...{ uuid: uuidv4() }
            }
            setWines(prevWines => [...prevWines, concatenatedNewWine]);
            console.log("Concate", concatenatedNewWine)
        }
    }

    return (
        <section className='bg-[#F9F8F4]'>
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

                {/* Add Wine */}
                <h1 className='mt-20 text-center font-semibold font-serif text-5xl'>
                    Add Your Wine
                </h1>
                <form onSubmit={addWine}>
                    {/* Input Field */}
                    <div className='mt-8 md:grid grid-cols-2 space-y-8 md:space-y-0 gap-x-5 gap-y-8'>
                        {/* Name */}
                        <div className='w-full flex flex-col gap-2'>
                            <label htmlFor="name" className='px-1'>
                                Name:
                            </label>
                            <input
                                type="text"
                                name='name'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.name}
                                required
                            />
                        </div>
                        {/* Year */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="year" className='px-1'>
                                Year:
                            </label>
                            <input
                                type="text"
                                name='year'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.year}
                                required
                            />
                        </div>
                        {/* Country */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="country" className='px-1'>
                                Country:
                            </label>
                            <input
                                type="text"
                                name='country'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.country}
                                required
                            />
                        </div>
                        {/* Type */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="type" className='px-1'>
                                Type:
                            </label>
                            <input
                                type="text"
                                name='type'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.type}
                                required
                            />
                        </div>
                        {/* Price */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="price" className='px-1'>
                                Price:
                            </label>
                            <input
                                type="text"
                                name='price'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.price}
                                required
                            />
                        </div>
                        {/* Image */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="image" className='px-1'>
                                Image:
                            </label>
                            <input
                                type="file"
                                name='image'
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        {/* Description */}
                        <div className='col-span-2 flex flex-col gap-2'>
                            <label htmlFor="description" className='px-1'>
                                Description:
                            </label>
                            <textarea
                                name="description"
                                cols="30"
                                rows="10"
                                className='py-3 px-2 rounded-lg border bg-[#B98D58]/15'
                                onChange={handleChange}
                                value={newWine.description}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <button
                        className='mt-11 w-full p-4 rounded-lg bg-[#B98D58] text-white font-semibold text-lg active:scale-[0.98]'
                        type='submit'
                    >
                        ADD WINE
                    </button>
                </form>
            </div>
        </section>
    )
}
