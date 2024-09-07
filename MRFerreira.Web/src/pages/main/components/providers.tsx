import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Link } from "react-router-dom";
import FornecedorModel from "../../../interface/models/FornecedorModel";

interface Props {
  providers: FornecedorModel[];
  logos: { [key: string]: string };
  //loading: boolean;
}

export const SectionProviders = ({ providers, logos }: Props) => {
  return (
    <div className="px-8 lg:px-20 py-12 container mx-auto" id="empresas">
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
          loop={false}
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
          {providers.map((provider) => (
            <SwiperSlide>
              <div className="product-slider bg-white px-20 py-16 rounded-lg ">
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:scale-105 transition-transform cursor-pointer">
                    {logos[provider.logo] && (
                      <img
                        src={logos[provider.logo]}
                        className="h-52 object-contain"
                      />
                    )}
                  </div>

                  <p className="mt-8 text-xl font-semibold text-center">
                    {provider.nome}
                  </p>
                  <Link
                    to={`/fornecedor/${provider.id}`}
                    className="flex items-center justify-center w-[230px] mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                  >
                    Ver catálogo
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
