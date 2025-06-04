import React from "react";
import { Typography } from "../ui/typography/Typography";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    paragraph : string
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title, paragraph }) => {
    if (!open) return null;

    return (
        <main className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40">
            <section className="bg-white rounded-3xl shadow-lg p-8 w-[40rem] relative">
                <div>
                    <div className="flex justify-between items-center">
                        <Typography.H2>{title}</Typography.H2>
                        <button
                            onClick={onClose}
                            className=" text-gray-400 hover:text-gray-700 text-xl font-bold"
                            aria-label="Cerrar"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                    <Typography.P className="text-xs mt-2 mb-5" >{paragraph}</Typography.P>
                </div>
                <div className="overflow-auto max-h-[40rem]">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Modal;