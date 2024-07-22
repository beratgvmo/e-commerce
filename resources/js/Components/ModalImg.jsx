import ImageCropper from "./ImageCropper";
import Modal from "@/Components/Modal";
import { FaTimes } from "react-icons/fa";

const ModalImg = ({
    update,
    closeModal,
    confirmingLogo,
    imgType,
    slugState,
}) => {
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
                        update={update}
                        closeModal={closeModal}
                        imgType={imgType}
                        slugState={slugState}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ModalImg;

/*

    const [slug, setSlug] = useState("");
                        {imgType === "subBanner" && (
                            <div className="mt-4">
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ürün Etiketi
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border text-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        )}
                                slugState(slug);
*/
