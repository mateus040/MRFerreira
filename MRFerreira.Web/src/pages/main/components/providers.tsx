import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

import "swiper/css";
import { Link } from "react-router-dom";
import FornecedorModel from "../../../interface/models/FornecedorModel";
import formatNameForURL from "../../../utils/formatNameForURL";
import { useEffect } from "react";
import Loading from "../../../components/loading";

interface Props {
  providers: FornecedorModel[];
  logos: { [key: string]: string };
  loading: boolean;
}

export const SectionProviders = ({ providers, logos, loading }: Props) => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div
      className="px-8 lg:px-20 py-12 container mx-auto"
      id="empresas"
      data-aos="fade-left"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Veja nossas empresas parceiras
        </h1>
        <p className="text-md text-center mt-3 text-gray-600">
          Conheça as empresa que fazem parte de nosso trabalho
        </p>
      </div>

      {loading && (
        <div className="mt-8">
          <Loading centered />
        </div>
      )}

      {!loading && (
        <div className="mt-8" data-aos="fade-left">
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
              <SwiperSlide key={provider.id}>
                <div className="product-slider bg-white px-6 py-8 rounded-lg flex flex-col justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <div className="hover:scale-105 transition-transform cursor-pointer">
                      {logos[provider.logo] && (
                        <img
                          src={logos[provider.logo]}
                          className="h-52 object-contain"
                        />
                      )}
                    </div>

                    <p className="mt-4 text-lg font-semibold text-center">
                      {provider.nome}
                    </p>
                  </div>

                  <div className="flex justify-center mt-8">
                    <Link
                      to={`/empresa/${provider.id}?empresa=${formatNameForURL(
                        provider.nome
                      )}`}
                      className="flex items-center justify-center w-[230px] border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                    >
                      Ver catálogo
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {!loading && providers.length === 0 && (
            <div className="flex items-center justify-center text-gray-500 text-xl mt-8">
              Nenhuma empresa encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
