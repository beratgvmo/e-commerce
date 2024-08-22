import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaTruckRampBox } from "react-icons/fa6";
import TextInput from "@/Components/TextInput";
import PriceText from "@/Components/PriceText";
import { IoIosArrowBack } from "react-icons/io";
import ProductRow from "@/Components/ProductRow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function ProductList({ auth, productsCount }) {
    const { products } = usePage().props;
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast[flash.type](flash.message, {
                theme: "colored",
                autoClose: 2000,
            });
        }
    }, [flash]);

    const formatNumber = (number) => {
        return new Intl.NumberFormat("tr-TR").format(number);
    };

    const translatePaginationLabel = (label) => {
        if (label.includes("Previous")) {
            return <IoIosArrowBack size={19} />;
        } else if (label.includes("Next")) {
            return <IoIosArrowForward size={19} />;
        }
        return label;
    };

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ürün Listesi
                </h2>
            }
        >
            <Head title="ProductList" />

            <div className="py-12">
                <div className="bg-white p-4 text-gray-900 px-6 overflow-hidden shadow-sm rounded-lg ">
                    <div className="w-full flex gap-4 mb-8">
                        <TextInput
                            id="first_name"
                            name="first_name"
                            className="mt-1 block w-full"
                            placeholder="Ürün Adı"
                        />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            className="mt-1 block w-full"
                            placeholder="Kategori Seçimi"
                        />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            className="mt-1 block w-full"
                            placeholder="Alt Kategori Seçimi"
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow border rounded">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-gray-700 font-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-3 border">
                                        Ürün bilgisi
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Özellikleri
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Komisyon
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Piyasa Satiş fiyatı
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        İndirimli Satiş fiyatı
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Stok
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        içerik
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Detay
                                    </th>
                                </tr>
                            </thead>
                            {products.data.length > 0 && (
                                <tbody>
                                    {products.data.map((product) => (
                                        <ProductRow
                                            product={product}
                                            key={product.id}
                                        />
                                    ))}
                                </tbody>
                            )}
                        </table>
                        {!products.data.length > 0 && (
                            <div className="w-full h-72 flex justify-center items-center border">
                                <FaTruckRampBox
                                    className="mr-8 text-blue-500"
                                    size={100}
                                />
                                <div className="w-1/2">
                                    <p className="font-semibold mb-3 text-lg">
                                        Kayıt Bulunamadı
                                    </p>
                                    <Link
                                        href={route("store.productAdd")}
                                        className="px-52 py-2  bg-blue-500 rounded-lg text-white font-medium  hover:bg-blue-600 transition"
                                    >
                                        Ürün Oluştur
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {productsCount > 12 && (
                    <div className="flex justify-center mt-6">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                disabled={!link.url}
                                className={`mx-1 px-4 py-2 text-lg border rounded-md transition shadow-sm font-medium flex justify-center items-center ${
                                    link.active
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white text-indigo-500 hover:bg-indigo-100"
                                }`}
                            >
                                {translatePaginationLabel(link.label)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </StoreLayout>
    );
}
