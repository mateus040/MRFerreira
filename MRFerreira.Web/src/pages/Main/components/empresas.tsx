import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Link } from "react-router-dom";

export default function Empresas() {
  return (
    <div className="px-8 lg:px-20 py-12 mx-auto" id="empresas">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Veja nossas empresas parceiras
        </h1>
        <p className="text-md text-center mt-3 text-gray-600">
          Conheça as empresa que fazem parte de nosso trabalho
        </p>
      </div>
      <div className="mt-8">
        <Swiper
          className="empresa-slider"
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 7500, disableOnInteraction: false }}
          initialSlide={0}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="product-slider bg-white px-20 py-5 rounded-lg ">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/logo.png" className="h-40 object-contain" />
                </div>

                <p className="mt-3 text-xl font-semibold text-center">
                  MovelFar
                </p>
                <Link
                  to="/"
                  className="mt-8 mb-8 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all text-center"
                >
                  Ver produtos
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="product-slider bg-white px-20 py-5 rounded-lg ">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/logo.png" className="h-40 object-contain" />
                </div>

                <p className="mt-3 text-xl font-semibold text-center">
                  MovelFar
                </p>
                <Link
                  to="/"
                  className="mt-8 mb-8 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all text-center"
                >
                  Ver produtos
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="product-slider bg-white px-20 py-5 rounded-lg ">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/logo.png" className="h-40 object-contain" />
                </div>

                <p className="mt-3 text-xl font-semibold text-center">
                  MovelFar
                </p>
                <Link
                  to="/"
                  className="mt-8 mb-8 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all text-center"
                >
                  Ver produtos
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
