import PriceText from "@/Components/PriceText";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { IoIosArrowForward } from "react-icons/io";
import { TbClock, TbClockX } from "react-icons/tb";

export default function OrderList({ auth }) {
    const { orders } = usePage().props;

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
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
            (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (diffDays > 3) {
            return (
                <div className="flex items-center">
                    <div className="w-10 h-10 text-2xl mr-4 bg-red-800/15  text-red-600 rounded-lg flex justify-center items-center">
                        <TbClockX size={26} />
                    </div>
                    <span>
                        {diffDays} gün, {diffHours} saat geçikmiştir
                    </span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center">
                    <div className="w-10 h-10 text-2xl mr-4 bg-blue-800/15  text-blue-600 rounded-lg flex justify-center items-center">
                        <TbClock size={26} />
                    </div>
                    <span>
                        {diffDays} gün, {diffHours} saat kaldı
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
                                            {quantity(order.order_items)} Ürün
                                        </td>
                                        <td className="px-4 border">
                                            <PriceText
                                                value={order.total_amount}
                                            />
                                        </td>
                                        <td className="px-4 border">
                                            {formatDate(order.created_at)}
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
                </div>
            </div>
        </StoreLayout>
    );
}
