import { useEffect, useState } from "react";
import ProdutoModel from "../../interface/models/ProdutoModel";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { FaWhatsapp } from "react-icons/fa6";
import MainLayout from "../../components/layouts/main";
import ServiceResult from "../../interface/service-result";
import api from "../../services/api-client";
import AOS from "aos";
import formatNameForURL from "../../utils/formatNameForURL";

export default function ProductInfo() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { productId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<ProdutoModel>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchProductInfo = async () => {
    setLoading(true);

    api
      .get<ServiceResult<ProdutoModel>>(
        `https://mrferreira-api.vercel.app/api/api/products/${productId}`
      )
      .then(({ data }) => {
        setProductInfo(data.results as ProdutoModel);
        setImageUrl(data.results?.foto_url || null);
      })
      // .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const whatsappMessage = productInfo
    ? `Olá! Gostaria de saber mais informações sobre o produto ${
        productInfo.nome
      }. Link do produto: https://mrferreirarepresentacoes.shop/produtos/${productId}?produto=${formatNameForURL(
        productInfo.nome
      )}`
    : "";

  return (
    <MainLayout contact>
      {loading && <Loading centered className="mt-28" />}

      {!loading && productInfo && (
        <div className="bg-white">
          <div
            className="px-8 lg:px-12 py-12 mt-10 container mx-auto"
            data-aos="zoom-in"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-6 flex items-center justify-center lg:-ms-10">
                {imageUrl && (
                  <img src={imageUrl} className="h-80 object-contain" />
                )}
              </div>

              <div className="col-span-6">
                <p className="text-sm mb-5 font-medium text-zinc-700 tracking-wider">
                  Home/
                  {productInfo.category.nome}
                </p>
                <p className="text-4xl font-bold uppercase mb-1">
                  {productInfo?.nome}
                </p>
                {productInfo.linha && (
                  <p className="mt-5 font-bold text-lg">
                    Linha:{" "}
                    <span className="font-normal">{productInfo?.linha}</span>
                  </p>
                )}
                <div className="flex flex-col lg:flex-row lg:items-center mt-5">
                  {productInfo.altura && (
                    <p className="font-bold">
                      Altura:{" "}
                      <span className="font-normal">{productInfo?.altura}</span>
                    </p>
                  )}
                  {productInfo.comprimento && (
                    <p className="font-bold lg:mx-4 mt-3 lg:mt-0">
                      Comprimento:{" "}
                      <span className="font-normal">
                        {productInfo?.comprimento}
                      </span>
                    </p>
                  )}
                  {productInfo.profundidade && (
                    <p className="font-bold mt-3 lg:mt-0">
                      Profundidade:{" "}
                      <span className="font-normal">
                        {productInfo?.profundidade}
                      </span>
                    </p>
                  )}
                  {productInfo.peso && (
                    <p className="font-bold lg:mx-4 mt-3 lg:mt-0">
                      Peso suportado:{" "}
                      <span className="font-normal">{productInfo?.peso}</span>
                    </p>
                  )}
                </div>
                {productInfo.materiais && (
                  <p className="mt-8 lg:mt-7 font-bold text-base">
                    Mateirais:{" "}
                    <span className="font-normal">
                      {productInfo?.materiais}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <p className="mt-12 text-xl tracking-widest font-bold uppercase">
              Detalhes do produto
            </p>

            <p className="mt-3">{productInfo?.descricao}</p>

            <div className="flex flex-col items-center justify-center mt-16">
              <p className="font-semibold text-base text-center">
                Entre em contato conosco pelo WhatsApp e saiba mais sobre o
                produto!
              </p>

              <Link
                to={`https://api.whatsapp.com/send?phone=5514997831356&text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                className="mt-4 flex items-center justify-center w-full lg:w-[290px] rounded px-8 py-2 bg-[#25d366] hover:bg-[#1d9148] text-white transition-all"
              >
                <FaWhatsapp size={24} />
                <span className="mx-8">Saiba mais!</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {!loading && !productInfo && (
        <div className="flex items-center justify-center text-gray-500 text-xl mt-28">
          Informações do produto não encontradas.
        </div>
      )}
    </MainLayout>
  );
}
