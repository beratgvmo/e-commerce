import { Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";

export default function StoreGuest({ children, page = "login" }) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white py-5 px-6 flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600">E-ticaret</h1>
                {page === "login" ? (
                    <Link
                        href={route("store.register")}
                        className="py-2 px-4 bg-blue-500 rounded-lg text-white font-medium  hover:bg-blue-600 transition"
                    >
                        Satıcı Başvuru Formu
                    </Link>
                ) : (
                    <Link
                        href={route("store.login")}
                        className="py-2 px-4 bg-blue-500 rounded-lg text-white font-medium  hover:bg-blue-600 transition"
                    >
                        Satıcı Giriş Yap
                    </Link>
                )}
            </div>

            <div className="h-full flex flex-col sm:justify-center center items-center pt-6 sm:pt-0 ">
                <div className="w-full sm:max-w-3xl mt-16 px-6 pb-4 pt-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
