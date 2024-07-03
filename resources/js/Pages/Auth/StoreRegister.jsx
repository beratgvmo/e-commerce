import { useEffect, useState } from "react";
import StoreGuest from "@/Layouts/StoreGuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import InputMask from "react-input-mask";

export default function Register({ categories }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm({
        name_surname: "",
        store_name: "",
        email: "",
        phone_number: "05",
        city: "",
        district: "",
        selling_category_id: "",
        img: [],
        color: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                return (
                    data.name_surname.length >= 4 &&
                    data.store_name.length >= 4 &&
                    data.city &&
                    data.selling_category_id &&
                    data.phone_number.replace(/_/g, "").length == 14
                );
            case 2:
                return data.img && data.color;
            case 3:
                return (
                    data.email &&
                    data.password.length >= 8 &&
                    data.password === data.password_confirmation
                );
            default:
                return false;
        }
    };

    console.log(data.phone_number.replace(/_/g, "").length > 14);
    console.log(data.phone_number.replace(/_/g, ""));
    console.log(data.phone_number.length);

    const submit = (e) => {
        e.preventDefault();
        if (validateStep(3)) {
            post(route("store.register"));
        }
    };

    const cities = [
        "Adana",
        "Adıyaman",
        "Afyonkarahisar",
        "Ağrı",
        "Amasya",
        "Ankara",
        "Antalya",
        "Artvin",
        "Aydın",
        "Balıkesir",
        "Bilecik",
        "Bingöl",
        "Bitlis",
        "Bolu",
        "Burdur",
        "Bursa",
        "Çanakkale",
        "Çankırı",
        "Çorum",
        "Denizli",
        "Diyarbakır",
        "Edirne",
        "Elazığ",
        "Erzincan",
        "Erzurum",
        "Eskişehir",
        "Gaziantep",
        "Giresun",
        "Gümüşhane",
        "Hakkari",
        "Hatay",
        "Isparta",
        "Mersin",
        "İstanbul",
        "İzmir",
        "Kars",
        "Kastamonu",
        "Kayseri",
        "Kırklareli",
        "Kırşehir",
        "Kocaeli",
        "Konya",
        "Kütahya",
        "Malatya",
        "Manisa",
        "Kahramanmaraş",
        "Mardin",
        "Muğla",
        "Muş",
        "Nevşehir",
        "Niğde",
        "Ordu",
        "Rize",
        "Sakarya",
        "Samsun",
        "Siirt",
        "Sinop",
        "Sivas",
        "Tekirdağ",
        "Tokat",
        "Trabzon",
        "Tunceli",
        "Şanlıurfa",
        "Uşak",
        "Van",
        "Yozgat",
        "Zonguldak",
        "Aksaray",
        "Bayburt",
        "Karaman",
        "Kırıkkale",
        "Batman",
        "Şırnak",
        "Bartın",
        "Ardahan",
        "Iğdır",
        "Yalova",
        "Karabük",
        "Kilis",
        "Osmaniye",
        "Düzce",
    ];

    console.log(data.img);

    return (
        <StoreGuest>
            <Head title="Register" />
            <div className="pb-6">
                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className="flex transition-all md:w-full items-center sm:after:content-[''] after:w-[40%] after:h-1 after:border-b-2 after:hidden sm:after:inline-block after:mx-7 text-blue-600">
                        <span className="flex transition-all items-center after:text-gray-200 dark:after:text-gray-500">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full shrink-0 mr-1">
                                1
                            </span>
                            <p>Mağaza Bilgisi</p>
                        </span>
                    </li>
                    <li
                        className={`flex transition-all md:w-full items-center sm:after:content-[''] after:w-[40%] after:h-1 after:border-b-2 after:hidden sm:after:inline-block after:mx-7 text-${
                            step >= 2 ? "blue-600" : "gray-500"
                        }`}
                    >
                        <span
                            className={`flex transition-all items-center justify-center w-8 h-8 rounded-full shrink-0 mr-1 ${
                                step >= 2 ? "bg-blue-600 text-white" : ""
                            }`}
                        >
                            2
                        </span>
                        <p>Profil Teması</p>
                    </li>
                    <li
                        className={`flex transition-all items-center text-${
                            step >= 3 ? "blue-600" : "gray-500"
                        }`}
                    >
                        <span
                            className={`flex transition-all items-center justify-center w-8 h-8  rounded-full shrink-0 mr-1 ${
                                step >= 3 ? "bg-blue-600 text-white" : ""
                            }`}
                        >
                            3
                        </span>
                        <p>Bitiş</p>
                    </li>
                </ol>
            </div>
            <div className="w-full">
                <form onSubmit={submit}>
                    {step === 1 && (
                        <>
                            <div>
                                <InputLabel
                                    htmlFor="name_surname"
                                    value="ADINIZ - SOYADINIZ"
                                />
                                <TextInput
                                    id="name_surname"
                                    name="name_surname"
                                    value={data.name_surname}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name_surname", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name_surname}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="store_name"
                                    value="Mağaza adı"
                                />
                                <TextInput
                                    id="store_name"
                                    name="store_name"
                                    value={data.store_name}
                                    className="mt-1 block w-full"
                                    autoComplete="store_name"
                                    onChange={(e) =>
                                        setData("store_name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.store_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="phone_number"
                                    value="CEP TELEFONUNUZ"
                                />
                                <InputMask
                                    mask="9999 999 99 99"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
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
                                    message={errors.phone_number}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="city" value="İL" />
                                <select
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Şehir Seçiniz</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
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
                                    htmlFor="selling_category_id"
                                    value="Satılacak Ürün Kategori"
                                />
                                <select
                                    id="selling_category_id"
                                    name="selling_category_id"
                                    value={data.selling_category_id}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setData(
                                            "selling_category_id",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Satılacak Ürün Kategoris
                                    </option>
                                    {categories.map(
                                        (selling_category) =>
                                            selling_category.parent_id ==
                                                null && (
                                                <option
                                                    key={selling_category.id}
                                                    value={selling_category.id}
                                                >
                                                    {selling_category.name}
                                                </option>
                                            )
                                    )}
                                </select>
                                <InputError
                                    message={errors.selling_category_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    type="button"
                                    className="ms-4"
                                    onClick={nextStep}
                                    disabled={!validateStep(1)}
                                >
                                    Sonraki
                                </PrimaryButton>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div>
                                <InputLabel
                                    htmlFor="img"
                                    value="Mağaza Resmi"
                                />
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        for="img"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            id="img"
                                            name="img"
                                            className="hidden mt-1 w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "img",
                                                    e.target.files[0]
                                                )
                                            }
                                            required
                                        />
                                    </label>
                                </div>
                                <InputError
                                    message={errors.img}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="color"
                                    value="Mağaza Rengi"
                                />
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={data.color}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("color", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.color}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <PrimaryButton
                                    type="button"
                                    className=""
                                    onClick={prevStep}
                                >
                                    Geri
                                </PrimaryButton>
                                <PrimaryButton
                                    type="button"
                                    className="ms-4"
                                    onClick={nextStep}
                                    disabled={!validateStep(2)}
                                >
                                    Sonraki
                                </PrimaryButton>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div>
                                <InputLabel htmlFor="email" value="E-posta" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Şifre" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Şifreyi Onayla"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <PrimaryButton
                                    type="button"
                                    className=""
                                    onClick={prevStep}
                                >
                                    Geri
                                </PrimaryButton>
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={!validateStep(3)}
                                >
                                    Üye ol
                                </PrimaryButton>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </StoreGuest>
    );
}
