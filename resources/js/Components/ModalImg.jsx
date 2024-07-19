// src/components/ModalImg.js
import ImageCropper from "./ImageCropper";
import Modal from "@/Components/Modal";
import { FaTimes } from "react-icons/fa";

const ModalImg = ({ updateAvatar, closeModal, confirmingLogo }) => {
    return (
        <Modal show={confirmingLogo} onClose={closeModal}>
            <div className="relative min-w-[65vh] min-h-[60vh] text-slate-100 text-left shadow-xl transition-all">
                <div className="px-5 py-4">
                    <button
                        type="button"
                        className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none transition absolute top-2 right-2"
                        onClick={closeModal}
                    >
                        <FaTimes />
                    </button>
                    <ImageCropper
                        updateAvatar={updateAvatar}
                        closeModal={closeModal}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ModalImg;
