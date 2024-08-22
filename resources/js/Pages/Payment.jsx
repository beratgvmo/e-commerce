import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { FaTimes } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbCheck, TbMapPin, TbX } from "react-icons/tb";
import { cities } from "@/data/cities";
import Button from "@/Components/Button";
import OutlineButton from "@/Components/OutlineButton";
import ProductContainer from "@/Components/ProductContainer";
import { FaTruck } from "react-icons/fa";
import PriceText from "@/Components/PriceText";
import RadioButton from "@/Components/RadioButton";
import { MdOutlineInfo } from "react-icons/md";

export default function Payment({
    auth,
    carts,
    products,
    totalPriceAll,
    totalShippingCost,
    grandTotalPrice,
    addressList,
}) {
    const [backface, setBackface] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, setData, errors, post } = useForm({
        iban_no: "",
        cardName: "",
        cardExpire: "",
        cardCvv: "",
        first_name: "",
        last_name: "",
        phone_number: "05",
        city: "",
        address: "",
        address_name: "",
        redio: `${addressList[0].id}`,
    });

    const addressSave = (e) => {
        e.preventDefault();
        post(route("user.addresses"), { preserveScroll: true });
        addressCancel();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("user.productOrder"), { preserveScroll: true });
    };

    const addressCancel = () => {
        setData("first_name", "");
        setData("last_name", "");
        setData("phone_number", "05");
        setData("city", "");
        setData("address", "");
        toggleDrawer();
    };

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

    const handleChange = (event) => {
        setData("redio", event.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Güvenli alişveriş
                </h2>
            }
        >
            <div className="py-12 max-w-[1200px] mx-auto">
                <div className="flex gap-6 justify-between">
                    <div className="w-full">
                        <p className="text-lg font-semibold">Teslimat adresi</p>
                        <div className="border rounded-lg px-9 py-6 mt-3 bg-white">
                            <p className="text-blue-600 font-medium">
                                Kayıtlı adres (Değiştir için tıkla)
                            </p>
                            {addressList &&
                                addressList.map((address) => (
                                    <div className="border flex justify-between items-center w-full rounded-lg p-2 mt-3 mb-5">
                                        <div className="flex items-center">
                                            <RadioButton
                                                id={`address-${address.id}`}
                                                value={address.id}
                                                name="selection"
                                                className="w-6 h-6 ml-2 mr-5"
                                                onChange={handleChange}
                                                checked={
                                                    address.id == data.redio
                                                }
                                            />
                                            <div className="">
                                                <p className="text-lg font-medium">
                                                    {address.address_name}
                                                </p>
                                                <div className="text-gray-600 text-sm flex">
                                                    <p>
                                                        {address.recipient_name}
                                                    </p>
                                                    <p className="mx-1">•</p>
                                                    <p>{address.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-indigo-600 bg-indigo-600/15 px-3 py-2 rounded-md">
                                            <TbMapPin
                                                className="mr-1.5"
                                                size={20}
                                            />
                                            <p>Kayıtlı adresi</p>
                                        </div>
                                    </div>
                                ))}
                            {addressList.length >= 5 ? (
                                <></>
                            ) : (
                                <button
                                    onClick={toggleDrawer}
                                    className="px-4 w-52 py-1 flex items-center text-left border-blue-500 border text-blue-500 rounded-md"
                                >
                                    <IoAddCircleOutline className="mr-1.5" />
                                    Yeni adresi ekle
                                </button>
                            )}
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
                                    className={`fixed top-0 right-0 overflow-y-scroll w-[28rem] bg-white h-full shadow-lg transition-transform ${
                                        isDrawerOpen
                                            ? "translate-x-0"
                                            : "translate-x-full"
                                    }`}
                                >
                                    <form
                                        onSubmit={(e) => {
                                            addressSave(e);
                                        }}
                                    >
                                        <div className="px-10 py-5">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">
                                                    Adres Ekle
                                                </h2>
                                                <button
                                                    type="button"
                                                    className="rounded-full p-2 inline-flex items-center justify-center text-black bg-gray-200 hover:text-gray-700 hover:bg-gray-300 focus:outline-none transition"
                                                    onClick={addressCancel}
                                                >
                                                    <TbX size={25} />
                                                </button>
                                            </div>
                                            <div className="mt-8">
                                                <p className="text-blue-500 mb-5 w-full border-b-2">
                                                    Kisisel Bilgileriniz
                                                </p>
                                                <InputLabel value="Teslim alacak kişinin bilgileri*" />
                                                <div className="flex gap-3">
                                                    <div>
                                                        <TextInput
                                                            id="ad"
                                                            type="text"
                                                            name="ad"
                                                            value={
                                                                data.first_name
                                                            }
                                                            className="mt-1 block w-full"
                                                            autoComplete="username"
                                                            placeholder="Ad"
                                                            isFocused={true}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "first_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.first_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            id="soyad"
                                                            type="text"
                                                            name="soyad"
                                                            className="mt-1 block w-full"
                                                            autoComplete="username"
                                                            placeholder="Soyad"
                                                            isFocused={true}
                                                            value={
                                                                data.last_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "last_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.last_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <InputLabel
                                                        htmlFor="phone_number"
                                                        value="Telefon*"
                                                    />
                                                    <InputMask
                                                        mask="0599 999 99 99"
                                                        placeholder="05"
                                                        value={
                                                            data.phone_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone_number",
                                                                e.target.value
                                                            )
                                                        }
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
                                                        message={
                                                            errors.phone_number
                                                        }
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
                                                        value="Şehir*"
                                                    />
                                                    <select
                                                        id="city"
                                                        name="city"
                                                        className="w-full border-gray-300 focus:border-indigo-500 mt-1 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        value={data.city}
                                                        onChange={(e) =>
                                                            setData(
                                                                "city",
                                                                e.target.value
                                                            )
                                                        }
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
                                                        message={errors.city}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <InputLabel
                                                        htmlFor="address"
                                                        value="Adres*"
                                                    />
                                                    <textarea
                                                        id="address"
                                                        rows="6"
                                                        maxLength="255"
                                                        className="block mt-1 resize-none p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        name="address"
                                                        autoComplete="address"
                                                        value={data.address}
                                                        onChange={(e) =>
                                                            setData(
                                                                "address",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="mahalle, cadde, sokak, mevki, apartman numarası / daire numarası, İlçe/İl. Seklide"
                                                    ></textarea>
                                                    <InputError
                                                        message={errors.address}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <InputLabel
                                                        htmlFor="address_name"
                                                        value="Bu adrese bir adı verin*"
                                                    />
                                                    <TextInput
                                                        id="address_name"
                                                        type="text"
                                                        name="address_name"
                                                        value={
                                                            data.address_name
                                                        }
                                                        className="mt-1 block w-full"
                                                        autoComplete="address-name"
                                                        placeholder="Örnek:Ev, İş Yeri, vb"
                                                        onChange={(e) =>
                                                            setData(
                                                                "address_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.address_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-4 justify-between mt-7">
                                                <Button
                                                    type="submit"
                                                    className="!text-sm w-full flex justify-center"
                                                >
                                                    Adresi kullan
                                                </Button>
                                                <OutlineButton
                                                    onClick={addressCancel}
                                                    className="!text-sm w-full flex justify-center"
                                                >
                                                    Vazgeç
                                                </OutlineButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg font-semibold mt-8">
                            Kart Bilgileri
                        </p>
                        <div className="flex items-center w-full mt-3 justify-between border rounded-lg px-9 py-6 bg-white">
                            <div className="w-96">
                                <div className="w-full mt-6">
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
                                <div className="w-full mt-6">
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
                                <div className="w-full mt-6 mb-6 flex gap-4">
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
                        <p className="text-lg font-semibold mt-8">
                            Siparis Bilgileri
                        </p>
                        <div className="w-full mt-3">
                            <div className="flex gap-6 justify-between">
                                <div className="w-full">
                                    {carts.map((cart) => (
                                        <div
                                            key={cart.storeId}
                                            className="border-2 rounded-lg mb-6 w-full bg-white"
                                        >
                                            <div className="flex justify-between items-center rounded-t-lg bg-gray-50 pl-3 px-2 py-3">
                                                <div className="flex">
                                                    <p className="font-medium text-sm">
                                                        {cart.storeName}
                                                    </p>
                                                    <p className="text-gray-500 ml-1 text-sm">
                                                        tarafından gönderilecek
                                                        ürünler
                                                    </p>
                                                </div>
                                            </div>
                                            {cart.products.map((products) => (
                                                <div
                                                    key={products.id}
                                                    className="border-t-2 w-full px-5 py-2"
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            className="select-none mr-3 border rounded duration-300 object-contain w-auto h-20"
                                                            loading="lazy"
                                                            src={
                                                                products.product
                                                                    .images[0]
                                                                    ?.img
                                                            }
                                                            alt={
                                                                products.product
                                                                    .name
                                                            }
                                                        />
                                                        <div className="mr-7">
                                                            <p className="font-medium text-sm text-gray-900 mb-1">
                                                                {products
                                                                    .product
                                                                    .name
                                                                    .length > 50
                                                                    ? `${products.product.name.slice(
                                                                          0,
                                                                          50
                                                                      )}...`
                                                                    : products
                                                                          .product
                                                                          .name}
                                                            </p>
                                                            <p className="flex text-sm items-center text-green-500">
                                                                <FaTruck className="mr-1.5 -scale-x-100" />{" "}
                                                                3 iş günde
                                                                kargolanır
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-64 mt-[40px]">
                        <div className="w-full sticky top-[20px]">
                            <div className="rounded-lg shadow-md bg-white px-4 py-2 border-2 border-gray-200">
                                <p className="text-sm font-semibold text-blue-500 mb-3 mt-2">
                                    ÖDENECEK TUTAR
                                </p>
                                <div className="flex text-2xl font-semibold">
                                    <PriceText value={grandTotalPrice} />
                                </div>
                                <form
                                    onSubmit={(e) => {
                                        submit(e);
                                    }}
                                >
                                    <Button className="w-full flex justify-center items-center py-3 px-4 my-4">
                                        Siparişi onayla
                                    </Button>
                                </form>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Ürünler</p>
                                    <PriceText value={totalPriceAll} />
                                </div>
                                <div className="flex text-sm mb-2 justify-between">
                                    <p>Kargo</p>
                                    {totalShippingCost > 0 ? (
                                        <PriceText value={totalShippingCost} />
                                    ) : (
                                        <div className="flex">
                                            <p className="mr-1.5 text-green-600 font-medium">
                                                Bedava
                                            </p>
                                            <p className="line-through text-gray-500">
                                                <PriceText
                                                    value={totalShippingCost}
                                                />
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
