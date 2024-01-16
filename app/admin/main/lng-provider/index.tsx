'use client'
import React, {useEffect, useState} from 'react';
import {MainContextProvider} from "@/app/admin/main/provider";

const DEFAULT_STATE = 'am'

export const LngProvider = React.memo(({ children }: any) => {
    const [defaultLng, setDefaultLng] = useState('am')
    useEffect(() => {
        const selectLng = localStorage.getItem('lng')
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
