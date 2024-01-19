'use client'
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@/components/controls/input";
import {Credentials} from "@/app/admin/login/types";
import {useAuth} from "@/app/admin/hooks";
import {useUserContext} from "@/app/admin/userContext";
import { useRouter } from 'next/navigation'
import {useEffect} from 'react'
import {Button} from "../main/components/controls/button";
import LoadingSpinner from "@/components/controls/loading-spinner";

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
})
export default function Login(){
	const {register, handleSubmit} = useForm<Credentials>({
		resolver: yupResolver(validationSchema)
	});
	const userContext = useUserContext();
	const router = useRouter();
	const {login, isLoading} = useAuth();
	useEffect(() => {
		if(userContext.data){
			router.replace("/admin/main");
		}
	},[userContext.data, isLoading])

	return <div className='flex justify-center items-center min-h-screen px-5'>
		{isLoading && <LoadingSpinner/>}
		<form onSubmit={handleSubmit(login)} className='w-full max-w-[500px] flex flex-col justify-center items-stretch gap-y-[10px]'>
		<div>
			<Input label={{am: "Մուտքանուն", ru: 'Логин'}} placeholder={{am: "Լրացրեք մուտքանունը", ru: 'Введите логин'}} {...register('username')} className='w-full'/>
		</div>
		<div>
			<Input label={{am: "Գաղտնաբառ",ru: 'Пароль'}} type='password' placeholder={{am: "Լրացրեք գաղտնաբառը" ,ru: 'Введите пароль'}} {...register('password')} className='w-full'/>
		</div>
		<Button title={{am: "Մուտք", ru: "Войти"}} type='submit' className='mt-2 flrx justify-center'  variant="primary"></Button>
	</form>
	</div>
}
