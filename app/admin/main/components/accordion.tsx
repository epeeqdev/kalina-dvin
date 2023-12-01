"use client"

import Link from "next/link";

export default function Accordion({ items, isOpen, onBurgerClose, isClicked, isSidebarOpen }){
    return (
        <div className={`bg-gray-700 shadow-lg rounded overflow-hidden transition-all duration-500 transform ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            {items.map((item, index) => {
               const clickedName = item.link.split("/").slice(-2).join("/")
                return (
                    <div key={index} >
                        <Link
                            onClick={onBurgerClose}
                            className={`${isClicked === clickedName && "bg-white text-black font-bold"} block px-4 py-2 text-[14px] hover:bg-[#eeeeee] hover:text-gray-800 transition whitespace-nowrap href={item.link}>{item.title`}
                            href={item.link}
                        >
                            <div className="pl-2">
                                {item.title}
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
};