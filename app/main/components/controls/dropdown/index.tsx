'use client'

import {useEffect, useRef, useState} from "react";
import IconComponent from "@/components/icon";
import clsx from "clsx";
import {IconNameOptions} from "@/components/icon/icons";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Option} from "@/app/main/components/controls/dropdown/components/option";
import {Typography} from "@/app/main/components/controls/typography";

export type LanguageType = {am: string, ru: string} | {am: string} | {ru: string};

export interface Options {
    id: string,
    icon?: IconNameOptions,
    title: LanguageType,
    isChanged: boolean;
}
interface Props {
    title: string;
    size?: {width: string | number, height: string | number };
    className?: string;
    onChange?:  any;
    options?: Options[];
    dropdownClassname?: {container:string, items: string}
}

type DropdownProps = Props
export const Dropdown = ({ title, className, options, onChange, size, dropdownClassname }: DropdownProps) => {
    const { getLanguage } = useLanguage();
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef(null);

    const closeDropdownOnOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener("click", closeDropdownOnOutsideClick);
        };
    }, []);

    const toggleView = () => {
        setIsShow((prevState) => !prevState);
    };

    const handleChange = (lng:string, isChanged: boolean) => {
        if(isChanged){
            onChange(lng)
        }
        setIsShow(false);
    }
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className={clsx([
                        "inline-flex w-full items-center justify-center gap-x-1.5 bg-white",
                        {'text-secondary': !isShow,
                         'text-primary': isShow},
                        className
                    ])}
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleView}
                >
                    {<Typography title={title} fontWeight="font-inherit" fontSize="text-base" color='text-inherit'/>}
                    {<IconComponent name={isShow ? "chevronUp" : "chevronDown"} className='w-[12px]' size={{ width: 16, height: 10 }} color="inherit"/>}
                </button>
            </div>
                <div
                    className={clsx([
                        "absolute right-0 z-10 mt-2 min-w-[127px] origin-top-right rounded-none bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-[opacity]",
                        {
                            'opacity-0 pointer-events-none': !isShow,
                            'opacity-100 pointer-events-all': isShow,
                        },
                        dropdownClassname?.container,
                    ])}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-[20px] flex flex-col w-full" role="none">
                        {options?.map((el) => (
                            <Option
                                key={el.id}
                                title={getLanguage(el.title)}
                                icon={el.icon}
                                onClick={() =>handleChange(el.id, el.isChanged)}
                                dropdownClassname={dropdownClassname?.items}
                            />
                        ))}
                    </div>
                </div>
        </div>
    );
};
