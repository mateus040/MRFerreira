import moment from "moment";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { useProviderStore } from "../stores/providers.store";
import { Link } from "react-router-dom";
import formatNameForURL from "../utils/formatNameForURL";

export const Footer = () => {
  const { providers } = useProviderStore();

  return (
    <div className="bg-white shadow-lg">
      <div className="px-8 lg:px-24 py-12 container mx-auto">
        <div className="grid grid-cols-12 xl:gap-16 mb-10">
          <div className="col-span-12 xl:col-span-4 xl:-ms-10">
            <img src="/images/logo-transparente.png" className="h-[120px]" />
            <p className="text-md text-gray-600 max-w-[350px] -mt-2">
              Confira nossas redes sociais:
            </p>
            <div className="flex items-start justify-start mt-3">
              <div className="bg-[#eee] p-3 text-xl rounded-md cursor-pointer hover:bg-black hover:text-white transition-all">
                <FaFacebook className="" />
              </div>
              <div className="bg-[#eee] p-3 text-xl rounded-md cursor-pointer hover:bg-black hover:text-white transition-all mx-2">
                <FaInstagram className="text-xl" />
              </div>
              <div className="bg-[#eee] p-3 text-xl rounded-md cursor-pointer hover:bg-black hover:text-white transition-all">
                <FaLinkedin className="text-xl" />
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-8 mt-10 xl:mt-0 -ms-0 md:-lg-10 xl:-ms-0">
            <div className="flex flex-col xl:flex-row items-start justify-between">
              <div className="flex flex-col items-start justify-start mb-5 xl:mb-0">
                <p className="text-2xl font-semibold mb-5">Contato</p>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaPhone />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    (14) 99783-1356
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaEnvelope />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    mr.ferreira@mrferreira
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <IoLocationSharp />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Jaú, SP
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start justify-start mb-5 xl:mb-0">
                <p className="text-2xl font-semibold mb-5">Parcerias</p>
                {providers.map((provider) => (
                  <Link
                    to={`/empresa/${provider.id}?empresa=${formatNameForURL(
                      provider.nome
                    )}`}
                    className="flex items-center justify-center cursor-pointer mb-5"
                    key={provider.id}
                  >
                    <FaArrowRight />
                    <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                      {provider.nome}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-start justify-start mb-5 xl:mb-0">
                <p className="text-2xl font-semibold mb-5">Links</p>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Início
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Empresas
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Sobre
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Contato
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <hr className="w-full mb-6 border-t border-gray-300" />
          <p className="text-md text-gray-600 text-center md:text-start">
            {moment().format("YYYY")} &copy;{" "}
            <span className="font-semibold">MR Ferreira Representações.</span>{" "}
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
