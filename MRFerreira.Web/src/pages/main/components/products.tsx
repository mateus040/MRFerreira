import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

import "swiper/css";
import ProdutoModel from "../../../interface/models/ProdutoModel";
import formatNameForURL from "../../../utils/formatNameForURL";
import { useEffect } from "react";

interface Props {
  products: ProdutoModel[];
  fotos: { [key: string]: string };
  // loadingProducts: boolean;
}

export const SectionProducts = ({ products, fotos }: Props) => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="px-8 lg:px-20 py-12 container mx-auto" id="produtos" data-aos="fade-right">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Conheça alguns de nossos produtos
        </h1>
        <p className="text-md mt-3 text-gray-600">
          Fique por dentro dos últimos lançamentos
        </p>
      </div>

      {/* {loadingProducts && loadingProviders && <SkeletonLoadingCards />} */}

      {/* {!loadingProducts && !loadingProviders && ( */}
      <div className="mt-8">
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
              <div className="product-slider bg-white px-20 py-16 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:scale-105 transition-transform cursor-pointer">
                    {fotos[product.foto] && (
                      <img
                        src={fotos[product.foto]}
                        className="h-52 object-contain"
                      />
                    )}
                  </div>

                  <p className="mt-8 text-xl font-semibold text-center">
                    {product.nome}
                  </p>
                  <p className="mt-3 text-md text-center">
                    {product.provider.nome}
                  </p>
                  <Link
                    to={`/produtos/${
                      product.id
                    }?produto=${formatNameForURL(product.nome)}`}
                    className="flex items-center justify-center w-[230px] mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* )} */}
    </div>
  );
};
