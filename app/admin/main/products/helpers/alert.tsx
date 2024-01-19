import {Button} from "@/app/admin/main/components/controls/button";
import Modal from "@/app/admin/helpers/modal";
import React,{ReactNode} from "react";
import { useLanguage } from "@/app/main/hooks/useLanguage";

interface Props {
    onAccept: () => void,
    acceptButtonLabel?: {am: string, ru: string },
    cancelButtonLabel?: {am: string, ru: string },
    onClose: () => void,
    onCancel: () => void,
    isOpen?:boolean;
    children?: ReactNode;
    title?: {am: string, ru: string };
}

export default function Alert({onClose, isOpen, onAccept, onCancel, children, acceptButtonLabel = {am:"այո", ru: 'да'}, cancelButtonLabel={am:"Ոչ", ru: 'нет'}, title}: Props){

    const { getLanguage } = useLanguage()
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div>{children}</div>
            <div className="mt-6 flex justify-end gap-1">
                <Button
                    onClick={onCancel}
                    variant="alert"
                >
                    {getLanguage(cancelButtonLabel)}
                </Button>
                <Button
                    onClick={onAccept}
                >
                    {getLanguage(acceptButtonLabel)}
                </Button>
            </div>
        </Modal>
    )
}