import React, {useEffect} from 'react';
import {Button} from "@/app/admin/main/components/controls/button";

interface Prop {
    isOpen: boolean,
    onDelete: () => void,
    onClose: () => void,
    title?: string,
    message?: string
}
export default function DeleteConfirmationModal({ isOpen, onClose, onDelete , title , message} : Prop){
    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (e) => {
                if (e.target.classList.contains('modal-overlay')) {
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
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

            <div className="modal-container bg-white w-1/3 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                {/* Modal content */}
                <div className="modal-content py-4 text-left px-6">
                    {/* Title */}
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{title}</p>
                        <button onClick={onClose} className="modal-close p-2 bg-transparent border-none cursor-pointer">
                            <span className="text-3xl">&times;</span>
                        </button>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700">{message}</p>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-end gap-1">
                        <Button
                            onClick={onDelete}
                            variant="alert"
                        >
                            да
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="secondary"
                        >
                            нет
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


