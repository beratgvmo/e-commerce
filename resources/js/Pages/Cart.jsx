import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import PriceText from "@/Components/PriceText";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import { FaTruck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Cart({ auth, carts }) {
    // Group products by store
    const groupedCarts = carts.reduce((acc, cart) => {
        if (!acc[cart.store.id]) {
            acc[cart.store.id] = {
                storeName: cart.store.store_name,
                products: [],
            };
        }
        acc[cart.store.id].products.push(cart);
        return acc;
    }, {});

    return (
        <HomeLayout auth={auth}>
            <Head title="Sepetim" />
            {carts.length > 0 ? (
                <div className="flex gap-6 justify-between">
                    <div className="w-[75%] mt-6">
                        <p className="text-2xl font-medium">
                            Sepetim ({carts.length} Ürün)
                        </p>
                        {Object.keys(groupedCarts).map((storeId) => (
                            <div
                                key={storeId}
                                className="border-2 shadow-md rounded-lg mt-6"
                            >
                                <div className="flex items-center rounded-t-lg bg-gray-50 pl-3 px-2 py-3">
                                    <Checkbox className="mr-3 text-lg w-[18px] h-[18px]" />
                                    <p className="text-gray-500 mr-1 text-sm">
                                        Satıcı:
                                    </p>
                                    <p className="font-medium text-sm">
                                        {groupedCarts[storeId].storeName}
                                    </p>
                                </div>
                                {groupedCarts[storeId].products.map((cart) => (
                                    <div
                                        key={cart.id}
                                        className="border-t-2 px-5 py-4 flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <Checkbox className="mr-3 text-lg w-[18px] h-[18px]" />
                                            <img
                                                className="select-none mr-3 border rounded duration-300 object-cover w-32 h-auto"
                                                loading="lazy"
                                                src={
                                                    cart.product.images[0]?.img
                                                }
                                                alt={cart.product.name}
                                            />
                                            <div className="mr-7">
                                                <p className="font-medium text-sm text-gray-900 mb-1">
                                                    {cart.product.name.length >
                                                    50
                                                        ? cart.product.name.slice(
                                                              0,
                                                              50
                                                          ) + "..."
                                                        : cart.product.name}
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
                                                <MdDelete className="text-gray-400" />{" "}
                                                Sil
                                            </p>
                                            <div className="mb-10">
                                                <PriceText
                                                    value={cart.product.price}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="w-[25%] mt-20">
                        <div className="w-full sticky top-[20px]">
                            <div className="rounded-lg shadow-md bg-white px-3 py-2 border-2 border-gray-200">
                                <p className="text-xl mb-4 mt-2">
                                    Sipariş Özeti
                                </p>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Ürünün Toplamı</p>
                                    <p>30.500,00 TL</p>
                                </div>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Kargo Toplam</p>
                                    <p>30 TL</p>
                                </div>
                                <div className="flex border-t-2 mb-1 pt-1.5 justify-between">
                                    <p className="text-sm">Toplam</p>
                                    <p className="font-semibold text-blue-500">
                                        1.004,89 TL
                                    </p>
                                </div>
                            </div>
                            <Button className="w-full shadow-md py-3 mt-5 text-2xl flex justify-center">
                                Sepeti Onayla
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Sepetinde ürün bulunmamaktadır.</p>
                </div>
            )}
        </HomeLayout>
    );
}
