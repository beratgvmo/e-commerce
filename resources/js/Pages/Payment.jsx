import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import HomeLayout from "@/Layouts/HomeLayout";
import { Link, useForm } from "@inertiajs/react";
import { FaTimes } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbCheck, TbMapPin, TbX } from "react-icons/tb";

export default function Payment({ auth }) {
    const [backface, setBackface] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, setData, errors } = useForm({
        number: "",
        name: "",
        expire: "",
        cvv: "",
    });

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const filters = {
            name: (val) => val.replace(/[^A-Za-zÜĞİŞÖÇüğışöç\s]/g, ""),
            default: (val) => val,
        };

        const filteredValue = filters[name]
            ? filters[name](value)
            : filters.default(value);

        setData((prevCard) => ({ ...prevCard, [name]: filteredValue }));
    };

    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

    return (
        <HomeLayout auth={auth}>
            <div className="flex gap-6 justify-between">
                <div className="w-full">
                    <p className="text-lg font-medium mt-8 mb-4">
                        Teslimat adresi
                    </p>
                    <div className="border rounded-lg p-6">
                        <div className="flex">
                            <button className="px-4 w-52 py-1 flex items-center text-left bg-blue-500  text-white font-medium rounded-md">
                                <TbMapPin className="mr-1.5" />
                                Kayıtlı adresi kullan
                            </button>
                            <TbCheck
                                className="text-green-600 ml-2"
                                size={26}
                            />
                        </div>
                        <div className="border flex flex-col w-max rounded-lg p-2 mt-3 mb-5">
                            <p>İştanbul | 0511 1111 11 11</p>
                            <p>mahalle, cadde, sokak, mevki, apartman</p>
                            <p>numarası / daire numarası, İlçe/İl</p>
                        </div>
                        <button
                            onClick={toggleDrawer}
                            className="px-4 w-52 py-1 flex items-center text-left border-blue-500 border text-blue-500 rounded-md"
                        >
                            <IoAddCircleOutline className="mr-1.5" />
                            Yeni adresi ekle
                        </button>
                        <div
                            className={`fixed inset-0 bg-black z-50 bg-opacity-50 transition-opacity ${
                                isDrawerOpen ? "opacity-100" : "opacity-0"
                            } ${
                                isDrawerOpen
                                    ? "pointer-events-auto"
                                    : "pointer-events-none"
                            }`}
                        >
                            <div
                                className={`fixed top-0 right-0 w-96 bg-white h-full shadow-lg transition-transform ${
                                    isDrawerOpen
                                        ? "translate-x-0"
                                        : "translate-x-full"
                                }`}
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">
                                            Adres Ekle
                                        </h2>
                                        <button
                                            type="button"
                                            className="rounded-full p-2 inline-flex items-center justify-center text-black bg-gray-200 focus:outline-none transition"
                                            onClick={toggleDrawer}
                                        >
                                            <TbX size={25} />
                                        </button>
                                    </div>
                                    <p className="mt-2">Kis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full mt-6 justify-between border rounded-lg p-6">
                        <div className="w-96">
                            <div className="w-full mt-1">
                                <InputLabel
                                    htmlFor="number"
                                    value="Kart Numarası"
                                />
                                <InputMask
                                    mask="9999 9999 9999 9999"
                                    value={data.number}
                                    onChange={handleInputChange}
                                    placeholder="**** **** **** ****"
                                >
                                    {(inputProps) => (
                                        <TextInput
                                            {...inputProps}
                                            name="number"
                                            className="w-full mt-1 px-2 border rounded"
                                        />
                                    )}
                                </InputMask>
                                <InputError
                                    message={errors.number}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full mt-5">
                                <InputLabel
                                    htmlFor="name"
                                    value="Kart Üzerindeki isim"
                                />
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    placeholder="Kart Sahibinin adı ve soyadı"
                                    className="mt-1 w-full px-2 border rounded"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full mt-5 flex gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="expire"
                                        value="Son kullanma tarihi"
                                    />
                                    <InputMask
                                        mask="99/99"
                                        value={data.expire}
                                        onChange={handleInputChange}
                                        placeholder="Son Kullanma Tarihi"
                                    >
                                        {(inputProps) => (
                                            <TextInput
                                                {...inputProps}
                                                name="expire"
                                                className="mt-1 w-full px-2 border rounded"
                                            />
                                        )}
                                    </InputMask>
                                    <InputError
                                        message={errors.expire}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="cvv"
                                        value="Güvenlik kodu"
                                    />
                                    <InputMask
                                        mask="999"
                                        value={data.cvv}
                                        onChange={handleInputChange}
                                        onFocus={() => setBackface(true)}
                                        onBlur={() => setBackface(false)}
                                        placeholder="CVV"
                                    >
                                        {(inputProps) => (
                                            <TextInput
                                                {...inputProps}
                                                name="cvv"
                                                className="mt-1 w-full px-2 border rounded"
                                            />
                                        )}
                                    </InputMask>
                                    <InputError
                                        message={errors.cvv}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${
                                backface ? "flip" : ""
                            } text-white`}
                        >
                            <div className="front border">
                                <div className="card-number">
                                    {data.number || "0000 0000 0000 0000"}
                                </div>
                                <div className="card-bottom">
                                    <div>
                                        <div className="value">
                                            {data.name || "Kart sahibi"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="value">
                                            {data.expire || "AA/YY"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`back border ${
                                    backface ? "" : "transform rotate-y-180"
                                }`}
                            >
                                <div className="card-back bg-white  text-gray-900 font-bold rounded-2xl">
                                    CVV{" "}
                                    <p className="mr-3 ml-2">
                                        {data.cvv || "000"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-64 mt-[74px]">
                    <div className="w-full sticky top-[20px]">
                        <div className="rounded-lg shadow-md bg-white px-4 py-2 border-2 border-gray-200">
                            <p className="text-sm font-semibold text-blue-500 mb-3 mt-2">
                                ÖDENECEK TUTAR
                            </p>
                            <div className="flex text-sm justify-between">
                                <p className="text-2xl font-semibold">
                                    30.500,00 TL
                                </p>
                            </div>
                            <Link
                                href={route("user.payment")}
                                className="items-center px-4 bg-blue-500 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full py-3 shadow-md my-4 text-xs flex justify-center"
                            >
                                Siparişi onayla
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
        </HomeLayout>
    );
}
