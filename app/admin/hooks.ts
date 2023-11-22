import {Credentials} from "@/app/admin/login/types";
import {useUserContext} from "@/app/admin/userContext";
import { useRouter } from 'next/navigation'
import {useMutation} from "@/utils/hooks/useMutation";
import {adminLogin} from "@/app/admin/helpers/api/admin-login";
import {useEffect, useState} from "react";

export const useAuth = () => {
    const [isInitialized, setInitialized] = useState(false)
    const userContext = useUserContext();
    const router = useRouter();
    const {mutate: loginMutate, isLoading} = useMutation(adminLogin)
    const login = async (credentials: Credentials) => {
        try {
            const user = await loginMutate(credentials);
            userContext.setData(user);
            window.localStorage.setItem('accessToken', user.accessToken)
        }catch (e){
            console.log(e)
        }finally {
            setInitialized(true);
        }
    }

    useEffect(() => {
        if(!window.localStorage.getItem('accessToken')){
            setInitialized(true)
        }
    }, []);
    const logout = async () => {
        window.localStorage.removeItem('accessToken');
        userContext.setData(null);
        router.push('/admin/login');
    }

    return {login, logout, isLoading, isInitialized}
}
