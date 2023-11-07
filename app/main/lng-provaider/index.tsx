'use client'
import React, {useEffect, useState} from 'react';
import {MainContextProvider} from "@/app/main/provaider";

const DEFAULT_STATE = 'arm'

export const LngProvider = React.memo(({ children }: any) => {
    const [defaultLng, setDefaultLng] = useState('arm')
    useEffect(() => {
        const selectLng = localStorage.getItem('lng')
        if(selectLng) {
            setDefaultLng(selectLng)
        }
    },[])

    const language = defaultLng  ? defaultLng : DEFAULT_STATE
    return (
        <MainContextProvider defaultValue={language} >
            {children}
        </MainContextProvider>
    );
});
