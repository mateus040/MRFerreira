import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function Produtos() {
  return (
    <div className="px-8 lg:px-20 py-12 mx-auto" id="produtos">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Conheça alguns de nossos produtos
        </h1>
        <p className="text-md mt-3 text-gray-600">
          Fique por dentro das últimas novidades
        </p>
      </div>
      <div className="mt-8">
        <Swiper
          className="product-slider"
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
            <div className="product-slider bg-white px-20 py-16 rounded-lg ">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/cadeira.jpg" className="h-52 object-contain" />
                </div>

                <p className="mt-8 text-xl font-semibold text-center">
                  Cadeira de escritório
                </p>
                <p className="mt-3 text-md text-center">Empresa</p>
                <Link
                  to="/"
                  className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                >
                  Ver no catálogo
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="product-slider bg-white px-20 py-16 rounded-lg ">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/cadeira.jpg" className="h-52 object-contain" />
                </div>

                <p className="mt-8 text-xl font-semibold text-center">
                  Cadeira de escritório
                </p>
                <p className="mt-3 text-md text-center">Empresa</p>
                <Link
                  to="/"
                  className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                >
                  Ver no catálogo
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="product-slider bg-white px-20 py-16 rounded-lg">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <img src="/images/cadeira.jpg" className="h-52 object-contain" />
                </div>

                <p className="mt-8 text-xl font-semibold text-center">
                  Cadeira de escritório
                </p>
                <p className="mt-3 text-md text-center">Empresa</p>
                <Link
                  to="/"
                  className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                >
                  Ver no catálogo
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
