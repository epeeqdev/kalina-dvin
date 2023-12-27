"use client"
import clsx from "clsx";
import {useMainContext} from "@/app/main/hooks/useMainContext";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {LanguageOptions} from "@/app/main/components/header/constants";
import {useEffect, useState} from "react";

export default function LngSwitcher({className = ""}){
    const styles = "cursor-pointer hover:text-red-600 text-sm"
    const { getLanguage } = useLanguage();
    const [defaultLng, setDefaultLng] = useState("ru")
    const [language, setMainContextState] = useMainContext()

    useEffect(() => {
        const selectLng = localStorage.getItem('lng')
        if(selectLng) {
            setDefaultLng(selectLng)
        }
    },[])

    // const onChangeLanguage = (language: string) => {
    //     setDefaultLng(language)
    //     setMainContextState(language)
    //     localStorage.setItem('lng', language)
    // }

    return (
        <div className={clsx("flex w-[50%] h-full justify-evenly", className)}>
                {/*<div className={clsx(styles, {"text-red-600" : defaultLng === "am" })} onClick={() => onChangeLanguage("am")}>AM</div>*/}
                {/*<div className={clsx(styles, {"text-red-600" : defaultLng === "ru" })} onClick={() => onChangeLanguage("ru")}>RU</div>*/}
        </div>
    )
}