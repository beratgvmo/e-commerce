import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import ProductSwiper from "@/Components/ProductSwiper";
import { FaPen } from "react-icons/fa";
import { LuUploadCloud } from "react-icons/lu";
import { useForm } from "@inertiajs/react";
import ModalImg from "../Components/ModalImg";
import { MdDelete } from "react-icons/md";
import "react-image-crop/dist/ReactCrop.css";
import { BiStoreAlt } from "react-icons/bi";
import StoreFilterTab from "@/Components/StoreFilterTab";
import ProductContainer from "@/Components/ProductContainer";

export default function ShopHome({
    auth,
    categories,
    store,
    products,
    productCount,
    isFollower,
    totalFollowers,
    productsFilter,
    attributesMain,
    categorySubMain,
    categoryMain,
    categorySub,
}) {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        logo: "",
        banner: "",
        subBanner: "",
        bannerSlug: "",
    });

    const [currentTab, setCurrentTab] = useState(1);
    const [currentImgType, setCurrentImgType] = useState("logo");
    const [modalOpen, setModalOpen] = useState(false);
    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    const handleFollow = () => {
        post(route("stores.follow", store.id));
    };

    const updateImage = (imgSrc) => {
        setData(currentImgType, imgSrc);
        setModalOpen(false);
    };

    const updateSlug = (imgSlug) => {
        setData("bannerSlug", imgSlug);
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

    useEffect(() => {
        if (data.subBanner) {
            post(route("store.storeSubBanner"), { preserveScroll: true });
        }
    }, [data.subBanner]);

    const handleDeleteSubBanner = (subBannerId) => {
        destroy(route("store.deleteSubBanner", { id: subBannerId }), {
            preserveScroll: true,
        });
    };

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
            <ModalImg
                confirmingLogo={modalOpen && currentImgType === "subBanner"}
                slugState={updateSlug}
                update={updateImage}
                closeModal={() => setModalOpen(false)}
                imgType="subBanner"
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
                {auth.store && store.id === auth.store.id ? (
                    store.banner ? (
                        <button
                            onClick={() => {
                                setCurrentImgType("banner");
                                setModalOpen(true);
                            }}
                            className="rounded-2xl overflow-hidden relative w-full"
                        >
                            <img
                                src={store.banner}
                                alt="banner"
                                className="rounded-lg cursor-pointer w-full"
                            />
                            <div className="absolute group top-0 flex items-center justify-center w-full h-full">
                                <div className="flex group-hover:scale-105 bg-white px-8 pt-2 pb-3 rounded-full transition-all flex-col items-center justify-center">
                                    <LuUploadCloud
                                        size={30}
                                        className="text-gray-600"
                                    />
                                    <p>Banner Güncelle için İçin Tıklayın</p>
                                </div>
                            </div>
                        </button>
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
                    )
                ) : (
                    store.banner && (
                        <img
                            src={store.banner}
                            alt="banner"
                            className="rounded-lg cursor-pointer w-full"
                        />
                    )
                )}
                {store.banner ? (
                    <div className="px-2 flex mt-3 rounded-t-lg">
                        {store.logo ? (
                            <>
                                <div className="relative w-[120px] h-[120px] mr-3 bg-white">
                                    <div className="absolute -top-14">
                                        <img
                                            src={store.logo}
                                            alt="Avatar"
                                            className="w-[120px] h-[120px] rounded-full border-4 border-white bg-white object-contain"
                                        />
                                    </div>
                                    {auth.store &&
                                        store.id === auth.store.id && (
                                            <button
                                                onClick={handleFollow}
                                                className="text-white bg-blue-500 border-2 border-transparent hover:border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:text-blue-500 focus:ring-0 hover:bg-white focus:ring-offset-0 transition ease-in-out"
                                            >
                                                {isFollower
                                                    ? "Takipten Çık"
                                                    : "Takip Et"}
                                            </button>
                                        )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-3xl font-black text-gray-800 mr-2">
                                            {store.store_name}
                                        </p>
                                        {(auth.store &&
                                            store.id === auth.store.id) || (
                                            <button
                                                onClick={handleFollow}
                                                className="text-white bg-blue-500 border-2 border-transparent hover:border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:text-blue-500 focus:ring-0 hover:bg-white focus:ring-offset-0 transition ease-in-out"
                                            >
                                                {isFollower
                                                    ? "Takipten Çık"
                                                    : "Takip Et"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex mt-3 gap-2 items-center">
                                        <p className="font-bold bg-green-500 text-xs py-0.5 px-2 rounded text-white">
                                            {store.store_rating
                                                ? store.store_rating
                                                : 0}
                                        </p>
                                        <p className="text-blue-600 text-sm font-bold">
                                            {totalFollowers} Takipçi •{" "}
                                            {productCount} ürün
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative mb-9 w-[120px] h-[120px] mr-3 bg-white">
                                    <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center border-2 border-gray-300 bg-white object-contain">
                                        <BiStoreAlt className="w-[60%] h-[60%] text-gray-300" />
                                    </div>
                                    {auth.store &&
                                        store.id === auth.store.id && (
                                            <button
                                                className="text-white rounded-full absolute w-7 h-7 flex justify-center items-center bg-blue-500 hover:bg-blue-600 transition bottom-0 right-2"
                                                onClick={() => {
                                                    setModalOpen(true);
                                                    setCurrentImgType("logo");
                                                }}
                                            >
                                                <FaPen size={12} />
                                            </button>
                                        )}
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center gap-2">
                                        <p className="text-3xl font-black text-gray-800 mr-2">
                                            {store.store_name}
                                        </p>
                                        {(auth.store &&
                                            store.id === auth.store.id) || (
                                            <button
                                                onClick={handleFollow}
                                                className="text-white bg-blue-500 border-2 border-transparent hover:border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:text-blue-500 focus:ring-0 hover:bg-white focus:ring-offset-0 transition ease-in-out"
                                            >
                                                {isFollower
                                                    ? "Takipten Çık"
                                                    : "Takip Et"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex mt-3 gap-2 items-center">
                                        <p className="font-bold bg-green-500 text-xs py-0.5 px-2 rounded text-white">
                                            {store.store_rating
                                                ? store.store_rating
                                                : 0}
                                        </p>
                                        <p className="text-blue-600 text-sm font-bold">
                                            {totalFollowers} Takipçi •{" "}
                                            {productCount} ürün
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="px-2 flex items-center mb-8 mt-6 rounded-t-lg">
                        <div className="relative w-[120px] h-[120px] mr-5 bg-white">
                            {store.logo ? (
                                <div className="">
                                    <img
                                        src={store.logo}
                                        alt="Avatar"
                                        className="w-[120px] h-[120px] rounded-full border-4 border-white bg-white object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center border-2 border-gray-300 bg-white object-contain">
                                    <BiStoreAlt className="w-[60%] h-[60%] text-gray-300" />
                                </div>
                            )}
                            {auth.store && store.id === auth.store.id && (
                                <button
                                    onClick={handleFollow}
                                    className="text-white bg-blue-500 border-2 border-transparent hover:border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:text-blue-500 focus:ring-0 hover:bg-white focus:ring-offset-0 transition ease-in-out"
                                >
                                    {isFollower ? "Takipten Çık" : "Takip Et"}
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-black text-gray-800 mr-2">
                                    {store.store_name}
                                </p>
                                {(auth.store && store.id === auth.store.id) || (
                                    <button
                                        onClick={handleFollow}
                                        className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-1.5 rounded-md font-bold text-xs tracking-widest hover:bg-blue-500 focus:ring-2 hover:text-white focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out"
                                    >
                                        {isFollower
                                            ? "Takipten Çık"
                                            : "Takip Et"}
                                    </button>
                                )}
                            </div>
                            <div className="flex mt-3 gap-2 items-center">
                                <p className="font-bold bg-green-500 text-xs py-0.5 px-2 rounded text-white">
                                    {store.store_rating
                                        ? store.store_rating
                                        : 0}
                                </p>
                                <p className="text-blue-600 text-sm font-bold">
                                    {totalFollowers} Takipçi • {productCount}{" "}
                                    ürün
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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

                <div className="flex bg-gray-200 border-none ml-3 w-[40%] rounded-md">
                    <div className="flex items-center justify-center rounded-s-md px-2 bg-blue-500 transition hover:bg-blue-600">
                        <IoIosSearch className="text-2xl text-white" />
                    </div>
                    <input
                        type="text"
                        className="focus:ring-0 text-sm p-1 focus:ring-transparent transition border-2 rounded-e-md border-transparent focus:bg-gray-100 focus:border-2  focus:border-blue-500 bg-gray-200 w-full"
                        placeholder="Aradığınız ürün yazınız"
                    />
                </div>
            </div>

            <div className="min-h-[10rem] py-3">
                {currentTab === 1 && (
                    <div>
                        {auth.store && store.id === auth.store.id ? (
                            <div className="gap-6 mb-6 grid grid-cols-2">
                                {store.sub_banners.map((subBanner, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl relative overflow-hidden"
                                    >
                                        <img
                                            src={subBanner.img}
                                            alt=""
                                            className="rounded-2xl transition-transform cursor-pointer object-contain hover:scale-105"
                                        />
                                        <div className="absolute flex gap-2 right-4 bottom-3">
                                            <button
                                                className="text-white rounded-full w-9 h-9 flex justify-center items-center bg-red-500 hover:bg-red-600 transition"
                                                onClick={() =>
                                                    handleDeleteSubBanner(
                                                        subBanner.id
                                                    )
                                                }
                                            >
                                                <MdDelete size={17} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {store.sub_banners.length < 6 && (
                                    <div className="flex items-center justify-center w-full">
                                        <button
                                            onClick={() => {
                                                setCurrentImgType("subBanner");
                                                setModalOpen(true);
                                            }}
                                            className="flex flex-col h-[294px] items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <LuUploadCloud
                                                    size={30}
                                                    className="mb-1"
                                                />
                                                <p>Yeni Banner Ekleyin</p>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="gap-6 mb-6 flex items-center justify-center flex-wrap">
                                {store.sub_banners.map((subBanner, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl w-[49%] overflow-hidden"
                                    >
                                        <img
                                            src={subBanner.img}
                                            alt=""
                                            className="rounded-2xl transition-transform cursor-pointer object-contain hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
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
                        <div className="flex gap-5">
                            <div>
                                {(categorySubMain.length > 0 ||
                                    attributesMain.length > 0) && (
                                    <StoreFilterTab
                                        attributesMain={attributesMain}
                                        categorySubMain={categorySub}
                                        categorySlug={store.slug}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                {productsFilter.length > 0 && (
                                    <ProductContainer
                                        products={productsFilter}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 3 && <div>tab 3</div>}
            </div>
        </HomeLayout>
    );
}
