import { Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function StoreGuest({ children, page = "login" }) {
    return (
        <div className="bg-gray-100 min-h-screen">
            {page === "login" ? (
                <div className="flex justify-between items-center py-3 px-4 bg-white">
                    <h1 className="text-xl ml-6 font-bold text-blue-600">
                        E-ticaret
                    </h1>
                    <div className="flex items-center">
                        <h1 className="">Satıcı Başvuru Formu</h1>
                        <Link href={route("store.register")}>
                            <IoIosArrowForward className="w-9 h-9 rounded-md flex items-center p-1 ml-2 text-xl bg-gray-200" />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-center py-3 px-4 bg-white">
                    <div className="flex items-center">
                        <Link href={route("store.login")}>
                            <IoIosArrowBack className="w-9 h-9 rounded-md flex items-center p-1 mr-2 text-xl bg-gray-200" />
                        </Link>
                        <h1 className="">Satıcı Giriş Yap</h1>
                    </div>
                    <h1 className="text-xl mr-6 font-bold text-blue-600">
                        E-ticaret
                    </h1>
                </div>
            )}

            <div className="h-full flex flex-col sm:justify-center center items-center pt-6 sm:pt-0 ">
                <div className="w-full sm:max-w-3xl mt-16 px-6 pb-4 pt-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Satıcı Başvuru Formu
