'use client'
import {PropsWithChildren} from "react";
import Link from "next/link";
import {useAuth} from "@/app/admin/hooks";
import {RouteGuard} from "@/app/admin/RouteGuard";
import {Button} from "@/app/admin/main/components/controls/button";

export default function Layout({children}:PropsWithChildren){
	const {logout} = useAuth()
	return <RouteGuard>
		<div className='flex min-h-screen w-full'>
		<div className='w-[200px] min-h-screen border-r px-2 py-4'>
			<Button variant="alert" className="mb-4 text-[14px] ml-4" onClick={logout}>Log out</Button>
			<Link className="block px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition" href='/admin/main/categories'>Categories</Link>
			<Link className="block px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition" href='/admin/main/brands'>Brands</Link>
			<Link className="block px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition" href='/admin/main/products'>Products</Link>
			<Link className="block px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition" href='/admin/main/products/add'>Add Product</Link>
			<Link className="block px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition" href='/admin/main/about-us'>About</Link>
		</div>
		<div className='px-4 py-5 w-full'>
			{children}
		</div>

	</div>
	</RouteGuard>
}
