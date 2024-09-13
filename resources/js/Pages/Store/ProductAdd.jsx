import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import StoreLayout from "@/Layouts/StoreLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";
import PriceInput from "@/Components/PriceInput";
import NumberInput from "@/Components/NumberInput";
import { useState } from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuUploadCloud } from "react-icons/lu";
import PriceText from "@/Components/PriceText";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export default function ProductAdd({
    auth,
    categories,
    subCategories,
    attributeTypes,
    categoryStore,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category_id: "",
        description: "",
        price: "",
        stock_quantity: "",
        kdv: "",
        is_active: true,
        images: [],
        product_attributes: [],
    });

    const [step, setStep] = useState(1);
    const [imageURLs, setImageURLs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
        ],
    };

    const formats = [
        "header",
        "font",
        "list",
        "bullet",
        "bold",
        "italic",
        "underline",
        "color",
        "background",
        "align",
    ];

    const nextImage = () => {
        if (imageURLs.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(imageURLs.length - 1);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        e.target.value = null;

        files.forEach((file) => {
            const image = new Image();
            const objectUrl = URL.createObjectURL(file);
            image.src = objectUrl;

            image.onload = () => {
                if (image.width > 1200 || image.height > 1800) {
                    toast.error(
                        "Resim boyutu çok büyük! Lütfen 1200x1800 pikselden küçük bir resim seçin.",
                        { theme: "colored", autoClose: 2000 }
                    );
                    return;
                }
                if (image.width < 500 || image.height < 500) {
                    toast.error(
                        "Resim boyutu çok küçük! Lütfen 500x500 pikselden büyük bir resim seçin.",
                        { theme: "colored", autoClose: 2000 }
                    );
                    return;
                }

                setData("images", [...data.images, file]);

                setImageURLs((prev) => [...prev, objectUrl]);
            };
        });
    };

    const handleImageRemove = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData("images", newImages);
    };

    const handleProductAttributes = (attributeId) => {
        const existingAttributeIndex = data.product_attributes.findIndex(
            (attr) => attr.attribute_id === attributeId
        );

        let updatedAttributes;
        if (existingAttributeIndex > -1) {
            updatedAttributes = [...data.product_attributes];
            updatedAttributes[existingAttributeIndex] = {
                attribute_id: attributeId,
            };
        } else {
            updatedAttributes = [
                ...data.product_attributes,
                { attribute_id: attributeId },
            ];
        }

        setData("product_attributes", updatedAttributes);
    };

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                return (
                    data.name.length >= 15 &&
                    data.category_id.length &&
                    data.description.length > 40 &&
                    data.price.length > 1 &&
                    data.kdv.length &&
                    data.stock_quantity.length > 0 &&
                    data.images.length >= 3
                );
            case 2:
                return data.product_attributes.length >= 5;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        if (validateStep(2)) {
            post(route("store.productAdd"));
        }
    };

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ürün Oluşturma
                </h2>
            }
        >
            <Head title="Product Add" />

            <div className="flex gap-6">
                <div className="my-12">
                    <ol className="rounded-lg shadow-sm bg-white py-4 px-6 w-56 text-sm font-medium text-center text-gray-500">
                        <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full mr-1"></span>
                            <p>Ürün Bilgisi</p>
                        </li>
                        <div className="ml-[8px] border-l-2 h-6 my-1"></div>
                        <li
                            className={`flex items-center text-${
                                step >= 2 ? "blue-600" : "gray-500"
                            }`}
                        >
                            <span
                                className={`flex transition-all items-center justify-center w-4 h-4 rounded-full shrink-0 mr-1 ${
                                    step >= 2
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-400"
                                }`}
                            ></span>
                            <p>Ürün Özelikleri</p>
                        </li>
                        <div className="ml-[8px] border-l-2 h-6 my-1"></div>
                        <li
                            className={`flex items-center text-${
                                step >= 3 ? "blue-600" : "gray-500"
                            }`}
                        >
                            <span
                                className={`flex transition-all items-center justify-center w-4 h-4 rounded-full shrink-0 mr-1 ${
                                    step >= 3
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-400"
                                }`}
                            ></span>
                            <p>Ön izleme ve onay</p>
                        </li>
                    </ol>
                </div>
                <div className="py-12 w-full">
                    <div className="bg-white overflow-hidden shadow-sm w-full sm:rounded-lg">
                        <form onSubmit={submit}>
                            {step === 1 && (
                                <div className="p-6 text-gray-900">
                                    <h1 className="text-xl font-bold mb-5">
                                        Ürün Bilgileri
                                    </h1>
                                    <div>
                                        <div className="flex items-center mb-0.5">
                                            <InputLabel
                                                htmlFor="name"
                                                value="Ürün Adı"
                                            />
                                            <div className="flex items-center group">
                                                <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                                <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Ürün adı en az 15 karakter
                                                    olmalıdır
                                                </div>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="productname"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="category_id"
                                            value="Kategori"
                                        />
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            value={data.category_id}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Kategori Seçiniz
                                            </option>
                                            {categories.map((category) => (
                                                <optgroup
                                                    key={category.id}
                                                    label={category.name}
                                                >
                                                    {subCategories.map(
                                                        (sub) =>
                                                            category.id ===
                                                                sub.parent_id && (
                                                                <option
                                                                    key={sub.id}
                                                                    value={
                                                                        sub.id
                                                                    }
                                                                >
                                                                    {sub.name}
                                                                </option>
                                                            )
                                                    )}
                                                </optgroup>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.category_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex items-center mb-0.5">
                                            <InputLabel
                                                htmlFor="description"
                                                value="Ürün Açıklaması"
                                            />
                                            <div className="flex items-center group">
                                                <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                                <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Ürün açıklaması en az 40
                                                    karakter olmalıdır
                                                </div>
                                            </div>
                                        </div>
                                        <ReactQuill
                                            value={data.description}
                                            onChange={(
                                                content,
                                                delta,
                                                source,
                                                editor
                                            ) =>
                                                setData(
                                                    "description",
                                                    editor.getHTML()
                                                )
                                            }
                                            modules={modules}
                                            formats={formats}
                                            className="h-96 mb-14"
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabel
                                            htmlFor="price"
                                            value="Fiyat"
                                        />
                                        <PriceInput
                                            id="price"
                                            name="price"
                                            className="mt-1 block w-full"
                                            autoComplete="price"
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="kdv" value="KDV" />
                                        <select
                                            id="kdv"
                                            name="kdv"
                                            value={data.kdv}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                            onChange={(e) =>
                                                setData("kdv", e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Kdv oranı Seçiniz
                                            </option>
                                            <option value="0">%0</option>
                                            <option value="1">%1</option>
                                            <option value="10">%10</option>
                                            <option value="20">%20</option>
                                        </select>
                                        <InputError
                                            message={errors.kdv}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="stock_quantity"
                                            value="Stok Miktarı"
                                        />
                                        <NumberInput
                                            id="stock_quantity"
                                            name="stock_quantity"
                                            className="mt-1 block w-full"
                                            autoComplete="stock_quantity"
                                            onChange={(e) =>
                                                setData(
                                                    "stock_quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.stock_quantity}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 mb-8">
                                        <div className="flex items-center mb-0.5">
                                            <InputLabel
                                                htmlFor="images"
                                                value="Ürün Görselleri"
                                            />
                                            <div className="flex items-center group">
                                                <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                                <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    En az 2 resim yüklemeniz
                                                    gerekmektedir
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-44 flex mt-2">
                                            {data.images.map((img, index) => (
                                                <div key={index}>
                                                    <div className="relative flex justify-center">
                                                        <div className="group">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleImageRemove(
                                                                        index
                                                                    )
                                                                }
                                                                className="absolute bottom-2 right-4 mt-2 text-gray-50 text-lg bg-red-500 rounded-full h-8 w-8 hover:text-gray-200 hover:bg-red-600 group-hover:flex flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <MdDelete />
                                                            </button>
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    img
                                                                )}
                                                                alt=""
                                                                className="h-44 w-44 border-2 rounded-lg cursor-pointer p-2 mr-2 object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {data.images.length < 5 && (
                                                <div className="flex items-center justify-center h-full w-44">
                                                    <label
                                                        htmlFor="dropzone-file"
                                                        className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                                    >
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <LuUploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                                                            <p className="mb-2 text-sm text-gray-500 font-semibold">
                                                                Ürün Resimi
                                                                Yükle
                                                            </p>
                                                            <p className="text-xs text-center text-gray-500">
                                                                PNG, JPG, WEBP,
                                                                JPEG
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="dropzone-file"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        <InputError
                                            message={errors.images}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            className="mb-2"
                                            htmlFor="is_active"
                                            value={
                                                data.is_active
                                                    ? "Aktif (Ürün Anasayfa Gösterimi Açık)"
                                                    : "Pasif (Ürün Anasayfa Gösterimi Kapalı)"
                                            }
                                        />
                                        <label class="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_active",
                                                        e.target.checked
                                                    )
                                                }
                                                class="sr-only peer"
                                            />
                                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                        <InputError
                                            message={errors.is_active}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!validateStep(1)}
                                        >
                                            Sonraki
                                        </PrimaryButton>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="p-6 text-gray-900">
                                    <div className="flex items-center mb-5">
                                        <h1 className="text-xl font-bold">
                                            Ürün Özelikleri
                                        </h1>
                                        <div className="flex items-center group">
                                            <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                            <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                En az 5 ürün özelliği
                                                eklemelisiniz
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {data.category_id &&
                                            attributeTypes[
                                                data.category_id
                                            ].map((attribute) => (
                                                <div key={attribute.id}>
                                                    <InputLabel
                                                        htmlFor={`attribute_${attribute.id}`}
                                                        value={attribute.name}
                                                        className="mb-0.5"
                                                    />
                                                    <select
                                                        id={`attribute_${attribute.id}`}
                                                        name={`attribute_${attribute.id}`}
                                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        onChange={(e) =>
                                                            handleProductAttributes(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Seçim Yapınız
                                                        </option>
                                                        {attribute.attributes.map(
                                                            (attr) => (
                                                                <option
                                                                    key={
                                                                        attr.id
                                                                    }
                                                                    value={
                                                                        attr.id
                                                                    }
                                                                >
                                                                    {attr.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            ))}
                                    </div>
                                    <InputError
                                        message={errors.product_attributes}
                                        className="mt-2"
                                    />
                                    <div className="flex items-center justify-between mt-4">
                                        <PrimaryButton
                                            type="button"
                                            className=""
                                            onClick={prevStep}
                                        >
                                            Geri
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="button"
                                            className="ms-4"
                                            onClick={nextStep}
                                            disabled={!validateStep(2)}
                                        >
                                            Sonraki
                                        </PrimaryButton>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="p-3 px-12 text-gray-900">
                                    <div className="">
                                        <nav
                                            className="flex py-2 mb-2"
                                            aria-label="Breadcrumb"
                                        >
                                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                                <li className="inline-flex items-center">
                                                    <div className="inline-flex items-center text-xs font-medium text-gray-500">
                                                        <FaHome className="mr-1 text-lg" />
                                                        <p>Ana Sayfa</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="flex items-center">
                                                        <IoIosArrowForward className="text-gray-500" />
                                                        <div className="ms-1 text-xs font-medium text-gray-500">
                                                            <p>
                                                                {categoryStore}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {subCategories
                                                    .filter(
                                                        (sub) =>
                                                            sub.id ==
                                                            data.category_id
                                                    )
                                                    .map((sub) => (
                                                        <li key={sub.id}>
                                                            <div className="flex items-center">
                                                                <IoIosArrowForward className="text-gray-500" />
                                                                <div className="ms-1 text-xs font-medium text-gray-500">
                                                                    {categories
                                                                        .filter(
                                                                            (
                                                                                category
                                                                            ) =>
                                                                                category.id ==
                                                                                sub.parent_id
                                                                        )
                                                                        .map(
                                                                            (
                                                                                category
                                                                            ) => (
                                                                                <p
                                                                                    key={
                                                                                        category.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        category.name
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}

                                                {subCategories
                                                    .filter(
                                                        (sub) =>
                                                            sub.id ==
                                                            data.category_id
                                                    )
                                                    .map((sub) => (
                                                        <li key={sub.id}>
                                                            <div className="flex items-center">
                                                                <IoIosArrowForward className="text-gray-500" />
                                                                <div className="ms-1 text-xs font-medium text-gray-500">
                                                                    <p>
                                                                        {
                                                                            sub.name
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ol>
                                        </nav>
                                        <div className="flex">
                                            <div className="relative flex justify-between items-center">
                                                <button
                                                    type="button"
                                                    onClick={prevImage}
                                                    className="absolute left-2 flex items-center justify-center w-12 h-12 text-3xl text-gray-500 bg-gray-100 rounded-full cursor-pointer shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:bg-gray-300 duration-300 z-10"
                                                >
                                                    <IoIosArrowBack />
                                                </button>
                                                <div>
                                                    <img
                                                        src={
                                                            imageURLs[
                                                                currentIndex
                                                            ]
                                                        }
                                                        alt="Product Image"
                                                        className="min-w-[30rem] h-[38rem] object-contain rounded-md border border-gray-300"
                                                    />

                                                    <div className="flex gap-5 overflow-hidden mt-3 justify-center">
                                                        {imageURLs.map(
                                                            (image, index) =>
                                                                index ===
                                                                currentIndex ? (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt="Product Image"
                                                                        className="w-14 h-16 object-contain border-2 rounded-lg border-blue-500"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt="Product Image"
                                                                        onClick={() =>
                                                                            setCurrentIndex(
                                                                                index
                                                                            )
                                                                        }
                                                                        className="w-14 h-16 object-contain border rounded-lg cursor-pointer"
                                                                    />
                                                                )
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={nextImage}
                                                    className="absolute right-2 flex items-center justify-center w-12 h-12 text-3xl text-gray-500 bg-gray-100 rounded-full cursor-pointer shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:bg-gray-300 duration-300 z-10 "
                                                >
                                                    <IoIosArrowForward />
                                                </button>
                                            </div>

                                            <div className="w-full px-6  rounded-e-md">
                                                <h1 className="text-lg font-semibold">
                                                    {data.name}
                                                </h1>
                                                <div className="mt-6">
                                                    <p className="text-slate-800 text-3xl font-black mt-6">
                                                        <PriceText
                                                            value={data.price}
                                                        />
                                                    </p>
                                                </div>

                                                <div className="flex gap-4 mt-4">
                                                    <div className="">
                                                        <p className="font-semibold">
                                                            Stok
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                data.stock_quantity
                                                            }
                                                        </p>
                                                    </div>
                                                    <p>-</p>
                                                    <div>
                                                        <p className=" font-semibold">
                                                            KDV
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            %{data.kdv}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="mt-20 text-blue-500 text-center font-bold border-b-2 p-2 mb-3">
                                                    Ürün Özelikleri
                                                </p>
                                                <div className="grid grid-cols-2">
                                                    {data.category_id &&
                                                        attributeTypes[
                                                            data.category_id
                                                        ].map((attributeType) =>
                                                            attributeType.attributes.map(
                                                                (attr) =>
                                                                    data.product_attributes.map(
                                                                        (
                                                                            productAttr
                                                                        ) =>
                                                                            productAttr.attribute_id ==
                                                                                attr.id && (
                                                                                <div
                                                                                    className="flex gap-1.5 my-1"
                                                                                    key={
                                                                                        attr.id
                                                                                    }
                                                                                >
                                                                                    <p className="text-sm font-semibold">
                                                                                        {
                                                                                            attributeType.name
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-500">
                                                                                        {
                                                                                            attr.name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                    )
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-8 border-t-2 pt-8">
                                        <PrimaryButton
                                            type="button"
                                            onClick={prevStep}
                                        >
                                            Geri
                                        </PrimaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Ürün Ekle
                                        </PrimaryButton>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
