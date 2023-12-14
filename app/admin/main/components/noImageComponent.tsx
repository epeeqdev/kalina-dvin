import IconComponent from "@/app/admin/main/components/icon";
import React from "react";
import clsx from "clsx";

export default function NoImageComponent({className}:{className?: string}){
    return (
        <div className={clsx('flex justify-center items-center object-contain bg-[#dadada] rounded left-0 top-0', className)}>
            <IconComponent className="w-[60%] h-[60%]" name="image"/>
        </div>
    )
}