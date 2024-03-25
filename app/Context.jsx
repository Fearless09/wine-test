"use client"
import React, { createContext, useState } from "react";

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
    const [wines, setWines] = useState([
        {
            uuid: '6ab51925-37b4-4031-ac15-d5c0efaa9ea2',
            name: `2016 Ca'Marcanda Vistamare Toscana`,
            year: 2013,
            country: 'France',
            type: 'Chardonnay',
            price: '$108.00',
            description: `The flavors are lively and fresh with a fine balance and a perceptible elegance and finesse. Ca’Marcanda Vistamare Toscana 2016 is fragrant and expressive with fruity and floral notes which recall apples and white peaches.`,
            image: "/new/1.webp",
            owner_address: "0x1a930b92c36d3ba43cfcf5ce5edca2e75a7c8cdb"
        },
        {
            uuid: '5a5211a7-f1ba-428b-90b8-2340470921d4',
            name: `2016 Chateau Montjoie Barsac`,
            year: 2013,
            country: 'Italy',
            type: 'Chardonnay',
            price: '$158.00',
            description: `Chateau Montjoie Barsac 2019 has a transparent golden color. The nose combines notes of fresh red fruit with pleasant hints of vanilla. The palate is well balanced, supple, and remarkable for its silky tannins and pleasurable freshness. It has a distinctive lengthy finish.`,
            image: "/new/2.webp",
            owner_address: ""
        },
    ])
    const [address, setAddress] = useState(null)

    return (
        <AppContext.Provider
            value={{ wines, setWines, address, setAddress }}
        >
            {children}
        </AppContext.Provider>
    )
}