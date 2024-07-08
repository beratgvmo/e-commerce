import { useRef, useState } from "react";
import Modal from "../Components/ModalImg";
import "react-image-crop/dist/ReactCrop.css";

const Profile = () => {
    const avatarUrl = useRef(
        "https://avatarfiles.alphacoders.com/161/161002.jpg"
    );
    const [modalOpen, setModalOpen] = useState(false);

    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
    };

    return (
        <div className="flex flex-col items-center pt-12">
            <img src={avatarUrl.current} alt="" />
            <div className="relative">
                <img
                    src={avatarUrl.current}
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
                />
                <button
                    className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Change photo"
                    onClick={() => setModalOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                </button>
            </div>
            <h2 className="text-white font-bold mt-6">Mack Aroney</h2>
            <p className="text-gray-500 text-xs mt-2">Software Engineer</p>
            {modalOpen && (
                <Modal
                    updateAvatar={updateAvatar}
                    closeModal={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Profile;
