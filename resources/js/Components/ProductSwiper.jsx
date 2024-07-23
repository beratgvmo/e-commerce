import React, { useRef } from "react";
import { Navigation, Virtual, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "./Product";

export default function ProductSwiper({
    products,
    SwiperID = "1",
    classNamebutton = "",
}) {
    const swiperRef = useRef(null);

    return (
        <div className={`w-full mt-5 mb-10 relative h-[26.5rem] `}>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Virtual, Navigation, Pagination]}
                slidesPerView={5}
                spaceBetween={10}
                slidesPerGroup={4}
                pagination={{ el: `.pagination-${SwiperID}`, clickable: true }}
                navigation={{
                    nextEl: `.swiper-next-${SwiperID}`,
                    prevEl: `.swiper-prev-${SwiperID}`,
                }}
                virtual
            >
                {products.map((product, index) => (
                    <SwiperSlide key={product.id} virtualIndex={index}>
                        <Product product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute w-full inset-y-[45%]">
                <div className="absolute -left-14 flex items-center">
                    <div
                        className={
                            `swiper-prev-${SwiperID} swiper-button-prev !text-gray-400 hover:!text-gray-600 transition duration-300 cursor-pointer` +
                            classNamebutton
                        }
                    ></div>
                </div>
                <div className="absolute -right-14 flex items-center">
                    <div
                        className={
                            `swiper-next-${SwiperID} swiper-button-next  !text-gray-400 hover:!text-gray-600  transition duration-300 cursor-pointer` +
                            classNamebutton
                        }
                    ></div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <div
                    className={`pagination-${SwiperID} swiper-pagination`}
                ></div>
            </div>
        </div>
    );
}
