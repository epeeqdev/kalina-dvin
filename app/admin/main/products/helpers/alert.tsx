import {Button} from "@/app/admin/main/components/controls/button";
import Modal from "@/app/admin/main/products/helpers/modal";
import React,{ReactNode} from "react";

interface Props {
    onAccept: () => void,
    acceptButtonLabel?: string,
    cancelButtonLabel?: string,
    onClose: () => void,
    onCancel: () => void,
    isOpen?:boolean;
    children?: ReactNode;
    title?: string;
}

export default function Alert({onClose, isOpen, onAccept, onCancel, children, acceptButtonLabel = 'Да', cancelButtonLabel='Нет', title}: Props){
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div>{children}</div>
            <div className="mt-6 flex justify-end gap-1">
                <Button
                    onClick={onCancel}
                    variant="alert"
                >
                    {cancelButtonLabel}
                </Button>
                <Button
                    onClick={onAccept}
                >
                    {acceptButtonLabel}
                </Button>
            </div>
        </Modal>
    )
}