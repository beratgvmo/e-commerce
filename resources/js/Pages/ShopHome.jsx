import PrimaryButton from "@/Components/PrimaryButton";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import banner from "./banner.webp";
import { useState } from "react";

export default function ShopHome({ auth, categories, store }) {
    const [currentTab, setCurrentTab] = useState(1);

    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />

            <div className="mt-8">
                <div className="">
                    <img src={banner} alt="" className="rounded-lg" />
                </div>
                <div className="px-6 flex py-4 rounded-t-lg">
                    <div className="relative w-[100px] h-[100px]  mr-5">
                        <img
                            src={store.img}
                            alt=""
                            className="rounded-full w-[100px] h-[100px] border-2 absolute -top-10"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-3xl font-black text-gray-800 mr-2">
                                {store.store_name}
                            </p>
                            <button className="bg-white text-blue-500 mb-1 border-2 border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:bg-blue-500 focus:bg-blue-700 focus:outline-none focus:ring-2 hover:text-white focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out">
                                Takip Et
                            </button>
                        </div>
                        <div className="flex mt-5 gap-2 items-center">
                            <p className="ml-1 font-bold bg-green-500 text-xs py-0.5 px-2 rounded text-white">
                                {store.store_rating ? store.store_rating : 0}
                            </p>

                            <p className="text-blue-600 text-sm font-bold">
                                47B Takipçi • 257 ürün
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white"></div>
            </div>
        </HomeLayout>
    );
}
