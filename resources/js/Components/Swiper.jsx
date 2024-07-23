import React, { useRef } from "react";
import { Navigation, Virtual, Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Swiper({
    spaceBetweenState = 10,
    slidesPerViewState = 5,
    slidesPerGroupState = 4,
    SwiperID = "1",
    children,
}) {
    const swiperRef = useRef(null);

    return (
        <div className="w-full mt-5 mb-10 relative h-[6rem]">
            <SwiperReact
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Virtual, Navigation, Pagination]}
                slidesPerView={slidesPerViewState}
                spaceBetween={spaceBetweenState}
                slidesPerGroup={slidesPerGroupState}
                navigation={{
                    nextEl: `.swiper-next-${SwiperID}`,
                    prevEl: `.swiper-prev-${SwiperID}`,
                }}
                virtual
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </SwiperReact>
            <div className="absolute w-full inset-y-[45%]">
                <div className="absolute -left-16 flex items-center">
                    <div
                        className={`swiper-prev-${SwiperID} swiper-button-prev after:!text-[20px] after:!font-bold !text-gray-400 hover:!text-gray-600 transition duration-300 cursor-pointer`}
                    ></div>
                </div>
                <div className="absolute -right-16 flex items-center">
                    <div
                        className={`swiper-next-${SwiperID} swiper-button-next  after:!text-[20px] after:!font-bold !text-gray-400 hover:!text-gray-600 transition duration-300 cursor-pointer`}
                    ></div>
                </div>
            </div>
        </div>
    );
}

// {
//     products.map((product, index) => (
//         <SwiperSlide key={product.id} virtualIndex={index}>
//             <Product product={product} />
//         </SwiperSlide>
//     ));
// }
