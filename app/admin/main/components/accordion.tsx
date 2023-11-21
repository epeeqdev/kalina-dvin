"use client"

import Link from "next/link";

export default function Accordion({ items, isOpen }){
    return (
        <div className={`overflow-hidden transition-max-height ease-in-out duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            {items.map((item, index) => (
                <div key={index} className="pl-2">
                    <Link
                        className={"block px-4 py-2 text-[14px] hover:font-bold hover:bg-[#eeeeee] hover:text-gray-800 transition whitespace-nowrap} href={item.link}>{item.title"}
                        href={item.link}
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};