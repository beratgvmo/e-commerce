import React, { useRef } from "react";
import { Navigation, Virtual, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles (remove the CSS imports if you import these styles elsewhere)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Product from "./Product";

export default function ProductSwiper({ products }) {
    const swiperRef = useRef(null);

    return (
        <div className="w-full mt-5 mb-10 relative h-[26rem]">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Virtual, Navigation, Pagination]}
                slidesPerView={5}
                spaceBetween={10}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                virtual
            >
                {products.map((product, index) => (
                    <SwiperSlide key={product.id} virtualIndex={index}>
                        <Product product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute w-full top-52">
                <div className="absolute -left-16 flex items-center">
                    <div className="swiper-button-prev !text-gray-400  rounded-full cursor-pointer"></div>
                </div>
                <div className="absolute -right-16 flex items-center">
                    <div className="swiper-button-next !text-gray-400 cursor-pointer"></div>
                </div>
            </div>
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <div className="swiper-pagination rounded-full"></div>
            </div>
        </div>
    );
}
