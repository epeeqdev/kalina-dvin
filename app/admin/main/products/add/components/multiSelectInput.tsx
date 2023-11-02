import React  from 'react';
import Select from 'react-select';
import {Controller} from "react-hook-form";
import {Options} from "@/app/admin/main/products/types";


export default function MultiSelectInput({control, name, options} : Options){
    console.log(control, "control")
    return <Controller control={control} name={name} render={({field}) => {
        return <Select
            value={field.value}
            isMulti
            options={options}
            className="my-5  hover: border-b-black"
            onChange={(v) => field.onChange(v)}
        />
    }}/>
};
