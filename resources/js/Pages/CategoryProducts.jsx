import React from "react";
import { Head, Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import FilterTab from "@/Components/FilterTab";
import ProductContainer from "@/Components/ProductContainer";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CategoryProducts = ({
    auth,
    categories,
    categoryHierarchy,
    products,
    attributesMain,
    categorySubMain,
    categoryMain,
}) => {
    return (
        <>
            <HomeLayout auth={auth} categories={categories}>
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
                                        <Link href={`/${category.slug}`}>
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
                        <FilterTab
                            attributesMain={attributesMain}
                            categorySubMain={categorySubMain}
                            categorySlug={categoryMain.slug}
                        />
                    </div>
                    <div className="w-full">
                        {products.length > 0 ? (
                            <>
                                <div className=""></div>
                                <ProductContainer products={products} />
                            </>
                        ) : (
                            <>
                                <div className="text-lg font-medium mb-6 border-b pb-2">
                                    "{categoryMain.name}" araması için 0 sonuç
                                    listeleniyor
                                </div>
                                <div className="flex justify-center mt-8">
                                    <div className="text-center w-full p-4 px-28 bg-gray-200 rounded text-lg font-semibold text-gray-800">
                                        Şu anda bu kategoride ürün
                                        bulunmamaktadır.
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
