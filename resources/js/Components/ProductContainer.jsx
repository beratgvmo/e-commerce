import { Link } from "@inertiajs/react";
import RenderStars from "@/Components/RenderStars";

export default function ProductContainer({ products }) {
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {products.map((product) => (
                <Link key={product.id} href={`urun/${product.slug}`}>
                    <div className="group max-w-56 bg-white border border-gray-200 rounded-lg shadow">
                        <img
                            className="rounded-t-lg mt-4"
                            src={product.images[0]?.img}
                            alt={product.name}
                        />
                        <div className="p-2 rounded-lg bg-gray-50 flex flex-col justify-between min-h-[165px]">
                            <div>
                                <h3 className="font-medium text-sm text-gray-900 mb-1">
                                    {product.name.length > 60
                                        ? product.name.slice(0, 60) + "..."
                                        : product.name}
                                </h3>
                                <div className="mb-1 flex">
                                    <RenderStars count={product.rating} />
                                </div>
                                <p className="font-semibold">
                                    {product.price} TL
                                </p>
                            </div>
                            <a
                                href="#"
                                className="justify-center hidden group-hover:flex w-full py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg transition hover:bg-blue-600"
                            >
                                Sepete Ekle
                            </a>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
