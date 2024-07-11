import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import RenderStars from "@/Components/RenderStars";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export default function ProductDetail({
    auth,
    categories,
    product,
    categoryHierarchy,
}) {
    // const ProductDetail = ({ product, productCommets, properties, propertyType }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = () => {
        setIsAddedToCart(!isAddedToCart);
    };

    const nextImage = () => {
        if (product.images.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />
            <div>
                <nav className="flex py-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <div className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <FaHome className="mr-1 text-lg" />
                                <Link href="/">Ana Sayfa</Link>
                            </div>
                        </li>
                        {categoryHierarchy.map((category) => (
                            <li>
                                <div className="flex items-center">
                                    <IoIosArrowForward />
                                    <div className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        <Link href={`/${category.slug}`}>
                                            {category.name}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="flex rounded-md border border-gray-300">
                    <div className="relative group min-w-[34rem] flex justify-between items-center">
                        <button
                            onClick={prevImage}
                            className="absolute left-2 flex items-center justify-center w-14 h-14 text-3xl text-gray-400 bg-gray-200 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:flex hover:bg-gray-300 transition-opacity duration-300 z-10"
                        >
                            <IoIosArrowBack />
                        </button>
                        <div className="flex items-center justify-center h-[42rem] overflow-hidden">
                            {product.images && product.images.length > 0 && (
                                <img
                                    src={product.images[currentIndex].img}
                                    alt="Product Image"
                                    className="w-full h-auto"
                                />
                            )}
                        </div>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 flex items-center justify-center w-14 h-14 text-3xl text-gray-400 bg-gray-200 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:flex hover:bg-gray-300 transition-opacity duration-300 z-10 "
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>

                    <div className="w-full p-6 bg-gray-100 rounded-e-md">
                        <h1 className="text-lg font-semibold">
                            {product.name}
                        </h1>
                        <div className="flex mt-3 items-center justify-between">
                            <p className="text-slate-800 text-3xl font-black mt-4">
                                {product.price} TL
                            </p>
                            <div className="flex flex-col items-end self-center">
                                <div className="flex justify-center items-center mb-1">
                                    <p className="mr-1 ">{product.rating}</p>
                                    <RenderStars
                                        count={product.rating}
                                        size="high"
                                    />
                                </div>
                                <p className="text-xs font-medium text-end">
                                    {product.reviews.length} Değerlendirme
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={addToCart}
                                className={`text-white px-8 py-4 mt-1 w-full rounded-md transition-all duration-200 ${
                                    isAddedToCart
                                        ? "bg-green-500"
                                        : "bg-blue-500 hover:bg-blue-700"
                                }`}
                            >
                                {isAddedToCart
                                    ? "Sepete Eklendi"
                                    : "Sepete Ekle"}
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-1/2 relative mt-4 p-2 px-3 bg-orange-100 border rounded-md">
                                <div>
                                    <p className="text-indigo-400 text-sm font-bold">
                                        Ahmet Giyim{" "}
                                        <span className="bg-emerald-400 py-1 px-2 rounded-md text-white">
                                            8.2
                                        </span>
                                    </p>
                                    <p className="text-xs font-medium mb-1 text-gray-700">
                                        919,3B Takipçi
                                    </p>
                                </div>
                                <div className="w-full absolute left-0 -bottom-3 flex justify-center">
                                    <button className="text-xs border bg-indigo-200 px-3 py-1 hover:bg-indigo-300 transition hover:scale-105 flex items-center rounded-full">
                                        MAĞAZAYA GİT
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2 mt-4 p-2 px-3 border rounded-md">
                                farklı özelik
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="border border-gray-300 rounded-lg">
                        <div className="flex w-full justify-between rounded-t-lg">
                            <button
                                onClick={() => switchTab(1)}
                                className={`py-3 w-full font-medium rounded-tl-lg transition-all duration-300 ${
                                    currentTab === 1
                                        ? "bg-white"
                                        : "bg-neutral-400 text-white"
                                }`}
                            >
                                Ürün Açıklaması
                            </button>
                            <button
                                onClick={() => switchTab(2)}
                                className={`py-3 w-full font-medium transition-all duration-300 ${
                                    currentTab === 2
                                        ? "bg-white"
                                        : "bg-neutral-400 text-white"
                                }`}
                            >
                                Değerlendirmeler (243)
                            </button>
                            <button
                                onClick={() => switchTab(3)}
                                className={`py-3 w-full rounded-tr-lg font-medium transition-all duration-300 ${
                                    currentTab === 3
                                        ? "bg-white"
                                        : "bg-neutral-400 text-white"
                                }`}
                            >
                                Ürün Özellikleri
                            </button>
                        </div>

                        <div className="min-h-[42rem] px-4 py-3">
                            {currentTab === 1 && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                ></div>
                            )}

                            {currentTab === 2 && (
                                <div>
                                    {/* Yorumlar */}
                                    {/* {productCommets.length > 0 ? (
                                        productCommets.map((productCommet) => (
                                            <div
                                                key={productCommet.id}
                                                className="flex m-2 mt-5 mb-16 w-[50rem]"
                                            >
                                                <div>
                                                    <div className="p-2 w-16 h-16 flex justify-center items-center border bg-gray-100 rounded-full mr-7 font-semibold">
                                                        <p>
                                                            {productCommet.userName
                                                                .split(" ")
                                                                .map((name) =>
                                                                    name[0].toUpperCase()
                                                                )
                                                                .join("")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex mb-1">
                                                    <div className="flex mr-3 mb-2">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <div
                                                                    key={i}
                                                                    style={{
                                                                        color:
                                                                            i <
                                                                            productCommet.rating
                                                                                ? "rgb(255, 179, 0)"
                                                                                : "rgb(170, 170, 170)",
                                                                        backgroundColor:
                                                                            "rgba(255, 255, 255)",
                                                                    }}
                                                                >
                                                                    <svg
                                                                        stroke="currentColor"
                                                                        fill="currentColor"
                                                                        strokeWidth="0"
                                                                        viewBox="0 0 576 512"
                                                                        height="20px"
                                                                        width="18px"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                                    </svg>
                                                                </div>
                                                            )
                                                        )}
                                                        <p className="ml-2">
                                                            {
                                                                productCommet.formatted_created_at
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="border bg-gray-100 p-5 text-sm leading-6 rounded-[16px]">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: productCommet.comment.replace(
                                                                /\n/g,
                                                                "<br>"
                                                            ),
                                                        }}
                                                    ></p>
                                                </div>
                                            </div>
                                        ))
                                    ) : ( */}
                                    <div className="flex justify-center mt-3 mx-5">
                                        <div className="text-center w-full p-6 px-28 bg-yellow-200 rounded text-lg font-semibold text-gray-800">
                                            Henüz değerlendirme yok
                                        </div>
                                    </div>
                                    {/* )} */}
                                </div>
                            )}

                            {currentTab === 3 && (
                                <div>
                                    {/* {properties.map((property, index) => (
                                        <div key={index} className="flex">
                                            <p className="text-lg font-medium mr-2">
                                                {property[propertyType]}
                                            </p>
                                            <p className="text-lg">
                                                {property.value}
                                            </p>
                                        </div>
                                    ))} */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
