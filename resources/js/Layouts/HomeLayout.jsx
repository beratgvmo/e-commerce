import { Link } from "@inertiajs/react";
import { useState } from "react";
import CategoryList from "@/Components/CategoryList";
import { IoIosSearch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function HomeLayout({ auth, categories, children }) {
    const [isCategoryHovered, setIsCategoryHovered] = useState(false);

    return (
        <div>
            <header className="pt-2 border-b bg-gray-50 border-gray-200">
                <div className="w-[1200px] mx-auto">
                    <div className="text-xs flex gap-3 justify-end">
                        <Link href={route("store.register")}>
                            E-ticaret'da Satış Yap
                        </Link>
                        <p>Hakkımızda</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-xl font-medium text-blue-500"
                        >
                            E-ticaret
                        </Link>
                        <div className="flex bg-gray-200 border-none w-[40%] rounded-md">
                            <input
                                type="text"
                                className="focus:ring-0 focus:ring-transparent transition border-2 rounded-s-md border-transparent focus:bg-gray-100 focus:border-2 focus:border-r-0  focus:border-blue-500 bg-gray-200 w-full"
                                placeholder="Aradığınız ürün yazınız"
                            />
                            <div className="flex items-center justify-center rounded-e-md px-3 bg-blue-500 transition hover:bg-blue-600">
                                <IoIosSearch className="text-3xl text-white" />
                            </div>
                        </div>
                        <div className="">
                            {!auth.store && (
                                <>
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70"
                                        >
                                            Hesap
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70"
                                            >
                                                Giriş Yap
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70"
                                            >
                                                Üye Ol
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <CategoryList
                            categories={categories}
                            setIsCategoryHovered={setIsCategoryHovered}
                        />
                    </div>
                </div>
            </header>
            <div className="relative min-h-screen flex-col flex justify-between">
                {isCategoryHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 z-40"></div>
                )}
                <main className="relative z-20 w-[1200px] mx-auto">
                    {children}
                </main>

                <footer className="bg-blue-50 border-t border-gray-300 mt-6">
                    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                        <div className="flex justify-between">
                            <div className="mb-6">
                                <span className="self-center text-blue-500 text-2xl font-semibold">
                                    E-ticaret
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-12 ">
                                <div>
                                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                                        Bizim Hakkımızda
                                    </h2>
                                    <ul className="text-gray-600 text-sm font-medium">
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Hakkımızda
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Müşteri Hizmetleri
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                                        Bizim Hakkımızda
                                    </h2>
                                    <ul className="text-gray-600 text-sm font-medium">
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Hakkımızda
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Müşteri Hizmetleri
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                                        Bizim Hakkımızda
                                    </h2>
                                    <ul className="text-gray-600 text-sm font-medium">
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Hakkımızda
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                Müşteri Hizmetleri
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                        <li className="mb-3">
                                            <Link
                                                href="/"
                                                className="hover:underline"
                                            >
                                                --------
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-300" />
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                © 2024 Tüm Hakları Saklıdır E-Ticaret
                            </span>
                            <div className="flex">
                                <a
                                    target="_blank"
                                    href="https://github.com/beratguven0"
                                    className="text-gray-500 text-lg hover:text-gray-900 transition duration-200"
                                >
                                    <FaGithub className="text-2xl" />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com/in/berat-g%C3%BCven-82b782262/"
                                    className="text-gray-500 text-lg hover:text-gray-900 ml-4 transition duration-200"
                                >
                                    <FaLinkedin className="text-2xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
