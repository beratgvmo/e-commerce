import PriceText from "@/Components/PriceText";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { FaTruckRampBox } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { TbClock, TbClockX, TbClockCheck } from "react-icons/tb";

export default function OrderList({ auth }) {
    const { orders } = usePage().props;

    const { data, setData, get } = useForm({
        status: "Sipariş sürüyor",
        date: "yeni",
    });

    const fetchOrder = useCallback(() => {
        router.visit(route(route().current()), {
            method: "get",
            data: data,
            preserveState: true,
            replace: true,
            only: ["orders"],
        });
    }, [data]);

    useEffect(() => {
        const timeoutId = setTimeout(fetchOrder, 100);
        return () => clearTimeout(timeoutId);
    }, [data, fetchOrder]);

    const quantity = (order_items) => {
        let quantity = 0;
        order_items.map((item) => {
            quantity += item.quantity;
        });
        return quantity;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
            (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (diffDays > 3) {
            return (
                <div className="flex items-center">
                    <div className="w-10 h-10 text-2xl mr-4 bg-red-800/15 text-red-600 rounded-lg flex justify-center items-center">
                        <TbClockX size={26} />
                    </div>
                    <span className="text-red-600">
                        {diffDays - 4 > 0 && `${diffDays - 4} gün`}
                        {diffDays - 4 > 0 && diffHours > 0 ? "," : ""}
                        {diffHours > 0 && ` ${diffHours} saat`} geçti
                    </span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center">
                    <div className="w-10 h-10 text-2xl mr-4 bg-blue-800/15 text-blue-600 rounded-lg flex justify-center items-center">
                        <TbClock size={26} />
                    </div>
                    <span className="text-blue-600">
                        {3 - diffDays > 0 && `${3 - diffDays} gün`}
                        {diffDays - 3 > 0 && 24 - diffHours > 0 ? "," : ""}
                        {24 - diffHours > 0 && ` ${24 - diffHours} saat`} kaldı
                    </span>
                </div>
            );
        }
    };

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sipariş Listesi
                </h2>
            }
        >
            <Head title="OrderList" />

            <div className="py-12">
                <div className="bg-white p-4 text-gray-900 px-6 overflow-hidden shadow-sm rounded-lg">
                    <div className="flex gap-4 mb-4 items-center">
                        <p>Filter Seçinleri</p>
                        <select
                            className="border-gray-300 w-52 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                        >
                            <option value="yeni">En Yeni</option>
                            <option value="eski">En Eski</option>
                            <option value="para">Tutar Fazla</option>
                        </select>
                        <select
                            className="border-gray-300 w-52 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="Sipariş sürüyor">
                                Devam Eden Siparişler
                            </option>
                            <option value="Sipariş bitti">
                                Tamamlanan Siparişler
                            </option>
                            <option value="">Tüm Siparişler</option>
                        </select>
                    </div>
                    <div className="relative overflow-x-auto shadow border rounded">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-gray-700 font-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-3 border">
                                        Alıcı
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Ürünler
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Tutar
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Teslim Tarihi
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Detay
                                    </th>
                                </tr>
                            </thead>

                            {orders.data.length > 0 && (
                                <tbody>
                                    {orders.data.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="bg-white text-sm font-medium border-t"
                                        >
                                            <td className="px-4 border py-2">
                                                {order.user.name}
                                            </td>
                                            <td className="px-4 font-black border">
                                                {quantity(order.order_items)}{" "}
                                                Ürün
                                            </td>
                                            <td className="px-4 border">
                                                <PriceText
                                                    value={order.total_amount}
                                                />
                                            </td>
                                            <td className="px-4 border">
                                                {order.status ==
                                                "Sipariş bitti" ? (
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 text-2xl mr-4 bg-green-800/15 text-green-600 rounded-lg flex justify-center items-center">
                                                            <TbClockCheck
                                                                size={26}
                                                            />
                                                        </div>
                                                        <span className="text-green-600">
                                                            Sipariş Tamanladı
                                                        </span>
                                                    </div>
                                                ) : (
                                                    formatDate(order.created_at)
                                                )}
                                            </td>
                                            <td className="px-4 border w-[6%]">
                                                <div className="flex justify-center py-2">
                                                    <Link
                                                        key={order.id}
                                                        href={`order/${order.order_code}`}
                                                    >
                                                        <div className="font-medium w-10 h-10 bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md text-lg hover:text-blue-600 text-blue-500 flex justify-center items-center">
                                                            <IoIosArrowForward />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                        {!orders.data.length > 0 && (
                            <div className="w-full h-72 flex justify-center items-center border">
                                <FaTruckRampBox
                                    className="mr-8 text-blue-500"
                                    size={100}
                                />
                                <div className="w-1/2">
                                    <p className="font-semibold mb-3 text-lg">
                                        Sipariş Bulunamadı
                                    </p>
                                    <Link
                                        href={route("store.dashboard")}
                                        className="px-52 py-2  bg-blue-500 rounded-lg text-white font-medium  hover:bg-blue-600 transition"
                                    >
                                        Yönetim Git
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
