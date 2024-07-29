import { useEffect, useCallback, useState } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import PriceText from "@/Components/PriceText";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FaTruck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "@/Components/Modal";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCartOutline } from "react-icons/io5";
import ProductContainer from "@/Components/ProductContainer";

export default function Cart({ auth, carts, products }) {
    const { flash } = usePage().props;
    const { data, setData, post } = useForm({ product_id: "", action: "" });

    const [isUpdating, setIsUpdating] = useState(false);

    const handlePostRequest = useCallback(() => {
        if (data.product_id && data.action) {
            setIsUpdating(true);
            const routes = {
                add: "user.cartAdd",
                reduce: "user.reduceToCart",
                remove: "user.removeFromCart",
            };
            post(route(routes[data.action]), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsUpdating(false);
                    if (flash.message) {
                        toast.success(flash.message, {
                            theme: "colored",
                            autoClose: 2000,
                        });
                    }
                },
            });
            setData({ product_id: "", action: "" });
        }
    }, [data, post, setData, flash.message]);

    useEffect(() => {
        handlePostRequest();
    }, [handlePostRequest]);

    const handleAction = (productId, action) => (e) => {
        e.preventDefault();
        setData({ product_id: productId, action });
    };

    console.log(flash);

    return (
        <HomeLayout auth={auth}>
            <Head title="Sepetim" />
            <Modal
                maxWidth="md"
                show={isUpdating}
                onClose={() => setIsUpdating(false)}
            >
                <div className="py-11 text-center flex flex-col justify-center items-center">
                    <div class="animate-spin h-16 w-16">
                        <CgSpinner className="w-full h-full text-blue-500" />
                    </div>

                    <h2 className="text-2xl text-blue-500 font-medium mt-5 mb-2 ">
                        Sepet Güncelleniyor
                    </h2>
                    <h2 className="font-medium">lütfen bekleyim...</h2>
                </div>
            </Modal>
            {carts.length > 0 ? (
                <div className="flex gap-6 justify-between">
                    <div className="mt-6">
                        <p className="text-2xl font-medium">
                            Sepetim ({carts[0].products.length} Ürün)
                        </p>
                        {carts.map((cart) => (
                            <div
                                key={cart.storeId}
                                className="border-2 shadow-md rounded-lg mt-6"
                            >
                                <div className="flex items-center rounded-t-lg bg-gray-50 pl-3 px-2 py-3">
                                    <p className="text-gray-500 mr-1 text-sm">
                                        Satıcı:
                                    </p>
                                    <p className="font-medium text-sm">
                                        {cart.storeName}
                                    </p>
                                </div>
                                {cart.products.map((products) => (
                                    <div
                                        key={products.id}
                                        className="border-t-2 px-5 py-4 flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={products.is_active}
                                                className="mr-3 text-lg w-[18px] h-[18px]"
                                            />
                                            <img
                                                className="select-none mr-3 border rounded duration-300 object-contain w-auto h-32"
                                                loading="lazy"
                                                src={
                                                    products.product.images[0]
                                                        ?.img
                                                }
                                                alt={products.product.name}
                                            />
                                            <div className="mr-7">
                                                <p className="font-medium text-sm text-gray-900 mb-1">
                                                    {products.product.name
                                                        .length > 50
                                                        ? `${products.product.name.slice(
                                                              0,
                                                              50
                                                          )}...`
                                                        : products.product.name}
                                                </p>
                                                <p className="flex text-sm items-center text-green-500">
                                                    <FaTruck className="mr-1.5 -scale-x-100" />{" "}
                                                    3 iş günde kargolanır
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-[32%]">
                                            <div className="flex justify-center items-center">
                                                <button
                                                    onClick={handleAction(
                                                        products.product.id,
                                                        "reduce"
                                                    )}
                                                    disabled={
                                                        products.quantity <= 1
                                                    }
                                                    className="w-7 disabled:text-gray-300 rounded-s border h-10 bg-gray-100 text-blue-500 text-xl"
                                                >
                                                    -
                                                </button>
                                                <div className="w-10 h-10 border-y text-center flex justify-center items-center">
                                                    <p>{products.quantity}</p>
                                                </div>
                                                <button
                                                    onClick={handleAction(
                                                        products.product.id,
                                                        "add"
                                                    )}
                                                    className="w-7 rounded-e border h-10 bg-gray-100 text-blue-500 text-xl"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="flex flex-col h-full">
                                                <button
                                                    onClick={handleAction(
                                                        products.product.id,
                                                        "remove"
                                                    )}
                                                    className="flex text-sm mb-6 justify-end items-center"
                                                >
                                                    <MdDelete className="text-gray-400" />{" "}
                                                    Sil
                                                </button>
                                                <div className="mb-10">
                                                    <PriceText
                                                        value={
                                                            products.product
                                                                .price
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <p className="mt-8 text-xl font-medium">
                            En Çok Satanlar
                        </p>
                        <ProductContainer products={products} cart={false} />
                    </div>
                    <div className="w-60 mt-20">
                        <div className="w-full sticky top-[20px]">
                            <div className="rounded-lg shadow-md bg-white px-4 py-2 border-2 border-gray-200">
                                <p className="text-sm font-semibold text-blue-500 mb-3 mt-2">
                                    SEÇİLEN ÜRÜNLER (1)
                                </p>
                                <div className="flex text-sm justify-between">
                                    <p className="text-2xl font-semibold">
                                        30.500,00 TL
                                    </p>
                                </div>
                                <Link
                                    href={route("user.payment")}
                                    className="items-center px-4 bg-blue-500 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-3 shadow-md my-4 text-2xl flex justify-center"
                                >
                                    Alışverişi tamamla
                                </Link>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Ürünler</p>
                                    <p>30.500,00 TL</p>
                                </div>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Kargo</p>
                                    <p>50 TL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between mt-6 px-5 py-4  border-2 rounded-lg">
                    <div className="flex items-center">
                        <div className="w-16 h-16 mr-3 bg-blue-50 rounded-full flex justify-center items-center">
                            <IoCartOutline className="text-3xl text-blue-500" />
                        </div>
                        <p className="text-xl font-medium">
                            Sepetinde ürün bulunmamaktadır.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="bg-blue-500 hover:bg-blue-600 transition px-16 py-3 rounded-md text-lg font-medium text-white"
                        >
                            Alışverişe Başla
                        </Link>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
}
