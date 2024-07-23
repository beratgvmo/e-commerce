// resources/js/Pages/Products/Index.jsx

import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { IoIosArrowForward } from "react-icons/io";

export default function ProductList({ auth }) {
    const { products } = usePage().props;

    console.log(products);

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
                <div className="bg-white p-4 text-gray-900 px-6 overflow-hidden shadow-sm">
                    <div className="relativeoverflow-x-auto shadow border rounded">
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
                                                    src={product.images[0]?.img}
                                                    alt={product.name}
                                                />
                                                <div className="">
                                                    <p className="text-sm mb-2">
                                                        {product.name.length >
                                                        60
                                                            ? product.name.slice(
                                                                  0,
                                                                  47
                                                              ) + "..."
                                                            : product.name}
                                                    </p>
                                                    <p className="text-gray-500 mt-2">
                                                        {product.category.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-4 border w-[20%]">
                                            <div className="flex gap-2">
                                                {product.attributes
                                                    .slice(0, 5)
                                                    .map((attribute, index) => (
                                                        <span key={index}>
                                                            {attribute.name}
                                                            {index < 4 &&
                                                                " | "}{" "}
                                                        </span>
                                                    ))}
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
                        </table>
                    </div>
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
                </div>
            </div>
        </StoreLayout>
    );
}
