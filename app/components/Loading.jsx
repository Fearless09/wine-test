"use client"

import React, { useContext } from 'react'
import { AppContext } from '../Context'
import { LoadingSVG } from './Svgs'

export default function Loading() {
    const { loading } = useContext(AppContext)

    return loading && (
        <div className='fixed top-0 left-0 w-full h-screen z-50 bg-black/40 flex items-center justify-center'>
            <LoadingSVG
                size={'100px'}
                color={"#B98D58"}
            />
        </div>
    )
}
