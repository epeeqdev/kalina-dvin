'use client'
import React from 'react';
import {MainContextProvider} from "@/app/main/provaider";

const DEFAULT_STATE = 'arm'

export const LngProvider = React.memo(({ children }: any) => {
    const lng = localStorage.getItem('lng')
    const language = lng  ? lng : DEFAULT_STATE
    return (
        <MainContextProvider defaultValue={language} >
            {children}
        </MainContextProvider>
    );
});
