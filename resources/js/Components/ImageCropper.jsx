import { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    convertToPixelCrop,
} from "react-image-crop";
import setCanvasPreview from "../utils/setCanvasPreview";
import { TbCloudUpload } from "react-icons/tb";

const DIMENSIONS = {
    logo: { width: 200, height: 200, aspectRatio: 1 },
    altBanner: { width: 500, height: 200, aspectRatio: 1.75 },
    banner: { width: 1000, height: 200, aspectRatio: 3 },
};

const ImageCropper = ({ closeModal, update, imgType = "logo" }) => {
    const { width, height, aspectRatio } =
        DIMENSIONS[imgType] || DIMENSIONS.logo;

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

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
    };

    return (
        <>
            <div className="block mb-3 px-3 border-b-2 pb-1.5 w-full text-center text-black font-bold">
                Yükleyeceginiz Görseli Düzenleyin
            </div>
            {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            <div className="h-[28.2rem]">
                {!imgSrc ? (
                    <div className="bg-gray-200 flex justify-center items-center h-[25rem] w-full">
                        <label
                            htmlFor="file_input"
                            className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <TbCloudUpload
                                size={50}
                                className="text-gray-500 mb-4"
                            />
                            <p className="text-xs mt-2 text-gray-500">
                                Mağaza Görselinizi Yüklemek İçin Tıklayın
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
                    <div className="bg-gray-200 flex justify-center items-center h-[25rem] w-full">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
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
                )}
                {crop && (
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-white font-mono text-sm py-2 px-5 rounded-md bg-blue-500 hover:bg-blue-600"
                            onClick={handleSaveClick}
                        >
                            Görseli Ekle
                        </button>
                    </div>
                )}
            </div>
            {crop && <canvas ref={previewCanvasRef} className="hidden" />}
        </>
    );
};

export default ImageCropper;
