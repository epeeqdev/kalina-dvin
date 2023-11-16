import {Button} from "@/app/admin/main/components/controls/button";
import Modal from "@/app/admin/main/products/helpers/modal";
import React,{ReactNode} from "react";

interface Props {
    onAccept: () => void,
    onClose: () => void,
    onCancel: () => void,
    isOpen?:boolean;
    children?: ReactNode
}

export default function Alert({onClose, isOpen, onAccept, onCancel, children}: Props){
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>{children}</div>
            <div className="mt-4 flex justify-end gap-1">
                <Button
                    onClick={onAccept}
                    variant="alert"
                >
                    да
                </Button>
                <Button
                    onClick={onCancel}
                    variant="secondary"
                >
                    нет
                </Button>
            </div>
        </Modal>
    )
}