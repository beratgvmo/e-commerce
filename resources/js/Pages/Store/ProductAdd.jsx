import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import StoreLayout from "@/Layouts/StoreLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function ProductAdd({ auth, categories, subCategories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category_id: "",
        description: "",
        price: "",
        stock_quantity: "",
        is_active: true,
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("store.product.add.post"));
    };

    const handleImageUpload = (images) => {
        setData("images", images);
        const previewUrls = images.map((image) => URL.createObjectURL(image));
        setImagePreview(previewUrls);
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["image"],
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
        "image",
    ];

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Product Add" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Ürün Adı"
                                    />
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
                                        className="mt-1 block w-full"
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
                                                        category.id ==
                                                            sub.parent_id && (
                                                            <option
                                                                key={sub.id}
                                                                value={sub.id}
                                                            >
                                                                {sub.name}
                                                            </option>
                                                        )
                                                )}
                                            </optgroup>
                                        ))}
                                        {/* {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))} */}
                                    </select>
                                    <InputError
                                        message={errors.category_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 mb-14">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Ürün Açıklaması"
                                    />
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
                                        className="h-48"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Fiyat" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
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
                                    <InputLabel
                                        htmlFor="stock_quantity"
                                        value="Stok Miktarı"
                                    />
                                    <TextInput
                                        id="stock_quantity"
                                        type="number"
                                        name="stock_quantity"
                                        value={data.stock_quantity}
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

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="is_active"
                                        value="Aktif"
                                    />
                                    <Checkbox
                                        id="is_active"
                                        name="is_active"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.is_active}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="images"
                                        value="Ürün Görselleri"
                                    />
                                    {/* <ProductImageUpload onImageUpload={handleImageUpload} />
                                    {imagePreview.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className="mt-2 w-24 h-24 object-cover"
                                        />
                                    ))} */}
                                    <InputError
                                        message={errors.images}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Ürün Ekle
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
