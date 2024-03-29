import React, {useEffect} from 'react';
import clsx from "clsx";
import IconComponent from "@/app/admin/main/components/icon";
import Header from "@/app/admin/main/components/header";
import * as events from "events";

interface Prop extends React.PropsWithChildren{
    isOpen?: boolean,
    onClose: () => void,
    title?: {am: string, ru: string },
    message?: string
    classname?: string
}
export default function Modal({ isOpen, onClose , title , message, children, classname} : Prop){
    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (e) => {
                if (e.target?.classList.contains('modal-overlay')) {
                    onClose();
                }
            };

            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [isOpen, onClose]);

    return (
        <div className={clsx('fixed inset-0 flex cursor-pointer items-center justify-center z-50 transition', {
            'opacity-0 pointer-events-none':!isOpen,
            'opacity-100': isOpen,
        })}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-[0.5]"></div>
            <div className={clsx("relative modal-container bg-white max-w-[600px] w-full mx-auto rounded shadow-lg z-50 overflow-y-auto cursor-default", classname)}>
                    <Header title={title}>
                        <button onClick={onClose} className="absolute top-0 right-0 cursor-pointer p-2 hover:bg-gray-lighter">
                            <IconComponent name='close'/>
                        </button>
                    </Header>
                <div className="modal-content pb-4 text-left px-5 overflow-y-auto">
                    <p className="text-gray-700">{message}</p>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}


