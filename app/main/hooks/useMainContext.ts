'use client'
import { useContext } from 'react';

import { MainActionsContext, MainStateContext } from '../context';

export const useMainState = () => useContext(MainStateContext);

export const useMainActions = () => useContext(MainActionsContext);

export const useMainContext = () => {
    const state = useMainState();
    const actions: any= useMainActions();

    return [state, actions];
};