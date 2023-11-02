'use client'
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {Credentials} from "@/app/admin/login/types";
import {useAuth} from "@/app/admin/hooks";
import {useUserContext} from "@/app/admin/userContext";
import { useRouter } from 'next/navigation'
import {useEffect} from 'react'

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
	const {login} = useAuth();
	useEffect(() => {
		if(userContext.data){
			router.replace("/admin/main")
		}
	},[userContext.data])


	return <div className='flex justify-center items-center min-h-screen'>
		<form onSubmit={handleSubmit(login)} className='w-full max-w-[500px] flex flex-col justify-center items-stretch gap-y-[10px]'>
		<div>
			<Input label='Username' placeholder='Enter username' {...register('username')} className='w-full'/>
		</div>
		<div>
			<Input label='Password' placeholder='Enter password' {...register('password')} className='w-full'/>
		</div>
		<Button type='submit' className='mt-2'>Login</Button>
	</form>
	</div>
}
