import React, {useEffect} from 'react';
import {Button} from "@/app/admin/main/components/controls/button";
import clsx from "clsx";

interface Prop extends React.PropsWithChildren{
    isOpen?: boolean,
    onClose: () => void,
    title?: string,
    message?: string
    classname?: string
}
export default function Modal({ isOpen, onClose , title , message, children, classname} : Prop){
    useEffect(() => {
        if (isOpen) {
            // todo change any to other type
            const handleOutsideClick = (e:any) => {
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
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-10"></div>

            <div className={clsx("modal-container bg-white w-1/3 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto", classname)}>
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{title}</p>
                        <button onClick={onClose} className="modal-close p-2 bg-transparent border-none cursor-pointer">
                            <span className="text-3xl">&times;</span>
                        </button>
                    </div>
                    <p className="text-gray-700">{message}</p>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}


