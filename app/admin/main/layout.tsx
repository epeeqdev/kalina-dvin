'use client'
import {PropsWithChildren, useState} from "react";
import Link from "next/link";
import {useAuth} from "@/app/admin/hooks";
import {RouteGuard} from "@/app/admin/RouteGuard";
import {Button} from "@/app/admin/main/components/controls/button";
import Hamburger from 'hamburger-react'

export default function Layout({children}:PropsWithChildren){

	const [isOpen, setIsOpen] = useState(false);
	const styles = "block px-4 py-2 text-[14px] hover:font-bold hover:bg-[#eeeeee] hover:text-gray-800 transition"

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const {logout} = useAuth()
	return <RouteGuard>
		<div className='flex min-h-screen w-full relative'>
				<div className={`fixed inset-y-0 left-0 z-50  bg-gray-800 text-white w-64 py-4 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
						<Button variant="alert" className="fixed mb-4 text-[14px] ml-[100px] bottom-0 left-10" onClick={logout}>Log out</Button>
						<div className="mt-10">
							<Link className={styles} href={'/admin/main/categories'}>Категории</Link>
							<Link className={styles} href={'/admin/main/brands'}>Бренды</Link>
							<Link className={styles} href={'/admin/main/products'}>Продукты</Link>
							<Link className={styles} href={'/admin/main/attributes'}>Атрибуты</Link>
							<Link className={styles} href={'/admin/main/pages/products'}>Страница Продуктов</Link>
							<Link className={styles} href={'/admin/main/pages/categories'}>Страница Категорий</Link>
							<Link className={styles} href={'/admin/main/slider'}>Слайдер</Link>
							<Link className={styles} href={'/admin/main/contacts'}>Контакты</Link>
							<Link className={styles} href={'/admin/main/about-us'}>О нас</Link>
						</div>
				</div>
			<button
				onClick={() => toggleSidebar()}
				className={`z-[60] absolute ${isOpen ? "text-white" : "text-black"} left-2 toggle-btn`}>
				<Hamburger size={25}/>
			</button>
			<div className='px-4 py-5 w-full'>
				{children}
			</div>
		</div>
	</RouteGuard>
}
