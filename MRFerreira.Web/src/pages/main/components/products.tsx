import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

import "swiper/css";
import ProdutoModel from "../../../interface/models/ProdutoModel";
import formatNameForURL from "../../../utils/formatNameForURL";
import { useEffect } from "react";
import Loading from "../../../components/loading";

interface Props {
  products: ProdutoModel[];
  fotos: { [key: string]: string };
  loading: boolean;
}

export const SectionProducts = ({ products, fotos, loading }: Props) => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div
      className="px-8 lg:px-20 py-12 container mx-auto"
      id="produtos"
      data-aos="fade-right"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Conheça alguns de nossos produtos
        </h1>
        <p className="text-md mt-3 text-gray-600">
          Fique por dentro dos últimos lançamentos
        </p>
      </div>

      {loading && (
        <div className="mt-8">
          <Loading centered />
        </div>
      )}

      {!loading && (
        <div className="mt-8" data-aos="fade-right">
          <Swiper
            className="product-slider"
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
            {products.slice(0, 5).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-slider bg-white px-6 py-8 rounded-lg flex flex-col justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <div className="hover:scale-105 transition-transform cursor-pointer">
                      {fotos[product.foto] && (
                        <img
                          src={fotos[product.foto]}
                          className="h-52 object-contain"
                        />
                      )}
                    </div>

                    <p className="mt-4 text-xl font-semibold text-center">
                      {product.nome}
                    </p>
                    <p className="mt-3 text-md text-center">
                      {product.provider.nome}
                    </p>

                    <div className="flex justify-center mt-8">
                      <Link
                        to={`/produtos/${product.id}?produto=${formatNameForURL(
                          product.nome
                        )}`}
                        className="flex items-center justify-center w-[230px] border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {!loading && products.length === 0 && (
            <div className="flex items-center justify-center text-gray-500 text-xl mt-8">
              Nenhuma produto encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
