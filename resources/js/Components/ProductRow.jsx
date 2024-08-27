import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    TbArrowRight,
    TbEyeOff,
    TbMenu,
    TbMenuOrder,
    TbPencil,
    TbX,
} from "react-icons/tb";
import { Transition } from "@headlessui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PriceInput from "./PriceInput";
import NumberInput from "./NumberInput";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import { FaArrowsAltV } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuUploadCloud } from "react-icons/lu";

export default function ProductRow({ product }) {
    const {
        data,
        setData,
        patch,
        post,
        delete: destroy,
        errors,
    } = useForm({
        price: product.price,
        discounted_price: product.discounted_price,
        stock_quantity: product.stock_quantity,
        images: product.images,
        imagesAdd: [],
    });

    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(data.images);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        const updatedItems = reorderedItems.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        setData("images", updatedItems);
    };

    useEffect(() => {
        if (needsUpdate) {
            const timeoutId = setTimeout(() => {
                patch(route("store.updateNumbers", product.id), {
                    preserveState: true,
                    preserveScroll: true,
                });
                setNeedsUpdate(false);
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [needsUpdate, patch]);

    useEffect(() => {
        if (product) {
            setData({
                price: FormatNumber(product.price),
                discounted_price: FormatNumber(product.discounted_price),
                stock_quantity: product.stock_quantity,
                images: product.images,
            });
        }
    }, [product]);

    const handlePriceChange = (e) => {
        setData("price", e.target.value);
        setNeedsUpdate(true);
    };

    const handleDiscountedPriceChange = (e) => {
        setData("discounted_price", e.target.value);
        setNeedsUpdate(true);
    };

    const handleStockQuantityChange = (e) => {
        setData("stock_quantity", e.target.value);
        setNeedsUpdate(true);
    };

    const handleImageRemove = (e, id) => {
        e.preventDefault();
        destroy(route("store.imgDestroy", id), {
            preserveScroll: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("store.updateImgOrder"), {
            preserveScroll: true,
        });
    };

    const FormatNumber = (value) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

    const [isHoveredDrop, setIsHoveredDrop] = useState(false);

    const handleImageChange = (e, id) => {
        setData("imagesAdd", e.target.files);
        e.preventDefault();

        post(route("store.productImgAdd", id), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black z-50 bg-opacity-50 transition-opacity ${
                    isDrawerOpen ? "opacity-100" : "opacity-0"
                } ${
                    isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
                <div
                    className={`fixed top-0 left-0 w-[28rem] bg-white h-full shadow-lg transition-transform ${
                        isDrawerOpen ? "-translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <form
                        onSubmit={(e) => {
                            submit(e);
                        }}
                    >
                        <div className="px-10 py-5">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl text-gray-800 font-semibold">
                                    Ürün Resimleri Düzeleme
                                </h2>
                                <button
                                    type="button"
                                    className="rounded-full p-2 inline-flex items-center justify-center text-black bg-gray-200 hover:text-gray-700 hover:bg-gray-300 focus:outline-none transition"
                                    onClick={toggleDrawer}
                                >
                                    <TbX size={25} />
                                </button>
                            </div>
                            <div className="h-[36rem] mt-3">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <ul
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {data.images.map(
                                                    (item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id.toString()}
                                                            index={index}
                                                        >
                                                            {(
                                                                provided,
                                                                snapshot
                                                            ) => (
                                                                <li
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="py-2"
                                                                    onMouseEnter={() =>
                                                                        setIsHoveredDrop(
                                                                            index +
                                                                                1
                                                                        )
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setIsHoveredDrop(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    <div
                                                                        className={`px-3 py-2 flex text-gray-600 bg-gray-50 rounded border border-gray-300 items-center justify-between
                                                                                ${
                                                                                    snapshot.isDragging ||
                                                                                    isHoveredDrop ==
                                                                                        index +
                                                                                            1
                                                                                        ? "border-gray-500"
                                                                                        : "border-gray-300"
                                                                                }`}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            {snapshot.isDragging ||
                                                                            isHoveredDrop ==
                                                                                index +
                                                                                    1 ? (
                                                                                <TbMenuOrder
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    className="mr-1"
                                                                                />
                                                                            ) : (
                                                                                <TbMenu
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    className="mr-1"
                                                                                />
                                                                            )}
                                                                            <img
                                                                                src={
                                                                                    item.img
                                                                                }
                                                                                alt={
                                                                                    item.name
                                                                                }
                                                                                className="rounded-md mr-2 border select-none w-16 h-full object-cover transition-transform"
                                                                            />
                                                                            <p>
                                                                                Resim
                                                                                Gösterin
                                                                                sırası{" "}
                                                                                {index +
                                                                                    1}
                                                                            </p>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleImageRemove(
                                                                                    e,
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="text-gray-50 text-lg bg-red-500 rounded-full h-8 w-8 hover:text-gray-200 hover:bg-red-600 flex items-center justify-center transition"
                                                                        >
                                                                            <MdDelete />
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                {product.images.length < 6 && (
                                    <div className="flex items-center justify-center pt-2">
                                        <div className="h-20 w-full">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex h-full items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <LuUploadCloud className="w-8 h-8 mb-1 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500 font-semibold">
                                                        Ürün Resimi Yükle
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    multiple
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            e,
                                                            product.id
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 justify-between mt-7">
                                <OutlineButton
                                    onClick={toggleDrawer}
                                    className="!text-sm w-full flex justify-center"
                                >
                                    Vazgeç
                                </OutlineButton>
                                <Button
                                    type="submit"
                                    className="!text-sm w-full flex justify-center"
                                >
                                    sırayı Kayıt et
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <tr key={product.id} className="bg-white border-t">
                <th className="px-4 w-[33%] text-sm py-2 font-medium text-gray-900">
                    <div className="flex items-center">
                        <div
                            className="relative mr-4 overflow-hidden rounded-md border-2"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                className={`select-none w-20 h-full object-cover transition-transform duration-500 ${
                                    isHovered
                                        ? "scale-125 blur-sm"
                                        : "scale-100 blur-0"
                                }`}
                                loading="lazy"
                                src={product.images[0]?.img}
                                alt={product.name}
                            />
                            <Transition
                                show={isHovered}
                                enter="transition-opacity duration-300 ease-out"
                                enterFrom="opacity-0 scale-75"
                                enterTo="opacity-100 scale-100"
                                leave="transition-opacity duration-300 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-50 scale-0"
                            >
                                <button
                                    onClick={toggleDrawer}
                                    className="absolute inset-0 flex items-center justify-center w-full h-full bg-blue-500 bg-opacity-80 rounded transform transition-transform duration-300"
                                >
                                    <TbPencil className="text-white text-2xl" />
                                </button>
                            </Transition>
                        </div>
                        <div>
                            <p className="text-sm mb-2">
                                {product.name.length > 60
                                    ? `${product.name.slice(0, 47)}...`
                                    : product.name}
                            </p>
                            <p className="text-gray-500 mt-2">
                                {product.category.name}
                            </p>
                        </div>
                    </div>
                </th>
                <td className="px-4 border w-[7%]">
                    <p className="bg-green-500 py-1 text-white rounded-full text-center">
                        %10.0
                    </p>
                </td>
                <td className="px-4 bg-green-50 font-black border w-[12%]">
                    <PriceInput
                        id="price"
                        name="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={handlePriceChange}
                    />
                </td>
                <td className="px-4 bg-blue-50 font-black border w-[12%]">
                    <PriceInput
                        id="discounted_price"
                        name="discounted_price"
                        className="mt-1 block w-full"
                        value={data.discounted_price}
                        onChange={handleDiscountedPriceChange}
                    />
                </td>
                <td className="px-4 bg-orange-50 border font-medium w-[10%]">
                    <NumberInput
                        id="stock_quantity"
                        name="stock_quantity"
                        className="mt-1 block w-full"
                        autoComplete="stock_quantity"
                        value={data.stock_quantity}
                        onChange={handleStockQuantityChange}
                    />
                </td>
                <td className="px-4 border w-[10%]">
                    <Link href={route("store.productUpdate", product.id)}>
                        <div className="font-medium flex text-blue-600 bg-blue-600/15 px-5 py-2 rounded hover:bg-blue-500/5 transition border border-transparent hover:border-blue-500">
                            <div className="bg-blue-600 p-1 rounded-full mr-1">
                                <TbPencil className="text-white" />
                            </div>
                            <p>Edit</p>
                        </div>
                    </Link>
                </td>
                <td className="px-4 w-[12%]">
                    {product.is_active ? (
                        <Link href={`/urun/${product.slug}`}>
                            <div className="font-medium text-green-600 bg-green-600/15 px-5 py-2 rounded transition border border-transparent hover:bg-green-500/5 hover:border-green-500">
                                <p className="flex items-center justify-center">
                                    Open for Sale
                                    <TbArrowRight className="ml-1" />
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <div className="font-medium text-red-600 bg-red-600/15 px-5 py-2 rounded">
                            <p className="flex items-center justify-center">
                                Closed for Sale
                                <TbEyeOff className="ml-1" />
                            </p>
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
}

{
    /* <Modal show={open} onClose={closeModal} maxWidth="lg">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">
                            Ürün Resmi Güncelle
                        </h2>
                        <button
                            type="button"
                            className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 focus:outline-none transition"
                            onClick={closeModal}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className="mt-4 mb-8">
                            <div className="flex items-center mb-0.5">
                                <InputLabel
                                    htmlFor="images"
                                    value="Ürün Görselleri"
                                />
                                <div className="flex items-center group">
                                    <HiMiniQuestionMarkCircle className="ml-1 mr-2 text-lg" />
                                    <div className="font-medium text-sm text-gray-200 bg-gray-800 rounded-xl px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        En az üç resim yüklemeniz gerekmektedir
                                    </div>
                                </div>
                            </div>
                            <div>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    padding: 8,
                                                    width: "100%",
                                                }}
                                            >
                                                {data.images.map(
                                                    (img, index) => (
                                                        <Draggable
                                                            key={img.id}
                                                            draggableId={img.id.toString()}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="flex justify-center mb-2"
                                                                >
                                                                    <div className="group w-full border">
                                                                        <img
                                                                            src={
                                                                                img.img
                                                                            }
                                                                            alt=""
                                                                            className="h-20 w-auto border-2 rounded-lg cursor-pointer p-2 mr-2 object-contain"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleImageRemove(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className="mt-2 text-gray-50 text-lg bg-red-500 rounded-full h-8 w-8 hover:text-gray-200 hover:bg-red-600 group-hover:flex flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            <MdDelete />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                {data.images.length < 6 && (
                                    <div className="flex items-center justify-center">
                                        <div className="w-44 h-44">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <LuUploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500 font-semibold">
                                                        Ürün Resimi Yükle
                                                    </p>
                                                    <p className="text-xs text-center text-gray-500">
                                                        PNG, JPG, WEBP, JPEG
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    multiple
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <InputError
                                message={errors.images}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <PrimaryButton onClick={closeModal}>
                                Çıkış
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal> */
}
