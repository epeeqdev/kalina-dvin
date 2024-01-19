'use client'
import React, {useEffect, useState} from 'react';
import {MainContextProvider} from "@/app/admin/main/provider";

const DEFAULT_STATE = 'am'

export const LngProvider = React.memo(({ children }: any) => {
    const selectLng = localStorage.getItem('lng')
    const [defaultLng, setDefaultLng] = useState(selectLng)

    useEffect(() => {
        if(selectLng) {
            setDefaultLng(selectLng)
        }
    },[])

    const language = defaultLng  ? defaultLng : DEFAULT_STATE
    return (
        <MainContextProvider defaultValue={language}>
            {children}
        </MainContextProvider>
    );
});
