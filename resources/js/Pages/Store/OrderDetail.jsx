import OutlineButton from "@/Components/OutlineButton";
import PriceText from "@/Components/PriceText";
import PrimaryButton from "@/Components/PrimaryButton";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function OrderDetail({ auth }) {
    const { order } = usePage().props;

    const formatNumber = (number) => {
        return new Intl.NumberFormat("tr-TR").format(number);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const datePart = date.toLocaleDateString("tr-TR", options);
        const timePart = date.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${datePart} ${timePart}`;
    };

    const quantity = (order_items) => {
        let quantity = 0;
        order_items.map((item) => {
            quantity += item.quantity;
        });

        return quantity;
    };

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sipariş Detay
                </h2>
            }
        >
            <Head title="Order Detail" />

            <div className="py-12">
                <div className="bg-white p-4 text-gray-900 px-6 overflow-hidden shadow-sm rounded-lg">
                    <div className="mb-4">
                        <Link
                            href="/store/order"
                            className="text-blue-500 flex items-center"
                        >
                            <IoIosArrowBack className="mr-2" /> Geri Dön
                        </Link>
                    </div>
                    <h3 className="text-2xl font-bold mb-8">
                        Sipariş #{order.order_code}
                    </h3>
                    <div className="flex justify-between w-full bg-gray-100 px-8 py-3 rounded-full">
                        <div className="flex">
                            <div className="mr-10">
                                <p>Alıcı adı</p>
                                <p className="text-lg font-semibold">
                                    {order.user.name}
                                </p>
                            </div>
                            <div>
                                <p>Oluşturulma Tarihi</p>
                                <p className="text-lg font-semibold">
                                    {formatDate(order.created_at)}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <p>Toplam Tutar</p>
                                <p className="text-lg font-semibold">
                                    <PriceText value={order.total_amount} />
                                </p>
                            </div>
                            <div>
                                <p>Kargo Ücreti</p>
                                <p className="text-lg font-semibold">
                                    <PriceText value={order.shipping_cost} />
                                </p>
                            </div>
                            <div>
                                <p>Toplam Adet</p>
                                <p className="text-lg font-semibold">
                                    {quantity(order.order_items)}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <p>
                        <strong>Durum:</strong> {order.status}
                    </p>
                    <p>
                        <strong>Adres:</strong> {order.delivery_address}
                    </p> */}
                    <h3 className="text-lg font-bold mt-12 mb-2 ml-2">
                        - Sipariş Edilen Ürünler
                    </h3>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-gray-700 font-black uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="p-3 border">
                                    Ürün Adı
                                </th>
                                <th scope="col" className="p-3 border">
                                    Miktar
                                </th>
                                <th scope="col" className="p-3 border">
                                    Fiyat
                                </th>
                                <th scope="col" className="p-3 border">
                                    Durum
                                </th>
                                <th scope="col" className="p-3 border ">
                                    <div className="flex justify-center">
                                        <OutlineButton>
                                            Toplu Güncelle
                                        </OutlineButton>
                                    </div>
                                </th>
                                <th scope="col" className="p-3 border">
                                    <div className="flex justify-center">
                                        <OutlineButton>
                                            Toplu Fatura
                                        </OutlineButton>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.order_items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white text-sm font-medium border-t"
                                >
                                    <th
                                        scope="row"
                                        className="px-4 w-[34%] text-sm py-2 border font-medium text-gray-900 "
                                    >
                                        <div className="flex items-center">
                                            <img
                                                className="select-none w-24 h-24 object-contain mr-4 rounded-md border-2"
                                                loading="lazy"
                                                src={
                                                    item.product.images[0]?.img
                                                }
                                                alt={item.product.name}
                                            />
                                            <div className="w-full">
                                                <div className="flex justify-between w-full">
                                                    <p className="text-sm mb-2">
                                                        {item.product.name
                                                            .length > 40
                                                            ? item.product.name.slice(
                                                                  0,
                                                                  40
                                                              ) + "..."
                                                            : item.product.name}
                                                    </p>
                                                    <Link
                                                        key={order.id}
                                                        href={`/urun/${item.product.slug}`}
                                                    >
                                                        <div className="font-medium w-6 h-6 hover:bg-gray-200 transition duration-200 rounded-md text-lg hover:text-blue-600 text-blue-500 flex justify-center items-center">
                                                            <IoIosArrowForward />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <p className="text-gray-500 flex">
                                                    {item.product.attributes
                                                        .slice(0, 4)
                                                        .map(
                                                            (
                                                                attribute,
                                                                index
                                                            ) => (
                                                                <p
                                                                    key={index}
                                                                    className="mx-0.5 text-sm font-medium"
                                                                >
                                                                    #
                                                                    {
                                                                        attribute.name
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-4 py-2 border">
                                        {item.quantity} Adet
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {formatNumber(item.price)} TL
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {item.status}
                                    </td>
                                    <td className="px-4 py-2 border w-[14%]">
                                        <div className=" flex justify-center">
                                            <PrimaryButton>
                                                Güncelle
                                            </PrimaryButton>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border w-[14%]">
                                        <div className=" flex justify-center">
                                            <PrimaryButton>
                                                Ürün Fatura
                                            </PrimaryButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </StoreLayout>
    );
}

/*
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-gray-700 font-black uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-3 border">
                                        Ürün bilgisi
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Özellikleri
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Komisyon
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Piyasa Satiş fiyatı
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        İndirimli Satiş fiyatı
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Stok
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        içerik
                                    </th>
                                    <th scope="col" className="p-3 border">
                                        Detay sayfası
                                    </th>
                                </tr>
                            </thead>
                            {products.data.length > 0 && (
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="bg-white border-t"
                                        >
                                            <th
                                                scope="row"
                                                className="px-4 w-[33%] text-sm py-2 font-medium text-gray-900 "
                                            >
                                                <div className="flex items-center">
                                                    <img
                                                        className="select-none w-20 h-full object-cover mr-4 rounded-md border-2"
                                                        loading="lazy"
                                                        src={
                                                            product.images[0]
                                                                ?.img
                                                        }
                                                        alt={product.name}
                                                    />
                                                    <div className="">
                                                        <p className="text-sm mb-2">
                                                            {product.name
                                                                .length > 60
                                                                ? product.name.slice(
                                                                      0,
                                                                      47
                                                                  ) + "..."
                                                                : product.name}
                                                        </p>
                                                        <p className="text-gray-500 mt-2">
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-4 border w-[20%]">
                                                <div className="flex justify-between">
                                                    {product.attributes
                                                        .slice(0, 4)
                                                        .map(
                                                            (
                                                                attribute,
                                                                index
                                                            ) => (
                                                                <p
                                                                    key={index}
                                                                    className="mx-0.5 text-sm font-medium"
                                                                >
                                                                    #
                                                                    {
                                                                        attribute.name
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                </div>
                                            </td>
                                            <td className="px-4 border">
                                                <p className=" bg-green-500 py-1 text-white rounded-full text-center">
                                                    %10.0
                                                </p>
                                            </td>
                                            <td className="px-4 font-black border w-[10%]">
                                                <PriceText
                                                    value={product.price}
                                                />
                                            </td>
                                            <td className="px-4 font-black border w-[10%]">
                                                <PriceText
                                                    value={
                                                        product.discounted_price
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 border font-medium">
                                                <p>
                                                    {formatNumber(
                                                        product.stock_quantity
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-4 border">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Düzenle
                                                </a>
                                            </td>
                                            <td className="px-4 border">
                                                <div className="w-full h-full flex justify-center">
                                                    <Link
                                                        key={product.id}
                                                        href={`/urun/${product.slug}`}
                                                    >
                                                        <div className="font-medium w-10 h-10 bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md text-lg hover:text-blue-600 text-blue-500 flex justify-center items-center">
                                                            <IoIosArrowForward />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>

*/
