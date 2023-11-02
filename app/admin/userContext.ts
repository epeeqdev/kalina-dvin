'use client'
import {createContext, useContext} from "react"
import {UserContext} from "@/app/admin/types";


export const userContext = createContext<UserContext>({
    data: null,
    setData: () => null
});

export const useUserContext = () => useContext(userContext)

