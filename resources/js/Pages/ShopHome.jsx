import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import banner from "./banner.webp";
import banner1 from "./banner1.webp";
import banner2 from "./banner2.webp";
import { useState } from "react";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import ProductSwiper from "@/Components/ProductSwiper";

export default function ShopHome({ auth, categories, store, products }) {
    const [currentTab, setCurrentTab] = useState(1);

    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />

            <nav className="flex pt-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <div className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <FaHome className="mr-1 text-lg" />
                            <Link href="/">Ana Sayfa</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <IoIosArrowForward />
                            <div className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                <Link href={`/magaza`}>Mağaza</Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <IoIosArrowForward />
                            <div className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                <Link href={`${store.slug}`}>
                                    {store.store_name}
                                </Link>
                            </div>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="mt-4">
                <div className="">
                    <img src={banner} alt="" className="rounded-lg" />
                </div>
                <div className="px-6 flex pt-4 pb-2 rounded-t-lg">
                    <div className="relative w-[100px] h-[100px] mr-5 bg-white">
                        <img
                            src={store.img}
                            alt=""
                            className="rounded-full border-4 border-white bg-white object-contain absolute -top-10"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-3xl font-black text-gray-800 mr-2">
                                {store.store_name}
                            </p>
                            <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:bg-blue-500 focus:bg-blue-700 focus:outline-none focus:ring-2 hover:text-white focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out">
                                Takip Et
                            </button>
                        </div>
                        <div className="flex mt-3 gap-2 items-center">
                            <p className="font-bold bg-green-500 text-xs py-0.5 px-2 rounded text-white">
                                {store.store_rating ? store.store_rating : 0}
                            </p>

                            <p className="text-blue-600 text-sm font-bold">
                                47B Takipçi • 257 ürün
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mb-2">
                <div className="border-b-2 w-full">
                    <button
                        onClick={() => switchTab(1)}
                        className={`inline-flex  items-center px-4 pb-2 border-b-4 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                            currentTab === 1
                                ? "border-blue-500 rounded-t-lg text-gray-900  "
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                        }`}
                    >
                        Mağaza
                    </button>
                    <button
                        onClick={() => switchTab(2)}
                        className={`inline-flex  items-center px-4 pb-2 border-b-4 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                            currentTab === 2
                                ? "border-blue-500 rounded-t-lg text-gray-900  "
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                        }`}
                    >
                        Tüm ürünler
                    </button>
                    <button
                        onClick={() => switchTab(3)}
                        className={`inline-flex items-center px-4 pb-2 border-b-4 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                            currentTab === 3
                                ? "border-blue-500 rounded-t-lg text-gray-900  "
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                        }`}
                    >
                        Satıcı profili
                    </button>
                </div>

                <div className="rounded-lg bg-gray-200 ml-3 flex items-center w-96 ">
                    <IoIosSearch className="text-white bg-blue-500 w-10 px-2 h-full rounded-s-lg" />
                    <input
                        type="text"
                        placeholder="Satıcı Ürünleri Ara"
                        className="bg-gray-200 text-sm border-transparent border-2 focus:border-blue-500 rounded-e-lg focus:bg-gray-50 transition w-full h-full outline-none focus:ring-0 focus:ring-transparent px-2"
                    />
                </div>
            </div>

            <div className="min-h-[10rem] py-3">
                {currentTab === 1 && (
                    <div>
                        <div className="flex gap-6 mb-20">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src={banner1}
                                    alt=""
                                    className="rounded-2xl transition-transform cursor-pointer object-contain hover:scale-105"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src={banner2}
                                    alt=""
                                    className="rounded-2xl transition-transform cursor-pointer object-contain hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="">
                            <div className="my-4">
                                <p className="text-xl font-bold">
                                    Çok Satanlar
                                </p>
                                <ProductSwiper
                                    products={products}
                                    SwiperID="1"
                                />
                            </div>

                            <div className="my-4">
                                <p className="text-xl font-bold">
                                    4 Üzeri Puanlı Ürünler
                                </p>
                                <ProductSwiper
                                    products={products}
                                    SwiperID="2"
                                />
                            </div>

                            <div className="my-4">
                                <p className="text-xl font-bold">
                                    En Çok Değerlendirilenler
                                </p>
                                <ProductSwiper
                                    products={products}
                                    SwiperID="3"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 2 && (
                    <div>
                        {/* <div className="flex gap-5">
                            <div>
                                {(categorySubMain.length > 0 ||
                                    attributesMain.length > 0) && (
                                    <FilterTab
                                        attributesMain={attributesMain}
                                        categorySubMain={categorySubMain}
                                        categorySlug={categoryMain.slug}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                {products.length > 0 ? (
                                    <>
                                        <div className=""></div>
                                        <ProductContainer products={products} />
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-center mt-8">
                                            <div className="flex flex-col justify-center items-center">
                                                <LuSearchX className="text-8xl text-orange-500" />
                                                Aramanız için sonuç bulunamadı.
                                                <Link
                                                    href="/"
                                                    className="text-orange-600 underline"
                                                >
                                                    Ana Sayfa
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div> */}
                    </div>
                )}

                {currentTab === 3 && <div>tab 3</div>}
            </div>
        </HomeLayout>
    );
}
