import axios from "@/axios";
import {User} from "@/app/admin/types";
import {Credentials} from "@/app/admin/login/types";

export const adminLogin = async (credentials: Credentials) => {
   return await axios.post<User>("/api/login", credentials);
}