import NoteBox from "@/Components/NoteBox";
import PriceText from "@/Components/PriceText";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { FaTruckRampBox } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
    TbClock,
    TbClockX,
    TbBasketOff,
    TbBasketCheck,
    TbBasketDown,
} from "react-icons/tb";
export default function OrderList({ auth, orderCount }) {
    const { orders } = usePage().props;
    const { flash } = usePage().props;

    const { data, setData, get } = useForm({
        status: "Sipariş sürüyor",
        date: "yeni",
    });

    useEffect(() => {
        if (flash.message) {
            toast[flash.type](flash.message, {
                theme: "colored",
                autoClose: 2000,
            });
        }
    }, [flash]);

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
                <NoteBox icon={TbClockX} color="yellow">
                    {diffDays - 4 > 0 && `${diffDays - 4} gün`}
                    {diffDays - 4 > 0 && diffHours > 0 ? "," : ""}
                    {diffHours > 0 && ` ${diffHours} saat`} geçti
                </NoteBox>
            );
        } else {
            return (
                <NoteBox icon={TbClock} color="blue">
                    {3 - diffDays > 0 && `${3 - diffDays} gün`}
                    {diffDays - 3 > 0 && 24 - diffHours > 0 ? "," : ""}
                    {24 - diffHours > 0 && ` ${24 - diffHours} saat`} kaldı
                </NoteBox>
            );
        }
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
                <h2 className="font-semibold text-xl  text-gray-800 leading-tight">
                    Sipariş Listesi
                </h2>
            }
        >
            <Head title="OrderList" />

            <div className="py-12">
                <div className="bg-white border text-gray-900  overflow-hidden shadow-sm rounded-lg ">
                    <p className="p-4 text-gray-500 font-medium">
                        <span className="text-gray-600 font-semibold">
                            {orderCount}
                        </span>{" "}
                        Siparisten,
                        <span className="text-gray-600 font-semibold">
                            {orders.from}-{orders.to}
                        </span>{" "}
                        arasını görüntülüyorsunuz.
                    </p>
                    <div className="flex p-4 gap-4 mb-4 items-center border-2 rounded-lg">
                        <p>Filtrele</p>
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
                            <option value="İptal edildi">
                                İptal edildi Siparişler
                            </option>
                            <option value="İade edildi">
                                İade edillen Siparişler
                            </option>
                            <option value="all">Tüm Siparişler</option>
                        </select>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-gray-700 font-black uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="p-3">
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
                                <th scope="col" className="p-3">
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
                                        <td className="px-4 py-2">
                                            {order.user.name}
                                        </td>
                                        <td className="px-4 font-black border">
                                            {quantity(order.order_items)} Ürün
                                        </td>
                                        <td className="px-4 border">
                                            <PriceText
                                                value={order.total_amount}
                                            />
                                        </td>
                                        <td className="px-4 border">
                                            {order.status ==
                                                "Sipariş sürüyor" &&
                                                formatDate(order.created_at)}

                                            {order.status ==
                                                "Sipariş bitti" && (
                                                <NoteBox
                                                    icon={TbBasketCheck}
                                                    color="green"
                                                >
                                                    Sipariş Tamanladı
                                                </NoteBox>
                                            )}

                                            {order.status == "İade edildi" && (
                                                <NoteBox
                                                    icon={TbBasketDown}
                                                    color="orange"
                                                >
                                                    Sipariş İade edildi
                                                </NoteBox>
                                            )}

                                            {order.status == "İptal edildi" && (
                                                <NoteBox
                                                    icon={TbBasketOff}
                                                    color="red"
                                                >
                                                    Sipariş İptal Edildi
                                                </NoteBox>
                                            )}
                                        </td>
                                        <td className="px-4 w-[6%]">
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
                {orderCount > 12 && (
                    <div className="flex justify-center mt-6">
                        {orders.links.map((link, index) =>
                            link.url ? (
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
                            ) : (
                                <div
                                    key={index}
                                    className="opacity-50 bg-white text-indigo-500 mx-1 px-4 py-2 text-lg border rounded-md transition shadow-sm font-medium flex justify-center items-center"
                                >
                                    {translatePaginationLabel(link.label)}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* <div className="py-12">
                <div className="bg-white text-gray-900 overflow-hidden shadow-sm rounded-lg">
                    <div className="relative overflow-x-auto shadow border rounded">
                        <table className="w-full border text-sm text-left text-gray-500">
                            <thead className="text-gray-700 font-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-3">
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
                                    <th scope="col" className="p-3">
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
                                                    "Sipariş sürüyor" &&
                                                    formatDate(
                                                        order.created_at
                                                    )}

                                                {order.status ==
                                                    "Sipariş bitti" && (
                                                    <NoteBox
                                                        icon={TbBasketCheck}
                                                        color="green"
                                                    >
                                                        Sipariş Tamanladı
                                                    </NoteBox>
                                                )}

                                                {order.status ==
                                                    "İade edildi" && (
                                                    <NoteBox
                                                        icon={TbBasketDown}
                                                        color="orange"
                                                    >
                                                        Sipariş İade edildi
                                                    </NoteBox>
                                                )}

                                                {order.status ==
                                                    "İptal edildi" && (
                                                    <NoteBox
                                                        icon={TbBasketOff}
                                                        color="red"
                                                    >
                                                        Sipariş İptal Edildi
                                                    </NoteBox>
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
            </div> */}
        </StoreLayout>
    );
}
