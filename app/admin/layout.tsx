'use client'
import {PropsWithChildren, useMemo, useState, useEffect} from "react"
import {userContext} from './userContext'
import {User} from "@/app/admin/types";
import axios from "@/axios";
import { useRouter } from 'next/navigation'
import LoadingSpinner from "../../components/controls/loading-spinner";

export default function AdminLayout({children}:PropsWithChildren) {
    const [userData, setUserData] = useState<User | null>(null);
    const [isInitialized, setInitialized] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(window.localStorage.getItem('accessToken')){
            setLoading(true);
            axios.post<{ user: User }>('/api/getUser').then(d => {
                setUserData(d.data.user);
            }).catch(() => {
                router.push("/admin/login");
                setUserData(null);
            }).finally(() => {
                setLoading(false);
                setInitialized(true);
            })
        }else {
            router.push("/admin/login");
            setInitialized(true);
        }
    },[])

    const context = useMemo(() => ({
        data: userData,
        setData: setUserData
    }), [setUserData, userData])

    return <userContext.Provider value={context}>
        {isLoading && <div
            className='fixed w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center text-lg'>
            <LoadingSpinner />
        </div>}
        {isInitialized && children}
    </userContext.Provider>
}
