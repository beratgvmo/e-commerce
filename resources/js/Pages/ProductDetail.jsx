import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import RenderStars from "@/Components/RenderStars";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineInfo } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function ProductDetail({
    auth,
    categories,
    product,
    categoryHierarchy,
    storeName,
    storeRating,
    storeFollowers,
    attributes,
    attributeTypes,
    ratingPercentages,
    ratingsCount,
}) {
    //  properties, propertyType
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
                                        size="large"
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
                                        {storeName}
                                        <span className="ml-1 bg-emerald-400 py-1 px-2 rounded-md text-white">
                                            {storeRating ? storeRating : 0}
                                        </span>
                                    </p>
                                    <p className="text-xs font-medium mb-1 text-gray-700">
                                        {storeFollowers} Takipçi
                                    </p>
                                </div>
                                <div className="w-full absolute left-3 -bottom-3 flex justify-center">
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

                        <div className="min-h-[10rem] py-3">
                            {currentTab === 1 && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                ></div>
                            )}

                            {currentTab === 2 && (
                                <div>
                                    <div
                                        className={
                                            product.reviews.length > 0 &&
                                            `border-b-2 px-4`
                                        }
                                    >
                                        <div className="flex justify-between">
                                            <p className="w-[70%] font-semibold">
                                                {product.name} Değerlendirmeleri
                                            </p>
                                            {product.reviews.length > 0 || (
                                                <p className="font-semibold">
                                                    Tüm değerlendirmeler (
                                                    {product.reviews.length})
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex mt-6">
                                            <div className="h-52 w-52 mr-16">
                                                {product.images && (
                                                    <img
                                                        src={
                                                            product.images[0]
                                                                .img
                                                        }
                                                        alt="Product Image"
                                                        className="w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                {product.reviews.length > 0 ? (
                                                    <div className="flex">
                                                        <div className="flex flex-col justify-center items-center gap-1 mr-8">
                                                            <p className="text-6xl text-gray-800">
                                                                {product.rating}
                                                            </p>
                                                            <RenderStars
                                                                count={
                                                                    product.rating
                                                                }
                                                                size="very large"
                                                            />
                                                        </div>

                                                        <div>
                                                            {[
                                                                5, 4, 3, 2, 1,
                                                            ].map((rating) => (
                                                                <div
                                                                    key={rating}
                                                                    className="flex items-center mb-0.5 px-2 py-1 hover:bg-gray-100 transition ease-linear rounded-2xl"
                                                                >
                                                                    <p className="flex text font-medium items-center mr-3">
                                                                        <FaStar className="text-yellow-400" />
                                                                        {rating}
                                                                    </p>
                                                                    <div className="w-60 bg-gray-300 rounded-full h-1.5 mr-2">
                                                                        <div
                                                                            className="bg-yellow-400 h-1.5 rounded-full"
                                                                            style={{
                                                                                width: `${ratingPercentages[rating]}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700">
                                                                        {
                                                                            ratingsCount[
                                                                                rating
                                                                            ]
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="">
                                                        <p className="text-xl font-medium mb-2">
                                                            Henüz değerlendirme
                                                            yok
                                                        </p>
                                                        <p className="w-1/2 text-gray-700 text-sm">
                                                            Siz de
                                                            değerlendirmenizle
                                                            katkıda bulunmak
                                                            için ürün satın alın
                                                            ve müşterilerin
                                                            karar vermesine
                                                            yardımcı olmaya ne
                                                            dersiniz?
                                                        </p>
                                                        <div className="flex mt-3 gap-3">
                                                            <button className="py-3 px-7 font-semibold rounded-lg text-white flex gap-1 items-center bg-blue-500 hover:bg-blue-600 transition">
                                                                Değerlendir{" "}
                                                                <BiMessageSquareAdd />
                                                            </button>
                                                            <button className="py-3 px-7 font-semibold rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
                                                                Sepete ekle
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center mt-1 gap-1 text-gray-700">
                                                            <MdOutlineInfo />
                                                            Değerlendirme
                                                            yapabilmek için bu
                                                            ürünü satın almış
                                                            olmalısınız.
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>{" "}
                                    {/* Yorumlar */}
                                    {product.reviews.length > 0 &&
                                        product.reviews.map((productCommet) => (
                                            <div
                                                key={productCommet.id}
                                                className="flex m-2 mt-5 mb-16 w-[50rem]"
                                            >
                                                <div>
                                                    <div className="p-2 w-16 h-16 flex justify-center items-center border bg-gray-100 rounded-full mr-7 font-semibold">
                                                        <p>
                                                            {
                                                                productCommet.userName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex mb-1">
                                                    <div className="flex mr-3 mb-2">
                                                        <RenderStars
                                                            count={
                                                                productCommet.rating
                                                            }
                                                        />
                                                        <p className="ml-2">
                                                            {
                                                                productCommet.formatted_created_at
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="border bg-gray-100 w-[600px] p-5 text-sm leading-6 rounded-[16px]">
                                                    <p
                                                    // dangerouslySetInnerHTML={{
                                                    //     __html: productCommet.comment.replace(
                                                    //         /\n/g,
                                                    //         "<br>"
                                                    //     ),
                                                    // }}
                                                    >
                                                        {productCommet.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {currentTab === 3 && (
                                <div className="grid grid-cols-2 gap-5 mt-2">
                                    {attributeTypes.map((attributeType) => (
                                        <div
                                            className="flex justify-between bg-gray-100 shadow px-4 py-2 rounded-md"
                                            key={attributeType.id}
                                        >
                                            <p>{attributeType.name}</p>
                                            {attributes
                                                .filter(
                                                    (attribute) =>
                                                        attribute.attribute_type_id ===
                                                        attributeType.id
                                                )
                                                .map((attribute) => (
                                                    <p
                                                        key={attribute.id}
                                                        className="font-ibold"
                                                    >
                                                        {attribute.name}
                                                    </p>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
