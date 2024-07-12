import React, { useEffect, useState, useCallback } from "react";
import { useForm, router } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

export default function CategoryProducts({
    auth,
    categories,
    category,
    products,
}) {
    const { data, setData } = useForm({ search: "" });
    const [query, setQuery] = useState("");

    const fetchProducts = useCallback(() => {
        router.visit(route("home.category", { slug: category.slug }), {
            method: "get",
            data: { search: query },
            preserveState: true,
            replace: true,
            only: ["products"],
        });
    }, [query, category.slug]);

    useEffect(() => {
        const timeoutId = setTimeout(fetchProducts, 200);
        return () => clearTimeout(timeoutId);
    }, [query, fetchProducts]);

    return (
        <HomeLayout auth={auth} categories={categories}>
            <div>{category.name}</div>
            <input
                type="text"
                placeholder="Ürün Ara"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price} ₺</p>
                    </div>
                ))}
            </div>
        </HomeLayout>
    );
}
