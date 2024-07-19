import { useCallback, useEffect, useState } from "react";
import StoreGuest from "@/Layouts/StoreGuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputMask from "react-input-mask";
import { cities } from "@/data/cities";

export default function Register({ categories, cargoCompanies, nameUnique }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        store_name: "",
        email: "",
        phone_number: "05",
        city: "",
        iban_no: "TR",
        address: "",
        selling_category_id: "",
        cargo_companies_id: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const fetchProducts = useCallback(() => {
        router.visit(route("store.register"), {
            method: "get",
            data: { store_name: data.store_name },
            preserveState: true,
            replace: true,
            only: ["nameUnique"],
        });
    }, [data.store_name]);

    useEffect(() => {
        const timeoutId = setTimeout(fetchProducts, 100);
        return () => clearTimeout(timeoutId);
    }, [fetchProducts]);

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    console.log(nameUnique);

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                return (
                    data.first_name.length >= 2 &&
                    data.first_name.length < 30 &&
                    data.last_name.length >= 2 &&
                    data.last_name.length < 30 &&
                    data.store_name.length >= 5 &&
                    data.store_name.length <= 30 &&
                    data.city &&
                    data.selling_category_id &&
                    data.phone_number.replace(/_/g, "").length == 14
                );
            case 2:
                return (
                    data.iban_no.replace(/_/g, "").length == 32 &&
                    data.cargo_companies_id &&
                    data.address.length > 30
                );
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

    const submit = (e) => {
        e.preventDefault();
        if (validateStep(step)) {
            post(route("store.register"));
        }
        setStep(1);
    };

    return (
        <StoreGuest page="register">
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
                        <p>Banka ve Adres Bilgisi</p>
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
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="first_name"
                                        value="Adı"
                                    />
                                    <TextInput
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        className="mt-1 block w-full"
                                        autoComplete="first_name"
                                        placeholder="Adı"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="last_name"
                                        value="Soyadı"
                                    />
                                    <TextInput
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        className="mt-1 block w-full"
                                        autoComplete="last_name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        placeholder="Soyadı"
                                        required
                                    />
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </div>
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
                                    placeholder="Mağaza adı"
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
                                    mask="0599 999 99 99"
                                    value={data.phone_number}
                                    placeholder="Cep Numarası"
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
                                        Satılacak Ürün Kategorisi
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
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="iban_no"
                                    value="IBAN NUMARASI (kayıt sırasında isimle, İBAN kayıt olan İsimle aynı olmalı)"
                                />
                                <InputMask
                                    mask="TR99 9999 9999 9999 9999 9999 99"
                                    placeholder="IBAN No Giriniz"
                                    value={data.iban_no}
                                    onChange={(e) =>
                                        setData("iban_no", e.target.value)
                                    }
                                >
                                    {(inputProps) => (
                                        <TextInput
                                            {...inputProps}
                                            id="iban_no"
                                            name="iban_no"
                                            className="mt-1 block w-full"
                                            autoComplete="iban_no"
                                            required
                                        />
                                    )}
                                </InputMask>
                                <InputError
                                    message={errors.iban_no}
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.iban_no}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="address" value="Adres" />

                                <textarea
                                    id="address"
                                    rows="6"
                                    maxlength="255"
                                    class="block resize-none p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    name="address"
                                    value={data.address}
                                    autoComplete="address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    required
                                    placeholder="Adres"
                                ></textarea>
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="cargo_companies_id"
                                    value="Kargo Firmalari"
                                />
                                <select
                                    id="cargo_companies_id"
                                    name="cargo_companies_id"
                                    value={data.cargo_companies_id}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setData(
                                            "cargo_companies_id",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">Kargo Firması seç</option>
                                    {cargoCompanies.map((CargoCompany) => (
                                        <option
                                            key={CargoCompany.id}
                                            value={CargoCompany.id}
                                        >
                                            {CargoCompany.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.cargo_companies_id}
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
                                    type="submit"
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
