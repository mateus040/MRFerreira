import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ProdutoModel from "../../../interface/models/ProdutoModel";
import FornecedorModel from "../../../interface/models/FornecedorModel";
import { formatNameForURL } from "../../../utils/formatNameForURL";

interface Props {
  products: ProdutoModel[];
  providers: FornecedorModel[];
  fotos: { [key: string]: string };
  // loadingProducts: boolean;
  // loadingProviders: boolean;
}

export const SectionProducts = ({ products, providers, fotos }: Props) => {
  // Processando os produtos para incluir os dados do fornecedor e URLs formatadas
  const processedProducts = products.slice(0, 5).map((product) => {
    const provider = providers.find(
      (provider) => provider.id === product.id_provider
    );
    const providerNameURL = provider ? formatNameForURL(provider.nome) : "";
    const productNameURL = formatNameForURL(product.nome);

    return {
      ...product,
      providerName: provider?.nome,
      providerNameURL,
      productNameURL,
    };
  });

  return (
    <div className="px-8 lg:px-20 py-12 container mx-auto" id="produtos">
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
          {processedProducts.map((product) => (
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
                    {product.providerName}
                  </p>
                  <Link
                    to={`/fornecedor/${product.providerNameURL}/${product.productNameURL}`}
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
