'use client'
import {memo, useMemo, useState} from "react";
import {MainActionsContext, MainStateContext} from "@/app/main/context";
export type Language = string

type Props = {
    children: any,
    defaultValue: Language
}

export const MainContextProvider = memo(({ children, defaultValue}: Props) => {
    const [state, setState] = useState( defaultValue);

    const actions = useMemo(() => {
        return [
            setState,
            () => setState(defaultValue)
        ];
    }, [setState, defaultValue]);
    return (
        <MainActionsContext.Provider value={actions}>
            <MainStateContext.Provider value={state}>
                {children}
            </MainStateContext.Provider>
        </MainActionsContext.Provider>
    )
});

