import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ProductContainer from "@/Components/ProductContainer";
import Swiper from "@/Components/Swiper";
import ProductSwiper from "@/Components/ProductSwiper";

export default function Home({
    auth,
    categories,
    bestSellingProducts,
    stores,
    cart,
}) {
    return (
        <HomeLayout auth={auth} categories={categories} cart={cart}>
            <Head title="Welcome" />

            <Swiper slidesPerViewState={9} slidesPerGroupState={1}>
                {stores.map((store) => (
                    <div
                        key={store.id}
                        className="flex-col select-none cursor-pointer flex items-center w-[130px] p-2 group"
                    >
                        {store.logo && (
                            <img
                                src={store.logo}
                                className="rounded-full w-[70px] h-auto border-2 transition duration-300 border-gray-300 group-hover:border-blue-500"
                                alt={`${store.store_name} logo`}
                            />
                        )}
                        <p className="font-bold text-sm mt-2 text-center transition duration-300 group-hover:text-blue-500">
                            {store.store_name}
                        </p>
                    </div>
                ))}
            </Swiper>

            <div className="my-7 bg-blue-100 mt-14 px-4 pt-4 rounded-xl">
                <p className="text-xl font-bold">Popüler Ürünler</p>
                <ProductSwiper
                    products={bestSellingProducts}
                    SwiperID="2"
                    classNamebutton={`after:!bg-white !bg-white hover:!bg-blue-500 hover:!text-white border hover:border-blue-500 after:p-2 after:rounded-full after:!text-[20px] after:!text-center rounded-full hover:shadow-[0px_0px_15px_0px_rgba(59,130,246,0.7)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.4)] after:!flex after:items-center after:!justify-center !w-[50px] !h-[50px]`}
                />
            </div>
        </HomeLayout>
    );
}
