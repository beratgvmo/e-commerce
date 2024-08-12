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
import { cities } from "@/data/cities";
import Button from "@/Components/Button";
import OutlineButton from "@/Components/OutlineButton";
import Checkbox from "@/Components/Checkbox";

export default function Payment({ auth }) {
    const [backface, setBackface] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, setData, errors, post } = useForm({
        iban_no: "",
        name: "",
        expire: "",
        cvv: "",
        first_name: "",
        last_name: "",
        phone_number: "05",
        city: "",
        address: "",
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
                        <p className="text-blue-600 font-medium">
                            Kayıtlı adres (Değiştir için tıkla)
                        </p>
                        <div className="border flex justify-between items-center w-full rounded-lg p-2 mt-3 mb-5">
                            <div className="flex items-center">
                                <Checkbox className="rounded-full w-6 h-6 ml-2 mr-5" />
                                <div className="">
                                    <p className="text-lg font-medium">
                                        Berat Güven
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        İştanbul | 0511 1111 11 11
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center text-indigo-600 bg-indigo-600/15 px-3 py-2 rounded-md">
                                <TbMapPin className="mr-1.5" size={20} />
                                <p>Kayıtlı adresi</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleDrawer}
                            className="px-4 w-52 py-1 flex items-center text-left border-blue-500 border text-blue-500 rounded-md"
                        >
                            <IoAddCircleOutline className="mr-1.5" />
                            farkli adresi ekle
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
                                className={`fixed top-0 right-0 w-[28rem] bg-white h-full shadow-lg transition-transform ${
                                    isDrawerOpen
                                        ? "translate-x-0"
                                        : "translate-x-full"
                                }`}
                            >
                                <div className="px-10 py-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">
                                            Adres Ekle
                                        </h2>
                                        <button
                                            type="button"
                                            className="rounded-full p-2 inline-flex items-center justify-center text-black bg-gray-200 hover:text-gray-700 hover:bg-gray-300 focus:outline-none transition"
                                            onClick={toggleDrawer}
                                        >
                                            <TbX size={25} />
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-blue-500 mb-5 w-full border-b-2">
                                            Kisisel Bilgileriniz
                                        </p>
                                        <InputLabel value="Teslim alacak kişinin bilgileri" />
                                        <div className="flex gap-3">
                                            <div>
                                                <TextInput
                                                    id="ad"
                                                    type="text"
                                                    name="ad"
                                                    // value={data.ad}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    placeholder="Ad"
                                                    isFocused={true}
                                                    // onChange={(e) =>
                                                    //     setData(
                                                    //         "ad",
                                                    //         e.target.value
                                                    //     )
                                                    // }
                                                />
                                                <InputError
                                                    // message={errors.ad}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    id="ad"
                                                    type="text"
                                                    name="ad"
                                                    // value={data.ad}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    placeholder="Soyad"
                                                    isFocused={true}
                                                    // onChange={(e) =>
                                                    //     setData(
                                                    //         "ad",
                                                    //         e.target.value
                                                    //     )
                                                    // }
                                                />
                                                <InputError
                                                    // message={errors.ad}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="phone_number"
                                                value="Telefon"
                                            />
                                            <InputMask
                                                mask="0599 999 99 99"
                                                // value={data.phone_number}
                                                placeholder="05"
                                                // onChange={(e) =>
                                                //     setData(
                                                //         "phone_number",
                                                //         e.target.value
                                                //     )
                                                // }
                                            >
                                                {(inputProps) => (
                                                    <TextInput
                                                        {...inputProps}
                                                        id="phone_number"
                                                        name="phone_number"
                                                        className="mt-1 block w-full"
                                                        autoComplete="phone_number"
                                                        required
                                                    />
                                                )}
                                            </InputMask>
                                            <InputError
                                                // message={errors.phone_number}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-blue-500 mb-5 w-full border-b-2">
                                            Adres Bilgileriniz
                                        </p>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="city"
                                                value="Şehir"
                                            />
                                            <select
                                                id="city"
                                                name="city"
                                                // value={data.city}
                                                className="w-full border-gray-300 focus:border-indigo-500 mt-1 focus:ring-indigo-500 rounded-md shadow-sm"
                                                // onChange={(e) =>
                                                //     setData(
                                                //         "city",
                                                //         e.target.value
                                                //     )
                                                // }
                                                required
                                            >
                                                <option value="">
                                                    Seçiniz
                                                </option>
                                                {cities.map((city) => (
                                                    <option
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                // message={errors.city}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="address"
                                                value="Adres"
                                            />

                                            <textarea
                                                id="address"
                                                rows="6"
                                                maxlength="255"
                                                className="block mt-1 resize-none p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                name="address"
                                                // value={data.address}
                                                autoComplete="address"
                                                // onChange={(e) =>
                                                //     setData(
                                                //         "address",
                                                //         e.target.value
                                                //     )
                                                // }
                                                required
                                                placeholder="mahalle, cadde, sokak, mevki, apartman numarası / daire numarası, İlçe/İl. Seklide"
                                            ></textarea>
                                            <InputError
                                                // message={errors.address}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-between mt-8">
                                        <Button className="!text-sm w-full flex justify-center">
                                            Adresi kullan
                                        </Button>
                                        <OutlineButton
                                            onClick={toggleDrawer}
                                            className="!text-sm w-full flex justify-center"
                                        >
                                            Vazgeç
                                        </OutlineButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg font-medium mt-5 mb-3">
                        Kart Bilgileri
                    </p>
                    <div className="flex w-full mt-6 justify-between border rounded-lg p-6">
                        <div className="w-96">
                            <div className="w-full mt-1">
                                <InputLabel
                                    htmlFor="iban_no"
                                    value="Kart Numarası"
                                />
                                <InputMask
                                    mask="9999 9999 9999 9999"
                                    value={data.iban_no}
                                    onChange={handleInputChange}
                                    placeholder="**** **** **** ****"
                                >
                                    {(inputProps) => (
                                        <TextInput
                                            {...inputProps}
                                            name="iban_no"
                                            className="w-full mt-1 px-2 border rounded"
                                        />
                                    )}
                                </InputMask>
                                <InputError
                                    message={errors.iban_no}
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
                                    {data.iban_no || "0000 0000 0000 0000"}
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
