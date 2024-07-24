import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import StoreLayout from "@/Layouts/StoreLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";
import PriceInput from "@/Components/PriceInput";
import NumberInput from "@/Components/NumberInput";

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

    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        post(route("store.productAdd"));
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        e.target.value = null;

        files.forEach((file) => {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                if (image.width > 1200 || image.height > 1800) {
                    alert(
                        "Resim boyutu çok büyük! Lütfen 1200x1800 pikselden küçük bir resim seçin."
                    );
                    return;
                }
                if (image.width < 500 || image.height < 500) {
                    alert(
                        "Resim boyutu çok küçük! Lütfen 500x500 pikselden büyük bir resim seçin."
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-xl font-bold mb-5">
                                Ürün Bilgileri
                            </h1>
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
                                    </select>
                                    <InputError
                                        message={errors.category_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
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
                                    <InputLabel
                                        htmlFor="images"
                                        value="Ürün Görselleri"
                                    />
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
                                                            className="absolute bottom-2 right-4 mt-2 text-gray-50 text-lg  bg-red-500 rounded-full h-8 w-8 hover:text-gray-200 hover:bg-red-600 group-hover:flex flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                        <img
                                                            src={URL.createObjectURL(
                                                                img
                                                            )}
                                                            alt=""
                                                            className="h-44 w-44 border-2 rounded-lg cursor-pointer p-2 mr-2 object-cover"
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
                                                            PNG, JPG,WEBP,JPEG
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
                                    {data.is_active ? (
                                        <InputLabel
                                            htmlFor="is_active"
                                            value="Aktif (Ürün Anasyafa Gösteri Açık)"
                                        />
                                    ) : (
                                        <InputLabel
                                            htmlFor="is_active"
                                            value="Pasif (Ürün Anasyafa Gösteri Kapalı)"
                                        />
                                    )}
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
