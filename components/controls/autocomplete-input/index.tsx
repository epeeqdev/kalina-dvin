import React from 'react';
import Select from 'react-select';
import {Control, Controller} from "react-hook-form";

export interface Option {
    label: string;
    value: string
}

export interface Props {
    control: Control<any>
    options?: Option[];
    name: string;
    error?: string | any
    label: string
    required?: boolean;
    multiselect?: boolean;
    placeholder?: string;
    className?: string
}

export default function AutocompleteInput({control, name, options, error, label,placeholder, required, multiselect, className}: Props) {
    return <Controller control={control} name={name} render={({field}) => {
        return (
            <div className={className}>
                <div className="flex items-center">
                    <label className='text-[16px] mb-1 text-dark-grey whitespace-nowrap'>{label}</label>
                    {required && <span className="text-red-600">*</span>}
                </div>
                <Select
                    menuPlacement="top"
                    value={field.value}
                    isMulti={multiselect}
                    placeholder={placeholder}
                    options={options}
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
                {!!error && <span className="text-red-600 text-sm">{error}</span>}
            </div>)

    }}/>
};