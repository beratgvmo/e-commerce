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
import Button from "@/Components/Button";

export default function ProductUpdate({
    auth,
    product,
    productAttribute,
    attributeTypes,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        is_active: product.is_active,
        product_attributes: productAttribute,
        images: [],
        discounted_price: product.price,
    });

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

    const submit = (e) => {
        e.preventDefault();
        post(route("store.productAdd"));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        e.target.value = null;

        files.forEach((file) => {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                if (image.width > 1200 || image.height > 1800) {
                    toast.error(
                        "Resim boyutu çok büyük! Lütfen 1200x1800 pikselden küçük bir resim seçin",
                        {
                            theme: "colored",
                            autoClose: 2000,
                        }
                    );
                    return;
                }
                if (image.width < 500 || image.height < 500) {
                    toast.error(
                        "Resim boyutu çok küçük! Lütfen 500x500 pikselden büyük bir resim seçin.",
                        {
                            theme: "colored",
                            autoClose: 2000,
                        }
                    );
                    return;
                }
                setData("images", [...data.images, file]);
            };
        });
    };

    const handleImageRemove = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData("images", newImages);
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-8">
                    <form onSubmit={submit}>
                        <div className="p-6 text-gray-900 bg-white rounded-lg my-5 shadow-sm">
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
                                            Ürün adı en az 15 karakter olmalıdır
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
                                <div className="flex items-center mb-0.5">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Ürün Açıklaması"
                                    />
                                    <div className="flex items-center group">
                                        <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                        <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Ürün açıklaması en az 40 karakter
                                            olmalıdır
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
                                        setData("description", editor.getHTML())
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
                        </div>

                        <div className="p-6 text-gray-900 bg-white rounded-lg my-5 shadow-sm">
                            <div className="flex items-center mb-5">
                                <h1 className="text-xl font-bold">
                                    Ürün Görselleri
                                </h1>
                                <div className="flex items-center group">
                                    <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                    <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        En az üç resim yüklemeniz gerekmektedir
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-8">
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
                                    {data.images.length < 6 && (
                                        <div className="flex items-center justify-center h-full w-44">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 font-semibold">
                                                        Ürün Resimi Yükle
                                                    </p>
                                                    <p className="text-xs text-center text-gray-500">
                                                        PNG, JPG, WEBP, JPEG
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleImageChange}
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
                        </div>
                        <div className="p-6 text-gray-900 bg-white rounded-lg my-5 shadow-sm">
                            <div className="flex items-center mb-5">
                                <h1 className="text-xl font-bold">
                                    Ürün Özelikleri
                                </h1>
                                <div className="flex items-center group">
                                    <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                    <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        En az beş ürün özelliği eklemelisiniz
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {attributeTypes.map((attribute) => (
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
                                                (attr) => {
                                                    const isSelected =
                                                        productAttribute.some(
                                                            (productAttr) =>
                                                                productAttr.attribute_id ===
                                                                attr.id
                                                        );
                                                    return (
                                                        <option
                                                            key={attr.id}
                                                            value={attr.id}
                                                            selected={
                                                                isSelected
                                                            }
                                                        >
                                                            {attr.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                ))}
                            </div>
                            <InputError
                                message={errors.product_attributes}
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton>Ürün Güncelle</PrimaryButton>
                    </form>
                </div>
            </div>
        </StoreLayout>
    );
}
