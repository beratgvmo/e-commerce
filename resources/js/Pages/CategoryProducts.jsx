import React from "react";
import { Head, Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import FilterTab from "@/Components/FilterTab";
import ProductContainer from "@/Components/ProductContainer";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LuSearchX } from "react-icons/lu";

const CategoryProducts = ({
    auth,
    categories,
    categoryHierarchy,
    products,
    attributesMain,
    categorySubMain,
    categoryMain,
    cart,
}) => {
    return (
        <>
            <HomeLayout auth={auth} categories={categories} cart={cart}>
                <Head title="Welcome" />
                <nav className="flex py-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <div className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <FaHome className="mr-1 text-lg" />
                                <Link href="/">Ana Sayfa</Link>
                            </div>
                        </li>
                        {categoryHierarchy.map((category, index) => (
                            <li key={index}>
                                <div className="flex items-center">
                                    <IoIosArrowForward />
                                    <div className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        <Link
                                            href={`/kategori/${category.slug}`}
                                        >
                                            {category.name}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="flex gap-5">
                    <div>
                        {(categorySubMain.length > 0 ||
                            attributesMain.length > 0) && (
                            <FilterTab
                                attributesMain={attributesMain}
                                categorySubMain={categorySubMain}
                                categorySlug={categoryMain.slug}
                            />
                        )}
                    </div>
                    <div className="w-full">
                        {products.length > 0 ? (
                            <>
                                <div className=""></div>
                                <ProductContainer products={products} />
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center mt-8">
                                    <div className="flex flex-col justify-center items-center">
                                        <LuSearchX className="text-8xl text-orange-500" />
                                        Aramanız için sonuç bulunamadı.
                                        <Link
                                            href="/"
                                            className="text-orange-600 underline"
                                        >
                                            Ana Sayfa
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </HomeLayout>
        </>
    );
};

export default CategoryProducts;

// import React, { useEffect, useState, useCallback } from "react";
// import { useForm, router } from "@inertiajs/react";
// import HomeLayout from "@/Layouts/HomeLayout";

// export default function CategoryProducts({
//     auth,
//     categories,
//     category,
//     products,
// }) {
//     const { data, setData } = useForm({ search: "" });
//     const [query, setQuery] = useState("");

//     const fetchProducts = useCallback(() => {
//         router.visit(route("home.category", { slug: category.slug }), {
//             method: "get",
//             data: { search: query },
//             preserveState: true,
//             replace: true,
//             only: ["products"],
//         });
//     }, [query, category.slug]);

//     useEffect(() => {
//         const timeoutId = setTimeout(fetchProducts, 200);
//         return () => clearTimeout(timeoutId);
//     }, [query, fetchProducts]);

//     return (
//         <HomeLayout auth={auth} categories={categories}>
//             <div>{category.name}</div>
//             <input
//                 type="text"
//                 placeholder="Ürün Ara"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />
//             <div>
//                 {products.map((product) => (
//                     <div key={product.id}>
//                         <h2>{product.name}</h2>
//                         <p>{product.price} ₺</p>
//                     </div>
//                 ))}
//             </div>
//         </HomeLayout>
//     );
// }
