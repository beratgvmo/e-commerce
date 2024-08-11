import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import RenderStars from "@/Components/RenderStars";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineInfo } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import ProductSwiper from "@/Components/ProductSwiper";
import PriceText from "@/Components/PriceText";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";

export default function ProductDetail({
    auth,
    categories,
    product,
    categoryHierarchy,
    store,
    attributes,
    attributeTypes,
    ratingPercentages,
    ratingsCount,
    totalReviews,
    products,
}) {
    const { post } = useForm({
        product_id: product.id,
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = (e) => {
        e.preventDefault();
        setIsAddedToCart(true);
        post(route("user.cartAdd"));
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 300);
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
            <nav className="flex py-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <div className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <FaHome className="mr-1 text-lg" />
                            <Link href="/">Ana Sayfa</Link>
                        </div>
                    </li>
                    {categoryHierarchy.map((category, index) => (
                        <li key={index}>
                            <div className="flex items-center">
                                <IoIosArrowForward />
                                <div className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                    <Link href={`/kategori/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
            <div className="flex">
                <div className="relative group min-w-[34rem] rounded-md border border-gray-300  flex justify-between items-center">
                    <button
                        onClick={prevImage}
                        className="absolute left-2 flex items-center justify-center w-14 h-14 text-3xl text-gray-400 bg-gray-200 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:flex hover:bg-gray-300 transition-opacity duration-300 z-10"
                    >
                        <IoIosArrowBack />
                    </button>
                    <div className="flex items-center justify-center h-[42rem] w-full overflow-hidden">
                        {product.images && product.images.length > 0 && (
                            <img
                                src={product.images[currentIndex].img}
                                alt="Product Image"
                                className="w-auto h-full object-contain "
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

                <div className="w-full px-6  rounded-e-md">
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                    <div className="flex mt-3 items-center justify-between">
                        <p className="text-slate-800 text-3xl font-black mt-4">
                            <PriceText value={product.price} />
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
                                {totalReviews} Değerlendirme
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={addToCart}>
                            <button
                                type="submit"
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
                        </form>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-1/2 relative mt-4 p-2 px-3 bg-orange-100 border rounded-md">
                            <div>
                                <p className="text-indigo-400 text-sm font-bold">
                                    {store.store_name}
                                    <span className="ml-1 bg-green-500 py-1 px-2 rounded-md text-white">
                                        {store.store_rating
                                            ? store.store_rating
                                            : 0}
                                    </span>
                                </p>
                                <p className="text-xs font-medium mb-1 text-gray-700">
                                    {store.followers_count} Takipçi
                                </p>
                            </div>
                            <div className="w-full absolute left-3 -bottom-3 flex justify-center">
                                <Link
                                    href={`/magaza/${store.slug}`}
                                    className="text-xs border bg-indigo-200 px-3 py-1 hover:bg-indigo-300 transition hover:scale-105 flex items-center rounded-full"
                                >
                                    MAĞAZAYA GİT
                                    <IoIosArrowForward />
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 mt-4 p-2 px-3 border bg-orange-100 rounded-md">
                            <p className="text-sm">
                                <span className="font-semibold">
                                    Tahmini Kargoya Teslim
                                </span>
                                : 3 gün içinde
                            </p>
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
                            Değerlendirmeler ({totalReviews})
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

                    <div className="min-h-[10rem] w-full py-3">
                        {currentTab === 1 && (
                            <div className="px-4 mx-4 w-full">
                                <div
                                    className=" html"
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                ></div>
                            </div>
                        )}

                        {currentTab === 2 && (
                            <div>
                                <div
                                    className={`px-6 mt-2 ${
                                        product.reviews.length > 0 &&
                                        "border-b-2"
                                    }`}
                                >
                                    <div className="flex justify-between">
                                        <p className="w-[70%] font-semibold">
                                            {product.name} Değerlendirmeleri
                                        </p>
                                        {product.reviews.length > 0 && (
                                            <p className="font-semibold">
                                                Tüm değerlendirmeler (
                                                {product.reviews.length})
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex mt-6">
                                        <div className="mr-16 flex justify-center">
                                            <div className="h-52 w-52 ">
                                                <img
                                                    src={product.images[0].img}
                                                    alt="Product Image"
                                                    className="w-auto h-full object-contain rounded-md"
                                                />
                                            </div>
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
                                                        {[5, 4, 3, 2, 1].map(
                                                            (rating) => (
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
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <p className="text-xl font-medium mb-2">
                                                        Henüz değerlendirme yok
                                                    </p>
                                                    <p className="w-1/2 text-gray-700 text-sm">
                                                        Siz de
                                                        değerlendirmenizle
                                                        katkıda bulunmak için
                                                        ürün satın alın ve
                                                        müşterilerin karar
                                                        vermesine yardımcı
                                                        olmaya ne dersiniz?
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
                                                        Değerlendirme yapabilmek
                                                        için bu ürünü satın
                                                        almış olmalısınız.
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {product.reviews.length > 0 && (
                                        <div className="mb-3">
                                            <div className="flex mt-3 gap-3">
                                                <button className="py-3 px-7 font-semibold rounded-lg text-white flex gap-1 items-center bg-blue-500 hover:bg-blue-600 transition">
                                                    Değerlendir{" "}
                                                    <BiMessageSquareAdd />
                                                </button>
                                                <button className="py-3 px-7 font-semibold rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
                                                    Sepete ekle
                                                </button>
                                            </div>
                                            <div className="flex items-center mt-2 gap-1 text-gray-700">
                                                <MdOutlineInfo />
                                                Değerlendirme yapabilmek için bu
                                                ürünü satın almış olmalısınız.
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="px-4 mt-5">
                                    {/* <div className="flex">
                                        <div className="flex px-3 py-1 items-center border rounded-full">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <p className="mr-1">
                                                5 Çok İyi (200)
                                            </p>
                                            <RiAddLargeFill />
                                        </div>
                                        <div className="flex px-3 py-1 items-center border rounded-full">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <p className="mr-1">
                                                5 Çok İyi (200)
                                            </p>
                                            <RiAddLargeFill />
                                        </div>
                                    </div> */}
                                </div>
                                {product.reviews.length > 0 && (
                                    <div className="px-4">
                                        <p className="text-gray-700 text-sm font-semibold">
                                            Bu ürün ile ilgili 244 değerlendirme
                                            var.
                                        </p>
                                        {product.reviews.map(
                                            (productCommet) => (
                                                <div
                                                    key={productCommet.id}
                                                    className="flex m-2 mt-5 mb-16 w-[50rem]"
                                                >
                                                    <div>
                                                        <div className="p-2 w-16 h-16 flex justify-center items-center border bg-gray-100 rounded-full mr-7 font-semibold">
                                                            <p>
                                                                {productCommet.user_name
                                                                    .split(" ")
                                                                    .map(
                                                                        (
                                                                            name
                                                                        ) =>
                                                                            name[0].toUpperCase()
                                                                    )
                                                                    .join("")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center mb-3">
                                                            <RenderStars
                                                                count={
                                                                    productCommet.rating
                                                                }
                                                            />
                                                            <p className="ml-2 text-gray-600 text-sm">
                                                                {
                                                                    productCommet.formatted_created_at
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="border bg-gray-100 w-[600px] py-3 px-5 text-sm leading-6 rounded-[16px]">
                                                            <p>
                                                                {
                                                                    productCommet.comment
                                                                }
                                                            </p>
                                                            <p className="border-t mt-3 mb-1 pt-1 text-xs">
                                                                Kullanıcı bu
                                                                ürünü Monster
                                                                Notebook
                                                                satıcısından
                                                                aldı.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {currentTab === 3 && (
                            <div className="grid grid-cols-2 gap-5 mt-2 px-4">
                                {attributeTypes.map((attributeType) =>
                                    attributes
                                        .filter(
                                            (attribute) =>
                                                attribute.attribute_type_id ===
                                                attributeType.id
                                        )
                                        .map((attribute) => (
                                            <div
                                                className="flex justify-between bg-gray-100 shadow px-4 py-2 rounded-md"
                                                key={attribute.id} // Key should be unique for each element in the map function
                                            >
                                                <p>{attributeType.name}</p>
                                                <p className="font-bold">
                                                    {attribute.name}
                                                </p>
                                            </div>
                                        ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="my-7">
                <p className="text-xl font-bold">Benzer Ürünler</p>
                <ProductSwiper
                    products={products}
                    classNamebutton="after:!text-[35px]"
                />
            </div>
        </HomeLayout>
    );
}
