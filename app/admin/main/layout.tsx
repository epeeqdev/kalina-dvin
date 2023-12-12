'use client'
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useAuth} from "@/app/admin/hooks";
import {RouteGuard} from "@/app/admin/RouteGuard";
import Hamburger from 'hamburger-react'
import {useMatchMedia} from "@/utils/hooks/useMatchMedia";
import IconComponent from "@/app/admin/main/components/icon";
import Accordion from "@/app/admin/main/components/accordion";
import {usePathname} from "next/navigation";
import SideBarLink from "./components/sideBarLink";
import {Button} from "@/app/admin/main/components/controls/button";

export default function Layout({children}:PropsWithChildren){
	const isMobile = useMatchMedia('(max-width: 639.1px)');
	const isLaptop = useMatchMedia('(min-width: 1024px)');

	const path = usePathname()
	const slicedPathName = path.split("/").slice(-2).join("/")

	const [isOpen, setIsOpen] = useState(false);
	const styles = "block px-4 py-2 text-[14px] hover:bg-[#eeeeee] hover:text-gray-800 transition whitespace-nowrap"

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const [accordionIsOpen, setAccordionIsOpen] = useState(false);

	const pages = [
		{ title: 'О нас', link: '/admin/main/about-us' },
		{ title: 'Продукты', link: '/admin/main/pages/products' },
		{ title: 'Главная страница', link: '/admin/main/pages/slider' },
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

	const handleClick = () => {
		!isLaptop ? setIsOpen(false) : null
		setAccordionIsOpen(false)
	}


	const {logout} = useAuth()
	return <RouteGuard>
		<div className="mt-10 ">
			<div className="fixed bg-gray-800 w-full top-0 z-50 text-white flex justify-between items-center ">
				<button
					onClick={() => toggleSidebar()}
					className={`toggle-btn`}>
					<Hamburger toggled={isOpen} size={25}/>
				</button>
				<Button variant="alert" onClick={logout} className="flex gap-2 bg-white mx-2">
					<div>Выйти</div>
					<IconComponent name={"logout"}/>
				</Button>
			</div>
			<div className='flex min-h-screen overflow-hidden'>
				<div className={`fixed z-[40] sm:relative sm:mt-0  sm inset-y-0 left-0 bg-gray-800 text-white ${isOpen ? "w-[200px] sm:w-[350px]" : "w-0 sm:w-0"} transition-all duration-300`}>
					<div className={`mt-20 sm:mt-5 overflow-hidden ${isOpen ? "opacity-1 transition-all duration-300" : "opacity-0 transition-all duration-300"} `}>
						<div className="block px-4 pb-10 text-[18px] transition whitespace-nowrap">Меню</div>
						<SideBarLink title="Главная" chosenNamePath="admin/main" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href='/admin/main' />
						<SideBarLink title="Категории" chosenNamePath="main/categories" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href='/admin/main/categories'  />
						<SideBarLink title="Бренды" chosenNamePath="main/brands" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href='/admin/main/brands' />
						<SideBarLink title="Продукты" chosenNamePath="main/products" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href={'/admin/main/products'} />
						<SideBarLink title="Атрибуты" chosenNamePath="main/attributes" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href='/admin/main/attributes' />
						<SideBarLink title="Контакты" chosenNamePath="main/contacts" slicedPathName={slicedPathName} className={styles} handleClick={handleClick} href='/admin/main/contacts' />
						<div>
							<div className={`${styles} cursor-pointer flex justify-between sidebar-overlay`} onClick={() => toggleAccordion()}>
							 	<div>Страницы</div>
								<IconComponent name={accordionIsOpen ? "chevronUp" : "chevronDown"}/>
							</div>
							<Accordion
								styles={styles}
								isClicked={slicedPathName}
								isOpen={accordionIsOpen}
								items={pages}
								onBurgerClose={() => {
									!isLaptop ? setIsOpen(false) : null
							}}/>
						</div>

					</div>
				</div>
				<div className='w-full' ref={burgerRef}>
					{children}
				</div>
			</div>
		</div>

	</RouteGuard>
}
