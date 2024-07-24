// resources/js/Pages/Products/Index.jsx

import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaTruckRampBox } from "react-icons/fa6";
import TextInput from "@/Components/TextInput";

export default function ProductList({ auth }) {
    const { products } = usePage().props;

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
                            placeholder="Alt Kategori Seçimi"
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
                            <thead className="text-gray-700 font-black uppercase bg-gray-50">
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
                                        içerik Güncelle
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Detay sayfası
                                    </th>
                                </tr>
                            </thead>
                            {products.data.length > 0 && (
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="bg-white border-t"
                                        >
                                            <th
                                                scope="row"
                                                className="px-4 w-[33%] text-sm py-2 font-medium text-gray-900 "
                                            >
                                                <div className="flex items-center">
                                                    <img
                                                        className="select-none w-20 h-full object-cover mr-4 rounded-md border-2"
                                                        loading="lazy"
                                                        src={
                                                            product.images[0]
                                                                ?.img
                                                        }
                                                        alt={product.name}
                                                    />
                                                    <div className="">
                                                        <p className="text-sm mb-2">
                                                            {product.name
                                                                .length > 60
                                                                ? product.name.slice(
                                                                      0,
                                                                      47
                                                                  ) + "..."
                                                                : product.name}
                                                        </p>
                                                        <p className="text-gray-500 mt-2">
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-4 border w-[20%]">
                                                <div className="flex gap-2">
                                                    {product.attributes
                                                        .slice(0, 5)
                                                        .map(
                                                            (
                                                                attribute,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {
                                                                        attribute.name
                                                                    }
                                                                    {index <
                                                                        4 &&
                                                                        " | "}{" "}
                                                                </span>
                                                            )
                                                        )}
                                                </div>
                                            </td>
                                            <td className="px-4 border">
                                                <p className=" bg-green-500 py-1 text-white rounded-full text-center">
                                                    %10.0
                                                </p>
                                            </td>
                                            <td className="px-4 font-black border w-[10%]">
                                                <p>{product.price}</p>
                                            </td>
                                            <td className="px-4 font-black border w-[10%]">
                                                <p>{product.price}</p>
                                            </td>
                                            <td className="px-4 border">
                                                <p>{product.stock_quantity}</p>
                                            </td>
                                            <td className="px-4 border">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Düzenle
                                                </a>
                                            </td>
                                            <td className="px-4 border">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    <IoIosArrowForward />
                                                </a>
                                            </td>
                                        </tr>
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
                    {products.data.length > 10 && (
                        <div className="flex justify-center mt-4">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`mx-1 px-4 py-2 border rounded ${
                                        link.active
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-blue-500 border-blue-500"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </StoreLayout>
    );
}
