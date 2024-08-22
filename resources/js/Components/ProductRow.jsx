import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import PriceInput from "./PriceInput";
import NumberInput from "./NumberInput";

export default function ProductRow({ product }) {
    const { data, setData, patch, errors } = useForm({
        price: product.price,
        discounted_price: product.discounted_price,
        stock_quantity: product.stock_quantity,
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                data.price !== product.price ||
                data.discounted_price !== product.discounted_price ||
                data.stock_quantity !== product.stock_quantity
            ) {
                patch(route("store.updateNumbers", product.id), {
                    preserveScroll: true,
                    replace: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [data, product.id]);

    return (
        <tr key={product.id} className="bg-white border-t">
            {/* Diğer sütunlar */}
            <td className="px-4 bg-green-50 font-black border w-[10%]">
                <p>{product.price}</p>
                <PriceInput
                    id="price"
                    name="price"
                    className="mt-1 block w-full"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                />
            </td>
            <td className="px-4 bg-blue-50 font-black border w-[10%]">
                <p>{product.discounted_price}</p>

                <PriceInput
                    id="discounted_price"
                    name="discounted_price"
                    className="mt-1 block w-full"
                    value={data.discounted_price}
                    onChange={(e) =>
                        setData("discounted_price", e.target.value)
                    }
                />
            </td>
            <td className="px-4 bg-orange-50 border font-medium">
                <p>{product.stock_quantity}</p>
                <NumberInput
                    id="stock_quantity"
                    name="stock_quantity"
                    className="mt-1 block w-full"
                    autoComplete="stock_quantity"
                    value={data.stock_quantity}
                    onChange={(e) => setData("stock_quantity", e.target.value)}
                />
            </td>
            {/* Diğer sütunlar */}
        </tr>
    );
}
