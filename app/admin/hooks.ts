import {Credentials} from "@/app/admin/login/types";
import {useUserContext} from "@/app/admin/userContext";
import { useRouter } from 'next/navigation'
import {useMutation} from "@/utils/hooks/useMutation";
import {adminLogin} from "@/app/admin/helpers/api/admin-login";

export const useAuth = () => {
    const userContext = useUserContext();
    const router = useRouter();
    const {mutate: loginMutate} = useMutation(adminLogin)
    const login = async (credentials: Credentials) => {
        try {
            const user = await loginMutate(credentials);
            userContext.setData(user);
            window.localStorage.setItem('accessToken', user.accessToken)
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
