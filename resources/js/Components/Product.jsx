import { Link, useForm } from "@inertiajs/react";
import RenderStars from "./RenderStars";
import { NumericFormat } from "react-number-format";
import PriceText from "./PriceText";
import { useState } from "react";

export default function Product({ product, cart = true }) {
    const { post } = useForm({
        product_id: product.id,
    });

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = (e) => {
        e.preventDefault();
        setIsAddedToCart(true);
        post(route("user.cartAdd"));
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 300);
    };
    return (
        <div className="group max-w-64 duration-200 bg-white border border-gray-200 hover:border-gray-400 rounded-lg shadow flex flex-col overflow-hidden">
            <Link key={product.id} href={`/urun/${product.slug}`}>
                <div className="aspect-square relative overflow-hidden">
                    <img
                        className="object-contain select-none duration-300 w-full h-full absolute inset-0 transition-transform group-hover:scale-105"
                        loading="lazy"
                        src={product.images[0]?.img}
                        alt={product.name}
                    />
                </div>
                <div className="p-2 rounded-lg bg-gray-50 flex flex-col justify-between">
                    <div>
                        <h1 className="font-medium text-sm text-gray-900 mb-1">
                            {product.name.length > 52
                                ? product.name.slice(0, 52) + "..."
                                : product.name}
                        </h1>
                        <div className="mb-1 flex">
                            <RenderStars count={product.rating} />
                        </div>
                        <p className="font-semibold">
                            <PriceText value={product.price} />
                        </p>
                    </div>
                </div>
            </Link>
            <div className="p-2 bg-gray-50 pt-5">
                {cart && (
                    <form onSubmit={addToCart}>
                        <button
                            type="submit"
                            className={`group-hover:flex flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full py-2 text-sm font-medium text-center text-white rounded-lg  ${
                                isAddedToCart
                                    ? "bg-green-500"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {isAddedToCart ? "Sepete Eklendi" : "Sepete Ekle"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
