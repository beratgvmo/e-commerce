import { Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";

export default function StoreGuest({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white py-2 pl-4 flex items-center">
                <Link href="/">
                    <IoIosArrowBack className="w-9 h-9 rounded-md flex items-center p-1 mr-2 text-xl bg-gray-200" />
                </Link>
                <h1 className="">Satıcı Başvuru Formu</h1>
            </div>

            <div className="h-full flex flex-col sm:justify-center center items-center pt-6 sm:pt-0 ">
                <div className="w-full sm:max-w-3xl mt-16 px-6 pb-4 pt-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
