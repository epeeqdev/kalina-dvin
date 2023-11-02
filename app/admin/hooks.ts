import axios from "@/axios";
import {Credentials} from "@/app/admin/login/types";
import {User} from "@/app/admin/types";
import {useUserContext} from "@/app/admin/userContext";
import { useRouter } from 'next/navigation'

export const useAuth = () => {
    const userContext = useUserContext();
    const router = useRouter();
    const login = async (credentials: Credentials) => {
        try {
            const user = await axios.post<User>("/api/login", credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            userContext.setData(user.data);
            window.localStorage.setItem('accessToken', user.data.accessToken)
        }catch (e){
            console.log(e)
        }
    }
    const logout = async () => {
        window.localStorage.removeItem('accessToken');
        userContext.setData(null);
        router.push('/admin/login');
    }

    return {login, logout}
}
