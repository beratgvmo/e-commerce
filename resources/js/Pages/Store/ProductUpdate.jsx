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
                    <div className="bg-white overflow-hidden shadow-sm w-full sm:rounded-lg">
                        <form onSubmit={submit}>
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
                                    <InputLabel htmlFor="price" value="Fiyat" />
                                    <PriceInput
                                        id="price"
                                        name="price"
                                        className="mt-1 block w-full"
                                        autoComplete="price"
                                        value={data.price}
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
                                    <InputLabel
                                        htmlFor="stock_quantity"
                                        value="Stok Miktarı"
                                    />
                                    <NumberInput
                                        id="stock_quantity"
                                        name="stock_quantity"
                                        className="mt-1 block w-full"
                                        autoComplete="stock_quantity"
                                        value={data.stock_quantity}
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
                            <div className="p-6 text-gray-900">
                                <div className="flex items-center mb-5">
                                    <h1 className="text-xl font-bold">
                                        Ürün Özelikleri
                                    </h1>
                                    <div className="flex items-center group">
                                        <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                        <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            En az beş ürün özelliği
                                            eklemelisiniz
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
                        </form>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
