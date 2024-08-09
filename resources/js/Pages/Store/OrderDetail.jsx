import Modal from "@/Components/Modal";
import OutlineButton from "@/Components/OutlineButton";
import PriceText from "@/Components/PriceText";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import {
    TbBasket,
    TbBasketCancel,
    TbBasketCheck,
    TbBasketPin,
} from "react-icons/tb";
import { TbBasketShare } from "react-icons/tb";
import NoteBox from "@/Components/NoteBox";

export default function OrderDetail({ auth }) {
    const { order } = usePage().props;
    const { data, setData, post, put, get } = useForm({
        id: "",
        status: "",
        order_code: order.order_code,
    });

    const formatNumber = (number) =>
        new Intl.NumberFormat("tr-TR").format(number);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return `${date.toLocaleDateString(
            "tr-TR",
            options
        )} ${date.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    const quantity = (orderItems) =>
        orderItems.reduce((total, item) => total + item.quantity, 0);

    const [open, setOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setData("id", "");
        setData("status", "");
    };
    const openModalOrder = () => {
        setOpenOrder(true);
    };

    const closeModalOrder = () => {
        setOpenOrder(false);
        setData("status", "");
    };

    const updateOrder = (e) => {
        e.preventDefault();
        put(route("update.orderDetail", { id: data.id }), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setData("id", "");
                setData("status", "");
            },
        });
    };
    const updateAllOrder = (e) => {
        e.preventDefault();
        put(route("allUpdate.orderDetail", { order_code: data.order_code }), {
            preserveScroll: true,
            onSuccess: () => {
                closeModalOrder();
                setData("status", "");
            },
        });
    };

    const handleButtonClick = (itemId) => {
        setData("id", itemId);
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

            <Modal show={open} onClose={closeModal} maxWidth="xl">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">
                            Sipariş Durumunu Güncelle
                        </h2>
                        <button
                            type="button"
                            className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 focus:outline-none transition"
                            onClick={closeModal}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <form onSubmit={updateOrder} className="mt-4">
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="block w-full font-medium p-2 border border-gray-300 rounded-md"
                        >
                            <option value="" className="font-medium">
                                Durumunu Güncelleyin
                            </option>
                            <option
                                value="Siparişiniz hazırlaniyor"
                                className="font-medium"
                            >
                                Siparişiniz hazırlaniyor
                            </option>
                            <option
                                value="Kargoya verildi"
                                className="font-medium"
                            >
                                Kargoya verildi
                            </option>
                            <option
                                className="font-medium"
                                value="İptal edildi"
                            >
                                Siparişi İptal et
                            </option>
                        </select>
                        <div className="flex h-6 gap-1 items-center  text-sm">
                            {data.status === "Siparişiniz hazırlaniyor" && (
                                <>
                                    <MdOutlineInfo />
                                    <p>
                                        Siparişiniz hazırlanıdı ve en kısa
                                        sürede kargoya verilecektir.
                                    </p>
                                </>
                            )}
                            {data.status === "Kargoya verildi" && (
                                <>
                                    <MdOutlineInfo />
                                    <p>
                                        Siparişiniz kargoya verildi. Kargo takip
                                        numaranızla gönderinizi
                                        izleyebilirsiniz.
                                    </p>
                                </>
                            )}
                            {data.status === "İptal edildi" && (
                                <>
                                    <MdOutlineInfo />
                                    <p>
                                        Siparişiniz iptal edildi. Mağaza puanı
                                        ve ürün gösterimi etkilenebilir.
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="mt-3 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal}>
                                Kapat
                            </SecondaryButton>
                            <PrimaryButton type="submit">Kaydet</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal show={openOrder} onClose={closeModalOrder} maxWidth="xl">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">
                            Toplu Sipariş Durumunu Güncelle
                        </h2>
                        <button
                            type="button"
                            className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 focus:outline-none transition"
                            onClick={closeModalOrder}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <form onSubmit={updateAllOrder} className="mt-4">
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="block w-full font-medium p-2 border border-gray-300 rounded-md"
                        >
                            <option value="" className="font-medium">
                                Durumunu Güncelleyin
                            </option>
                            <option
                                value="Siparişiniz hazırlaniyor"
                                className="font-medium"
                            >
                                Siparişler hazırlaniyor
                            </option>
                            <option
                                value="Kargoya verildi"
                                className="font-medium"
                            >
                                Siparişler Kargoya verildi
                            </option>
                            <option
                                className="font-medium"
                                value="İptal edildi"
                            >
                                Siparişler İptal et
                            </option>
                        </select>
                        <div className="flex h-6 gap-1 items-center  text-sm">
                            <MdOutlineInfo />
                            {data.status === "" && (
                                <>
                                    <p>Secimiz Siparişiniz bütün etkilicek.</p>
                                </>
                            )}
                            {data.status === "Siparişiniz hazırlaniyor" && (
                                <>
                                    <p>
                                        Sipariş hazırlanıdı ve kısa sürede
                                        kargoyacak.
                                    </p>
                                </>
                            )}
                            {data.status === "Kargoya verildi" && (
                                <>
                                    <p>
                                        Sipariş kargoya verildi. Kargo takip
                                        numaranızla gönderinizi
                                        izleyebilirsiniz.
                                    </p>
                                </>
                            )}
                            {data.status === "İptal edildi" && (
                                <>
                                    <p>
                                        Siparişiniz iptal edildi. Mağaza puanı
                                        ve ürün gösterimi etkilenebilir.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="mt-3 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModalOrder}>
                                Kapat
                            </SecondaryButton>
                            <PrimaryButton type="submit">Kaydet</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

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
                                <th scope="col" className="p-3 border">
                                    <div className="flex justify-center">
                                        <OutlineButton
                                            onClick={() => {
                                                openModalOrder();
                                            }}
                                        >
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
                                        className="px-4 w-[34%] text-sm py-2 border font-medium text-gray-900"
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
                                                            ? `${item.product.name.slice(
                                                                  0,
                                                                  40
                                                              )}...`
                                                            : item.product.name}
                                                    </p>
                                                    <Link
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
                                        {item.status == "İptal edildi" && (
                                            <NoteBox
                                                icon={TbBasketCancel}
                                                color="red"
                                            >
                                                {item.status}
                                            </NoteBox>
                                        )}
                                        {item.status == "Sipariş alındı" && (
                                            <NoteBox
                                                icon={TbBasket}
                                                color="blue"
                                            >
                                                {item.status}
                                            </NoteBox>
                                        )}
                                        {item.status ==
                                            "Siparişiniz hazırlaniyor" && (
                                            <NoteBox
                                                icon={TbBasketShare}
                                                color="teal"
                                            >
                                                {item.status}
                                            </NoteBox>
                                        )}
                                        {item.status == "Kargoya verildi" && (
                                            <NoteBox
                                                icon={TbBasketPin}
                                                color="emerald"
                                            >
                                                {item.status}
                                            </NoteBox>
                                        )}
                                        {item.status == "Teslim edildi" && (
                                            <NoteBox
                                                icon={TbBasketCheck}
                                                color="green"
                                            >
                                                {item.status}
                                            </NoteBox>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border w-[14%]">
                                        <div className="flex justify-center">
                                            <PrimaryButton
                                                disabled={
                                                    item.status ==
                                                    "İptal edildi"
                                                }
                                                onClick={() => {
                                                    openModal();
                                                    setData("id", item.id);
                                                }}
                                            >
                                                Güncelle
                                            </PrimaryButton>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border w-[14%]">
                                        <div className="flex justify-center">
                                            <a
                                                className={`inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 `}
                                                href={`/store/order/all-pdf/${order.order_code}`}
                                            >
                                                Ürün Fatura
                                            </a>
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
