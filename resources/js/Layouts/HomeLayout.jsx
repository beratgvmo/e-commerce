import { Link } from "@inertiajs/react";
import CategoryList from "@/Components/CategoryList";
import { IoIosSearch } from "react-icons/io";

export default function HomeLayout({ auth, categories, children }) {
    return (
        <div>
            <header className="pt-2 border-b bg-gray-50 border-gray-200">
                <div className="w-[1200px] mx-auto">
                    <div className="text-xs flex gap-3 justify-end">
                        <Link href={route("store.register")}>
                            Trendyol'da Satış Yap
                        </Link>
                        <p>Hakkımızda</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-medium text-blue-500">
                            E-ticaret
                        </p>
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
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 "
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
                        </div>
                    </div>
                    <div className="">
                        <CategoryList categories={categories} />
                    </div>
                </div>
            </header>

            <main className="w-[1200px] mt-[15px] mx-auto">{children}</main>
        </div>
    );
}
