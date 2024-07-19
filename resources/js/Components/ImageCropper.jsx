import { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/getCroppedImg";

const ImageCropper = ({ updateAvatar, closeModal }) => {
    const [imageSrc, setImageSrc] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const inputRef = useRef(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                setImageSrc(reader.result.toString());
            };
        }
    };

    const handleCrop = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedArea);
        updateAvatar(croppedImage);
        closeModal();
    };

    return (
        <div className="crop-container">
            <input type="file" onChange={onSelectFile} ref={inputRef} />
            {imageSrc && (
                <div>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <button onClick={handleCrop}>Crop</button>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
