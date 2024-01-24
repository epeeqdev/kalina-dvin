"use client"
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Control, Controller} from "react-hook-form";
import clsx from "clsx";
import { useLanguage } from '@/app/main/hooks/useLanguage';

export interface Option {
    label: {am: string, ru: string };
    value: string
}

export interface Props {
    control: Control<any>
    options?: Option[];
    name: string;
    error?: string | any
    label: {am: string, ru: string}
    required?: boolean;
    multiselect?: boolean;
    placeholder?: {am: string, ru: string};
    className?: string
}

export default function AutocompleteInput({control, name, options, error, label, placeholder, required, multiselect, className}: Props) {
    const {getLanguage} = useLanguage()

    const lng = localStorage.getItem("lng")

        const changingLngOptions = options?.map(item => {
            return {value: item.value, label: getLanguage(item.label)}
        })
    const [data, setData] = useState(changingLngOptions)

    useEffect(() => {
        setData(changingLngOptions)
    },[lng , options]);


    return <Controller control={control} name={name} render={({field}) => {
        return (
            <div className={clsx("mb-5" ,className)} >
                <div className="flex items-center">
                    <label className='text-[16px] mb-1 text-dark-grey whitespace-nowrap'>{getLanguage(label)}</label>
                    {required && <span className="text-red-600">*</span>}
                </div>
                <Select
                    menuPlacement="top"
                    value={field.value}
                    isMulti={multiselect}
                    placeholder={getLanguage(placeholder)}
                    options={data}
                    className={`mt-1 outline-none border w-full ${!!error && "border-2 border-red-600"}`}
                    onChange={(v) => {field.onChange(v)}}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: "#e5e7eb",
                            primary: 'black',
                        },
                    })}
                    styles={{
                        control: base => ({
                            ...base,
                            border: "none",
                            boxShadow: 'none'
                        })
                    }}
                />
                {!!error && <span className="text-red-600 text-sm">{getLanguage(error)}</span>}
            </div>)

    }}/>
};