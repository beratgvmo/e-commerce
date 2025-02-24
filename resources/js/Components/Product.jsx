import { Link, useForm } from "@inertiajs/react";
import RenderStars from "./RenderStars";
import { NumericFormat } from "react-number-format";
import PriceText from "./PriceText";
import { useState } from "react";
import { TbClockExclamation } from "react-icons/tb";

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
                    {product.stock_quantity <= 10 && (
                        <div className="absolute flex items-center gap-1 text-white text-xs justify-center w-full h-5 bottom-0 bg-red-500">
                            <TbClockExclamation /> son {product.stock_quantity}{" "}
                            ürün!
                        </div>
                    )}
                </div>
                <div className="p-2 rounded-lg bg-gray-50 h-[110px]">
                    <h1 className="font-medium text-sm text-gray-900 mb-1">
                        {product.name.length > 52
                            ? product.name.slice(0, 52) + "..."
                            : product.name}
                    </h1>
                    <div className="mb-1 flex">
                        <RenderStars count={product.rating} />
                    </div>
                    {product.price != product.discounted_price ? (
                        <p>
                            <PriceText
                                value={product.price}
                                className="line-through font-normal text-gray-600 text-sm"
                            />
                            <PriceText
                                value={product.discounted_price}
                                className="text-green-600 font-semibold"
                            />
                        </p>
                    ) : (
                        <p className="font-semibold">
                            <PriceText value={product.price} />
                        </p>
                    )}
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
