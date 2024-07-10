import { Link, Head } from "@inertiajs/react";
import img from "./laptop4.jpeg";
import HomeLayout from "@/Layouts/HomeLayout";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function Home({ auth, categories, products }) {
    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />
            {/* {auth.store.store_name} -{auth.store.city} -
            {auth.store.phone_number} -{auth.store.store_name} */}
            <div className="flex">
                <div className="grid grid-cols-4 gap-5">
                    {products.map((product) => (
                        <div class="group max-w-56 bg-white border border-gray-200 rounded-lg shadow ">
                            <img class="rounded-t-lg" src={img} />
                            <div class="p-2 flex flex-col justify-between min-h-[168px]">
                                <div>
                                    <h3 class="font-medium text-sm text-gray-900 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="mb-1">{product.rating}</p>
                                    <p className="font-semibold mb-5">
                                        {product.price} TL
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    class="justify-center hidden group-hover:flex w-full py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg transition hover:bg-blue-600"
                                >
                                    Sepete Ekle
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
