import { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    convertToPixelCrop,
} from "react-image-crop";
import setCanvasPreview from "../utils/setCanvasPreview";
import { TbCloudUpload } from "react-icons/tb";

const DIMENSIONS = {
    logo: { width: 250, height: 250, aspectRatio: 1 },
    subBanner: { width: 500, height: 250, aspectRatio: 2 },
    banner: { width: 1100, height: 250, aspectRatio: 4 },
};

const ImageCropper = ({ closeModal, slugState, update, imgType = "logo" }) => {
    const { width, height, aspectRatio } =
        DIMENSIONS[imgType] || DIMENSIONS.logo;

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageElement = new Image();
            imageElement.src = reader.result?.toString() || "";
            imageElement.onload = () => {
                const { naturalWidth, naturalHeight } = imageElement;
                if (naturalWidth < width || naturalHeight < height) {
                    setError(
                        `Image must be at least ${width} x ${height} pixels.`
                    );
                    setImgSrc("");
                } else {
                    setError("");
                    setImgSrc(imageElement.src);
                }
            };
        };
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width: imgWidth, height: imgHeight } = e.currentTarget;
        setCrop(
            centerCrop(
                makeAspectCrop(
                    { unit: "px", width, height },
                    aspectRatio,
                    imgWidth,
                    imgHeight
                ),
                imgWidth,
                imgHeight
            )
        );
    };

    const handleSaveClick = () => {
        setLoading(true);

        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();

        update(dataUrl);

        closeModal();
        setLoading(false);
    };

    return (
        <div className="image-cropper">
            <div className="header mb-3 px-3 border-b-2 pb-1.5 w-full text-center text-black font-bold">
                Yükleyeceğiniz görseli düzenleyin
            </div>
            {error && (
                <p className="error text-red-400 text-xs text-center">
                    {error}
                </p>
            )}
            <div className="cropper-container min-h-[28.2rem]">
                {!imgSrc ? (
                    <div className="upload-placeholder bg-gray-200 flex justify-center items-center h-[25rem] w-full">
                        <label
                            htmlFor="file_input"
                            className="upload-label flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <TbCloudUpload
                                size={50}
                                className="text-gray-500 mb-4"
                            />
                            <p className="text-xs mt-2 text-gray-500">
                                Click to upload your store image
                            </p>
                            <input
                                id="file_input"
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                                className="hidden"
                            />
                        </label>
                    </div>
                ) : (
                    <div>
                        <div className="crop-container bg-gray-200 flex justify-center items-center h-[25rem] w-full">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) =>
                                    setCrop(percentCrop)
                                }
                                circularCrop={imgType === "logo"}
                                keepSelection
                                aspect={aspectRatio}
                                minHeight={height / 2}
                            >
                                <img
                                    ref={imgRef}
                                    src={imgSrc}
                                    alt="Upload"
                                    style={{
                                        maxHeight: "24rem",
                                        userSelect: "none",
                                    }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        </div>
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
                                    onChange={(e) => slugState(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border text-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Ürün etiketi girin"
                                    aria-label="Ürün etiketi"
                                />
                            </div>
                        )}
                    </div>
                )}
                {crop && (
                    <div className="actions flex justify-end mt-4">
                        <button
                            className="save-button text-white font-mono text-sm py-2 px-5 rounded-md bg-blue-500 hover:bg-blue-600"
                            onClick={handleSaveClick}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Kayıt Et"}
                        </button>
                    </div>
                )}
            </div>
            {crop && <canvas ref={previewCanvasRef} className="hidden" />}
        </div>
    );
};

export default ImageCropper;
