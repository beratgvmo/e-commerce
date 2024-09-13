import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import RenderStars from "@/Components/RenderStars";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome, FaRegStar } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineInfo } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import ProductSwiper from "@/Components/ProductSwiper";
import PriceText from "@/Components/PriceText";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import {
    TbBasketPlus,
    TbClockExclamation,
    TbMessage2,
    TbMessage2Question,
    TbMessage2Search,
} from "react-icons/tb";

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
    cart,
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
        } else {
            setCurrentIndex(0);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(product.images.length - 1);
        }
    };

    const switchTab = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    return (
        <HomeLayout auth={auth} categories={categories} cart={cart}>
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
                <div className="relative  flex justify-between items-center">
                    <button
                        onClick={prevImage}
                        className="absolute left-2 flex items-center justify-center w-12 h-12 text-3xl text-gray-500 bg-gray-100 rounded-full cursor-pointer shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:bg-gray-300 duration-300 z-10"
                    >
                        <IoIosArrowBack />
                    </button>
                    <div>
                        <img
                            src={product.images[currentIndex].img}
                            alt="Product Image"
                            className="min-w-[34rem] h-[42rem] object-contain rounded-md border border-gray-300"
                        />

                        <div className="flex gap-5 overflow-hidden mt-3 justify-center">
                            {product.images.map((image, index) =>
                                image.img ===
                                product.images[currentIndex].img ? (
                                    <img
                                        key={index}
                                        src={image.img}
                                        alt="Product Image"
                                        className="w-14 h-16 object-contain border-2 rounded-lg border-blue-500"
                                    />
                                ) : (
                                    <img
                                        key={index}
                                        src={image.img}
                                        alt="Product Image"
                                        onClick={() => setCurrentIndex(index)}
                                        className="w-14 h-16 object-contain border rounded-lg cursor-pointer"
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 flex items-center justify-center w-12 h-12 text-3xl text-gray-500 bg-gray-100 rounded-full cursor-pointer shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:bg-gray-300 duration-300 z-10 "
                    >
                        <IoIosArrowForward />
                    </button>
                </div>

                <div className="w-full px-6  rounded-e-md">
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                    <div className="mt-3 flex items-center">
                        <div className="flex items-center mr-3">
                            {product.rating > 0 ? (
                                <>
                                    <p className="mr-1 bg-blue-600/15 text-sm text-center font-semibold w-8 rounded-md">
                                        {product.rating},0
                                    </p>
                                    <RenderStars
                                        count={product.rating}
                                        size="large"
                                    />
                                </>
                            ) : (
                                <p className="mr-1 text-sm flex items-center gap-1">
                                    <FaRegStar className="text-yellow-400" />{" "}
                                    Henüz değerlendirilmemiş
                                </p>
                            )}
                        </div>
                        {totalReviews > 0 ? (
                            <p className="text-sm font-medium text-blue-500">
                                <span className="text-blue-600 font-semibold">
                                    {totalReviews}
                                </span>{" "}
                                Değerlendirme
                            </p>
                        ) : (
                            <p className="text-sm font-medium text-blue-500 flex items-center gap-1">
                                İlk sen değerlendir
                                <TbMessage2 />
                            </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <div className="flex gap-2">
                            <Link
                                href={`/magaza/${store.slug}`}
                                className="flex items-center gap-2 border p-1.5 rounded-md"
                            >
                                <p className="text-indigo-400 text-sm font-bold">
                                    <span className="text-gray-400">
                                        Satıcı:
                                    </span>{" "}
                                    {store.store_name}
                                </p>
                                <p className="bg-blue-600/15 text-sm text-center font-semibold w-8 rounded-md">
                                    {
                                        (store.store_rating
                                            ? store.store_rating
                                            : 0,
                                        0)
                                    }
                                </p>
                                <IoIosArrowForward />
                            </Link>
                            <div className="border p-1.5 rounded-md text-gray-700 text-sm font-semibold">
                                Takip et
                            </div>
                            <div className="border flex gap-1 items-center p-1.5 rounded-md text-gray-700 text-sm font-semibold">
                                <TbMessage2Question /> Satıcıya sor
                            </div>
                        </div>
                        {product.price != product.discounted_price ? (
                            <div className="flex items-center gap-4 mt-6">
                                <p className="text-slate-800 text-3xl font-black">
                                    <PriceText
                                        value={product.discounted_price}
                                    />
                                </p>
                                <PriceText
                                    value={product.price}
                                    className="line-through text-lg font-normal text-gray-400"
                                />
                            </div>
                        ) : (
                            <p className="text-slate-800 text-3xl font-black mt-6">
                                <PriceText value={product.price} />
                            </p>
                        )}
                    </div>
                    {product.stock_quantity <= 10 && (
                        <div className="flex justify-center items-center mt-3 gap-1 text-red-600 font-semibold w-24 rounded-md text-xs h-6 bottom-0 bg-red-200/50">
                            <TbClockExclamation size={16} /> son{" "}
                            {product.stock_quantity} ürün!
                        </div>
                    )}
                    <div className="mt-4">
                        <form onSubmit={addToCart}>
                            <button
                                type="submit"
                                className={`flex items-center justify-center gap-2 text-white font-bold text-lg px-8 py-3 mt-1 w-full rounded-md transition-all duration-200 ${
                                    isAddedToCart
                                        ? "bg-green-500"
                                        : "bg-blue-500 hover:bg-blue-700"
                                }`}
                            >
                                <TbBasketPlus size={25} />
                                {isAddedToCart
                                    ? "Sepete Eklendi"
                                    : "Sepete Ekle"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="border border-gray-300 rounded-lg">
                    <div className="flex w-full justify-between rounded-t-lg">
                        <button
                            onClick={() => switchTab(1)}
                            className={`relative py-3 w-full font-medium border-b ${
                                currentTab === 1
                                    ? "text-gray-900"
                                    : "text-gray-400"
                            }`}
                        >
                            Ürün Açıklaması
                            <div
                                className={`w-full h-[3px] absolute bottom-0 rounded-t-[3px] bg-blue-500 ${
                                    currentTab === 1 ? "block" : "hidden"
                                }`}
                            />
                        </button>

                        <button
                            onClick={() => switchTab(2)}
                            className={`relative py-3 w-full font-medium border-b ${
                                currentTab === 2
                                    ? "text-gray-900"
                                    : "text-gray-400"
                            }`}
                        >
                            Değerlendirmeler ({totalReviews})
                            <div
                                className={`w-full h-[3px] absolute bottom-0 rounded-t-[3px] bg-blue-500 ${
                                    currentTab === 2 ? "block" : "hidden"
                                }`}
                            />
                        </button>
                        <button
                            onClick={() => switchTab(3)}
                            className={`relative py-3 w-full font-medium border-b ${
                                currentTab === 3
                                    ? "text-gray-900"
                                    : "text-gray-400"
                            }`}
                        >
                            Soru Cevap
                            <div
                                className={`w-full h-[3px] absolute bottom-0 rounded-t-[3px] bg-blue-500 ${
                                    currentTab === 3 ? "block" : "hidden"
                                }`}
                            />
                        </button>

                        <button
                            onClick={() => switchTab(4)}
                            className={`relative py-3 w-full font-medium border-b ${
                                currentTab === 4
                                    ? "text-gray-900"
                                    : "text-gray-400"
                            }`}
                        >
                            Ürün Özellikleri
                            <div
                                className={`w-full h-[3px] absolute bottom-0 rounded-t-[3px] bg-blue-500 ${
                                    currentTab === 4 ? "block" : "hidden"
                                }`}
                            />
                        </button>
                    </div>

                    <div className="min-h-[10rem] w-full py-3">
                        {currentTab === 1 && (
                            <div className="py-6 px-5 mx-4 w-full">
                                <div
                                    className=" html"
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                ></div>
                            </div>
                        )}

                        {currentTab === 2 && (
                            <div className="px-6">
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
                                    <div className="flex mt-12">
                                        <div className="mr-8 flex justify-center">
                                            <img
                                                src={product.images[0].img}
                                                alt="Product Image"
                                                className="w-auto h-44 object-contain"
                                            />
                                        </div>
                                        <div>
                                            {product.reviews.length > 0 ? (
                                                <div className="flex">
                                                    <div className="flex flex-col justify-center items-center gap-1 mr-16">
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
                                        <div className="mb-3 mt-14">
                                            <div className="flex mt-3 gap-3">
                                                <button className="py-3 px-7 font-semibold rounded-lg text-white flex gap-1 items-center bg-blue-500 hover:bg-blue-600 transition">
                                                    Değerlendir{" "}
                                                    <BiMessageSquareAdd />
                                                </button>
                                                <button className="py-3 px-7 font-semibold rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
                                                    Sepete ekle
                                                </button>
                                            </div>
                                            <div className="mt-3 text-gray-700">
                                                <p className="mb-0.5 text-blue-500 font-medium">
                                                    Yorum Yayınlanma Kriterleri
                                                </p>
                                                <p className="flex gap-1 items-center">
                                                    <MdOutlineInfo />
                                                    Değerlendirme yapabilmek
                                                    için bu ürünü satın almış
                                                    olmalısınız.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {product.reviews.length > 0 && (
                                    <div className="px-4 mt-4">
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
                            <div className="py-6 px-5 mx-4 w-full">
                                <div className="border-b-2 pb-7 mt-4">
                                    <div className="w-[48rem]">
                                        <p className="font-semibold ml-4">
                                            Soru
                                        </p>
                                        <p className="bg-gray-100 text-gray-700 mt-2 p-4 rounded-2xl">
                                            Ürünün yanında flas bellekle kurulum
                                            programlarını gönderiyor musunuz
                                        </p>
                                    </div>
                                    <div className="ml-2 mt-7 w-[48rem]">
                                        <p className="font-semibold ml-4">
                                            Cevap
                                        </p>
                                        <div className="bg-white text-gray-700 mt-2 shadow-[0_2px_10px_#00000014]  p-4 rounded-2xl">
                                            <p>
                                                Merhabalar. İncelemekte
                                                olduğunuz modelimizin kutu
                                                içeriğinde güncel driverları
                                                içeren USB bellek mevcuttur.
                                            </p>
                                            <p className="text-sm mt-3">
                                                <span className="text-blue-500 font-semibold">
                                                    EXCALIBUR
                                                </span>{" "}
                                                satıcısı cevapladı
                                            </p>
                                        </div>

                                        <p className="flex justify-end mt-2 text-sm text-gray-600">
                                            23 Şubat • 9 saat içerisinde
                                            cevapladı
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentTab === 4 && (
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
