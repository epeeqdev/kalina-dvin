'use client'
import {PropsWithChildren, useEffect, useRef, useState} from "react";
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

	const [isOpen, setIsOpen] = useState(false);
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

	const burgerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if(isMobile){
			setAccordionIsOpen(false)
			setIsOpen(false)
		}
		if(isLaptop){
			setIsOpen(true)
		}
	},[isMobile, isLaptop])

	const toggleAccordion = () => {
		setAccordionIsOpen(prev => !prev);
	};

	useEffect(() => {
		if (isOpen) {
			const handleOutsideClick = (e:any) => {
				if(!isLaptop){
					if (burgerRef.current && burgerRef.current.contains(e.target as Node)) {
						console.log("outside click")
						setIsOpen(false);
					}
				}

			};
			document.addEventListener('click', handleOutsideClick);
			return () => {
				document.removeEventListener('click', handleOutsideClick);
			};
		}
	}, [isOpen, isLaptop]);



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
					<IconComponent onClick={logout} name={"logout"} className="bg-red-600 w-[40px] rounded h-[30px] mr-5 p-[5px] cursor-pointer hover:bg-red-800" />
				</div>
			</div>
			<div className='flex min-h-screen overflow-hidden'>
				<div className={`fixed z-[40] sm:relative sm:mt-0  sm inset-y-0 left-0 bg-gray-800 text-white ${isOpen ? "w-[200px] sm:w-[350px]" : "w-0 sm:w-0"} transition-all duration-300`}>
					<div className={`mt-20 sm:mt-5 overflow-hidden ${isOpen ? "opacity-1 transition-all duration-300" : "opacity-0 transition-all duration-300"} `}>
						<Link className={styles} href={'/admin/main/categories'} onClick={() => !isLaptop ? setIsOpen(false) : null}>Категории</Link>
						<Link className={styles} href={'/admin/main/brands'} onClick={() => !isLaptop ? setIsOpen(false) : null}>Бренды</Link>
						<Link className={styles} href={'/admin/main/products'} onClick={() => !isLaptop ? setIsOpen(false) : null}>Продукты</Link>
						<Link className={styles} href={'/admin/main/attributes'} onClick={() => !isLaptop ? setIsOpen(false) : null}>Атрибуты</Link>
						<Link className={styles} href={'/admin/main/contacts'} onClick={() => !isLaptop ? setIsOpen(false) : null}>Контакты</Link>
						<div>
							<div className={`${styles} cursor-pointer flex justify-between sidebar-overlay`} onClick={() => toggleAccordion()}>
							 	<div>Страницы</div>
								<IconComponent name={accordionIsOpen ? "chevronUp" : "chevronDown"}/>
							</div>
							<Accordion isOpen={accordionIsOpen} items={pages} onBurgerClose={() => {
								!isLaptop ? setAccordionIsOpen(false) : null
								!isLaptop ? setIsOpen(false) : null
							}}/>
						</div>

					</div>
				</div>
				<div className='w-full' ref={burgerRef}>
					{children}
				</div>
			</div>
		<Toaster/>
		</div>

	</RouteGuard>
}
