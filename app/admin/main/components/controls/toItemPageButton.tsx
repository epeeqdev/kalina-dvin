"use client"
import IconComponent from "@/app/admin/main/components/icon";
import {Button} from "@/app/admin/main/components/controls/button";
import React from "react";

type Prop = {
    link?: string
}
export default function ToItemPageButton({link}: Prop) {
    const navigateToNewTab = (path) => {
        const url = `${window.location.origin}${path}`;
        window.open(url, '_blank');
    };

    return (
        <Button
            variant="primary"
            className="flex justify-center items-center px-[5px]"
            onClick={() => {
                if (link) {
                    navigateToNewTab(link)
                }
            }}
        >
            <IconComponent name="goTo"/>
        </Button>
    )
}