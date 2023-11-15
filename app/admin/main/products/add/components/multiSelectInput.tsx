import React, {useState} from 'react';
import Select from 'react-select';
import {Controller} from "react-hook-form";
import {Options} from "@/app/admin/main/products/types";
import Product from "@/backend/schemas/Product";


export default function MultiSelectInput({control, name, options, error}: Options) {
    return <Controller control={control} name={name} render={({field, fieldState,}) => {
        return (
            <div>
                <Select
                    value={field.value}
                    isMulti
                    options={options}
                    className={`mt-1 outline-none rounded ${!!error && "border-2 border-red-600 rounded"}`}
                    onChange={(v) => field.onChange(v)}
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