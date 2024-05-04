import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Produtos() {
  return (
    <div className="px-8 lg:px-20 py-12 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">
          Conheça alguns de nossos produtos
        </h1>
        <p className="text-md mt-3 text-gray-600">
          Fique por dentro das últimas novidades
        </p>
      </div>
      <div className="mt-5">
        <Swiper
          className="product-slider"
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 7500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1020: { slidesPerView: 3 },
          }}
          initialSlide={0}
        >
          <SwiperSlide>
            <div className="product-slider bg-white p-24">teste</div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
