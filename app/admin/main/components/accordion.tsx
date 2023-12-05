"use client"

import SideBarLink from "@/app/admin/main/components/sideBarLink";

export default function Accordion({ items, isOpen, onBurgerClose, isClicked, styles}){

    return (
        <div className={`bg-gray-700 shadow-lg rounded overflow-hidden transition-all duration-500 transform ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            {items.map((item, index) => {
               const slicedPathName = item.link.split("/").slice(-2).join("/")
                return (
                        <SideBarLink key={index} title={item.title} href={item.link} className={`${styles} , pl-8` } slicedPathName={slicedPathName} chosenNamePath={isClicked} handleClick={onBurgerClose} />
                )
            })}
        </div>
    );
};