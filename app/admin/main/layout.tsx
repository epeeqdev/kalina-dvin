'use client'
import {PropsWithChildren, useEffect, useState} from "react";
import Link from "next/link";
import {useAuth} from "@/app/admin/hooks";
import {RouteGuard} from "@/app/admin/RouteGuard";
import Hamburger from 'hamburger-react'
import { Toaster } from 'react-hot-toast';
import {useMatchMedia} from "@/utils/hooks/useMatchMedia";
import IconComponent from "@/app/admin/main/components/icon";
import Accordion from "@/app/admin/main/components/accordion";

export default function Layout({children}:PropsWithChildren){
	const isMobile = useMatchMedia('(max-width: 639.1px)');
	const isLaptop = useMatchMedia('(min-width: 1024px)');

	const [isOpen, setIsOpen] = useState(true);
	const styles = "block px-4 py-2 text-[14px] hover:font-bold hover:bg-[#eeeeee] hover:text-gray-800 transition whitespace-nowrap"

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const [accordionIsOpen, setAccordionIsOpen] = useState(false);


	const pages = [
		{ title: 'О нас', link: '/admin/main/about-us' },
		{ title: 'Продукты', link: '/admin/main/pages/products' },
		{ title: 'Главная страница', link: '/admin/main/slider' },
		{ title: 'Категории', link: '/admin/main/pages/categories' },
	];

	useEffect(() => {
		if(isMobile){
			setIsOpen(false)
		}
		if(isLaptop){
			setIsOpen(true)
		}
	},[isMobile, isLaptop])

	const toggleAccordion = () => {
		setAccordionIsOpen(prev => !prev);
	};

	const {logout} = useAuth()
	return <RouteGuard>
		<div className="mt-10">
			<div className="fixed bg-gray-800 w-full top-0 z-50 text-white flex justify-between items-center">
				<button
					onClick={() => toggleSidebar()}
					className={`toggle-btn`}>
					<Hamburger toggled={isOpen} size={25}/>
				</button>
				<div>
					<IconComponent onClick={logout} name={"logout"} className="bg-red-600 w-[40px] h-[30px] mr-5 p-[5px] cursor-pointer hover:bg-red-800" />
				</div>
			</div>
			<div className='flex min-h-screen overflow-hidden'>
				<div className={`fixed z-[40] sm:relative sm:mt-0  sm inset-y-0 left-0 bg-gray-800 text-white ${isOpen ? "w-[200px] sm:w-[350px]" : "w-0 sm:w-0"} transition-all duration-300`}>
					<div className={`mt-20 sm:mt-5 overflow-hidden ${isOpen ? "opacity-1 transition-all duration-300" : "opacity-0 transition-all duration-300"} `}>
						<Link className={styles} href={'/admin/main/categories'}>Категории</Link>
						<Link className={styles} href={'/admin/main/brands'}>Бренды</Link>
						<Link className={styles} href={'/admin/main/products'}>Продукты</Link>
						<Link className={styles} href={'/admin/main/attributes'}>Атрибуты</Link>
						<Link className={styles} href={'/admin/main/contacts'}>Контакты</Link>
						<div>
							<div className={`${styles} cursor-pointer flex justify-between`} onClick={() => toggleAccordion()}>
							 <div>Страници</div>
								<IconComponent name={accordionIsOpen ? "chevronUp" : "chevronDown"}/>
							</div>
							<Accordion isOpen={accordionIsOpen} items={pages} />
						</div>

					</div>
				</div>
				<div className='pb-4 w-full h-[100vh] pt-[48px]'>
					{children}
				</div>
			</div>
		<Toaster/>
		</div>

	</RouteGuard>
}
