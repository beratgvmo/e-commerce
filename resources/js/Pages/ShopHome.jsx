import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import banner from "./banner.webp";
import banner1 from "./banner1.webp";
import banner2 from "./banner2.webp";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import ProductSwiper from "@/Components/ProductSwiper";
import { FaPen } from "react-icons/fa";
import { LuUploadCloud } from "react-icons/lu";
import { useForm } from "@inertiajs/react";
import ModalImg from "../Components/ModalImg";

import "react-image-crop/dist/ReactCrop.css";

import { BiStoreAlt } from "react-icons/bi";

export default function ShopHome({ auth, categories, store, products }) {
    const { data, setData, post } = useForm({
        logo: "",
        banner: "",
    });

    const [currentTab, setCurrentTab] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImgType, setCurrentImgType] = useState("logo");
    const [modalOpen, setModalOpen] = useState(false);
    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
    };

    const updateImage = (imgSrc) => {
        setData(currentImgType, imgSrc);
        setModalOpen(false);
    };

    useEffect(() => {
        if (data.logo) {
            post(route("store.storeLogo"), {
                preserveScroll: true,
            });
        }
    }, [data.logo]);

    useEffect(() => {
        if (data.banner) {
            post(route("store.storeBanner"), {
                preserveScroll: true,
            });
        }
    }, [data.banner]);

    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />

            <ModalImg
                confirmingLogo={modalOpen && currentImgType === "logo"}
                update={updateImage}
                closeModal={() => setModalOpen(false)}
                imgType="logo"
            />
            <ModalImg
                confirmingLogo={modalOpen && currentImgType === "banner"}
                update={updateImage}
                closeModal={() => setModalOpen(false)}
                imgType="banner"
            />

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
                {store.banner ? (
                    <img src={store.banner} alt="Avatar" className="" />
                ) : (
                    <button
                        onClick={() => {
                            setCurrentImgType("banner");
                            setModalOpen(true);
                        }}
                        className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 font-semibold">
                                Mağazanıza Banner ekleyin
                            </p>
                            <p className="text-xs text-center text-gray-500">
                                PNG, JPG, WEBP, JPEG
                            </p>
                        </div>
                    </button>
                )}
                <div className="px-6 flex pt-4 items-center mb-8 rounded-t-lg">
                    <div className="relative w-[100px] h-[100px] mr-5 bg-white">
                        {store.logo ? (
                            store.banner ? (
                                <div className="absolute -top-10">
                                    <img
                                        src={store.logo}
                                        alt="Avatar"
                                        className="w-[100px] h-[100px] rounded-full border-4 border-white bg-white object-contain"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={store.logo}
                                    alt="Avatar"
                                    className="w-[100px] h-[100px] rounded-full border-2 border-gray-200 bg-white object-contain"
                                />
                            )
                        ) : store.banner ? (
                            <div className="absolute -top-10">
                                <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center border-2 border-gray-300 bg-white object-contain">
                                    <BiStoreAlt className="w-[60%] h-[60%] text-gray-300" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center border-2 border-gray-300 bg-white object-contain">
                                <BiStoreAlt className="w-[60%] h-[60%] text-gray-300" />
                            </div>
                        )}
                        {store.id === auth.store.id &&
                            (store.banner ? (
                                <button
                                    className="text-white rounded-full absolute w-7 h-7 flex justify-center items-center bg-blue-500 hover:bg-blue-600 transition bottom-10 right-1"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setCurrentImgType("logo");
                                    }}
                                >
                                    <FaPen size={12} />
                                </button>
                            ) : (
                                <button
                                    className="text-white rounded-full absolute w-7 h-7 flex justify-center items-center bg-blue-500 hover:bg-blue-600 transition bottom-0 right-0"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setCurrentImgType("logo");
                                    }}
                                >
                                    <FaPen size={12} />
                                </button>
                            ))}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-3xl font-black text-gray-800 mr-2">
                                {store.store_name}
                            </p>
                            {store.id === auth.store.id || (
                                <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:bg-blue-500 focus:bg-blue-700 focus:outline-none focus:ring-2 hover:text-white focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out">
                                    Takip Et
                                </button>
                            )}
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
                        <div className="gap-6 mb-6 grid grid-cols-2">
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
                            <div>
                                {imagePreview ? (
                                    <div className="rounded-2xl overflow-hidden relative">
                                        <img
                                            src={imagePreview}
                                            alt=""
                                            className="rounded-2xl cursor-pointer"
                                        />
                                        <div className="absolute group top-0 flex items-center justify-center w-full h-full">
                                            <label
                                                htmlFor="img"
                                                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer "
                                            >
                                                <div className="flex group-hover:scale-105 bg-white/60 px-4  py-2 rounded-full transition-all flex-col items-center justify-center">
                                                    <LuUploadCloud
                                                        size={30}
                                                        className="text-gray-600"
                                                    />
                                                    <p>
                                                        Banner Güncelle için
                                                        İçin Tıklayın
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="img"
                                                    name="img"
                                                    className="hidden mt-1 w-full"
                                                    onChange={handleImageChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex mt-1 items-center justify-center w-full">
                                        <label
                                            htmlFor="img"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <LuUploadCloud
                                                    size={30}
                                                    className="mb-1"
                                                />
                                                <p>
                                                    Yeni Banner Resmi Ekleme
                                                    İçin Tıklayın
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                id="img"
                                                name="img"
                                                className="hidden mt-1 w-full"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                )}
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
