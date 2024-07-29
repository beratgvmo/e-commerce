import React, { useState } from "react";
import InputMask from "react-input-mask";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import HomeLayout from "@/Layouts/HomeLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Payment({ auth }) {
    const [backface, setBackface] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, setData, errors } = useForm({
        number: "",
        name: "",
        expire: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            // Allow only alphabetical characters for the name field
            const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
            setData((prevCard) => ({ ...prevCard, [name]: filteredValue }));
        } else {
            // For other fields, just update the value directly
            setData((prevCard) => ({ ...prevCard, [name]: value }));
        }
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <HomeLayout auth={auth}>
            <div className="flex gap-6 justify-between overflow-hidden">
                <div className="w-full mt-6">
                    <div>
                        <p>Teslimat adresi</p>
                        <button
                            onClick={openDrawer}
                            className="p-4 bg-blue-500 text-white rounded-md"
                        >
                            Drawer'ı Aç
                        </button>
                        <div
                            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
                                isDrawerOpen ? "opacity-100" : "opacity-0"
                            } ${
                                isDrawerOpen
                                    ? "pointer-events-auto"
                                    : "pointer-events-none"
                            }`}
                        >
                            <div
                                className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transition-transform ${
                                    isDrawerOpen
                                        ? "translate-x-0"
                                        : "translate-x-full"
                                }`}
                            >
                                <button
                                    onClick={closeDrawer}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">
                                        Drawer Başlığı
                                    </h2>
                                    <p className="mt-2">
                                        Drawer içeriği buraya gelecek.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-between border rounded-lg p-6">
                        <div className="w-96">
                            <div className="w-full mt-1">
                                <InputLabel
                                    htmlFor="phone_number"
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
                        <div className={`card ${backface ? "flip" : ""}`}>
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
                                <div className="card-back bg-white rounded-2xl">
                                    CVV{" "}
                                    <p className="mr-3 ml-2">
                                        {data.cvv || "000"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-64 mt-6">
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
