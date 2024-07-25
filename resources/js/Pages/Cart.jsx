import Checkbox from "@/Components/Checkbox";
import PriceText from "@/Components/PriceText";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import { FaTruck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Cart({ auth, product }) {
    return (
        <HomeLayout auth={auth}>
            <Head title="Welcome" />
            <div className="flex gap-4 justify-between">
                <div className="w-[75%] ">
                    <p>Sepetim (2 Ürün)</p>
                    <div className="border-2">
                        <div className="flex items-center ml-3 p-2">
                            <Checkbox className="mr-3 text-lg" />
                            <p className="text-gray-500 text-sm">Satıcı:</p>
                            <p className="font-medium text-sm">
                                KOMŞU ECZANE 9.6
                            </p>
                        </div>
                        <div className="border-t-2 px-5 py-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <Checkbox className="mr-3 text-lg" />
                                <img
                                    className="select-none mr-3 border rounded duration-300 object-cover w-32 h-auto"
                                    loading="lazy"
                                    src={product.images[0]?.img}
                                    alt={product.name}
                                />
                                <div className="mr-7">
                                    <p className="font-medium text-sm text-gray-900 mb-1">
                                        {product.name.length > 50
                                            ? product.name.slice(0, 50) + "..."
                                            : product.name}
                                    </p>
                                    <p className="flex text-sm items-center text-green-500">
                                        <FaTruck className="mr-1.5 -scale-x-100" />{" "}
                                        3 iş günde kargolanır
                                    </p>
                                </div>
                                <div className="flex">
                                    <button className="w-7 rounded-s border h-10 bg-gray-100 text-blue-500 text-xl">
                                        -
                                    </button>
                                    <p className="w-10 flex justify-center items-center border-y">
                                        1
                                    </p>
                                    <button className="w-7 rounded-e border h-10 bg-gray-100 text-blue-500 text-xl">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col h-full">
                                <p className="flex text-sm mb-6 justify-end items-center">
                                    <MdDelete className="text-gray-400" />
                                    Sil
                                </p>
                                <div className="mb-10">
                                    <PriceText value={product.price} />
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 px-5 py-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <Checkbox className="mr-3 text-lg" />
                                <img
                                    className="select-none mr-3 border rounded duration-300 object-cover w-32 h-auto"
                                    loading="lazy"
                                    src={product.images[0]?.img}
                                    alt={product.name}
                                />
                                <div className="mr-7">
                                    <p className="font-medium text-sm text-gray-900 mb-1">
                                        {product.name.length > 50
                                            ? product.name.slice(0, 50) + "..."
                                            : product.name}
                                    </p>
                                    <p className="flex text-sm items-center text-green-500">
                                        <FaTruck className="mr-1.5 -scale-x-100" />{" "}
                                        3 iş günde kargolanır
                                    </p>
                                </div>
                                <div className="flex">
                                    <button className="w-7 rounded-s border h-10 bg-gray-100 text-blue-500 text-xl">
                                        -
                                    </button>
                                    <p className="w-10 flex justify-center items-center border-y">
                                        1
                                    </p>
                                    <button className="w-7 rounded-e border h-10 bg-gray-100 text-blue-500 text-xl">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col h-full">
                                <p className="flex text-sm mb-6 justify-end items-center">
                                    <MdDelete className="text-gray-400" />
                                    Sil
                                </p>
                                <div className="mb-10">
                                    <PriceText value={product.price} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[25%] bg-red-500"></div>
            </div>
        </HomeLayout>
    );
}
