"use client"
import {Button} from "@/app/admin/main/components/controls/button";
import {useState} from "react";
import SliderForm from "@/app/admin/helpers/forms/slider-form-";
import Modal from "@/app/admin/main/products/helpers/modal";

export default function Contacts(){

    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div>
            <div className="fixed right-4 top-4 flex gap-2">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Добавить Слайд</Button>
            </div>

        </div>
    )
}