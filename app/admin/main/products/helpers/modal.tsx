import React, {useEffect} from 'react';
import clsx from "clsx";
import IconComponent from "@/app/admin/main/components/icon";

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
        <div className={clsx('fixed inset-0 flex items-center justify-center z-50 transition', {
            'opacity-0 pointer-events-none':!isOpen,
            'opacity-100': isOpen,
        })}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-10"></div>

            <div className={clsx("relative modal-container bg-white max-w-[600px] w-full mx-auto rounded shadow-lg z-50 overflow-y-auto", classname)}>
                <div className="modal-content pb-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        {title && <p className="text-xl py-2 pr-10">{title}</p>}
                        <button onClick={onClose} className="absolute top-0 right-0 cursor-pointer p-2 cursor-pointer hover:bg-gray-lighter">
                           <IconComponent name='close'/>
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


