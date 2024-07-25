import { Link } from "@inertiajs/react";
import RenderStars from "./RenderStars";
import { NumericFormat } from "react-number-format";
import PriceText from "./PriceText";

export default function Product({ product }) {
    return (
        <Link key={product.id} href={`/urun/${product.slug}`}>
            <div className="group max-w-56 duration-200 bg-white border border-gray-200 hover:border-gray-400 rounded-lg shadow flex flex-col overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                    <img
                        className="object-contain select-none duration-300 w-full h-full absolute inset-0 transition-transform group-hover:scale-105"
                        loading="lazy"
                        src={product.images[0]?.img}
                        alt={product.name}
                    />
                </div>
                <div className="p-2 rounded-lg bg-gray-50 flex flex-col justify-between min-h-[165px]">
                    <div>
                        <h1 className="font-medium text-sm text-gray-900 mb-1">
                            {product.name.length > 60
                                ? product.name.slice(0, 60) + "..."
                                : product.name}
                        </h1>
                        <div className="mb-1 flex">
                            <RenderStars count={product.rating} />
                        </div>
                        <p className="font-semibold">
                            <PriceText value={product.price} />
                        </p>
                    </div>
                    <button className="group-hover:flex flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </Link>
    );
}
