import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="bg-white shadow-lg">
      <div className="px-8 lg:px-24 py-12 mx-auto">
        <div className="grid grid-cols-12 gap-10 xl:gap-5 mb-10">
          <div className="col-span-12 xl:col-span-4">
            <img src="/images/logo-transparente.png" className="h-[120px]" />
            <p className="text-md text-gray-600 max-w-[350px]">
              Lorem Ipsum Dolor Sit Amet, Adipiscing Elit. Labore, Aspernatur!
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
          <div className="col-span-12 xl:col-span-8">
            <div className="flex flex-col xl:flex-row items-start justify-between">
              <div className="flex flex-col items-start justify-start mb-5 xl:mb-0">
                <p className="text-2xl font-semibold mb-5">Contato</p>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaPhone />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    + 123-456-7890
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaPhone />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    + 123-456-7890
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

              {/* TODO: GET de empresas (nome) */}
              <div className="flex flex-col items-start justify-start mb-5 xl:mb-0">
                <p className="text-2xl font-semibold mb-5">Parcerias</p>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    MovelFar
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Móveis Otto
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Jahu Flex
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    OR Design
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Bigplast
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    MogiMax
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    GRP
                  </p>
                </div>
                <div className="flex items-center justify-center cursor-pointer mb-5">
                  <FaArrowRight />
                  <p className="text-md text-gray-600 mx-3 hover:text-black transition-all">
                    Arruda Cadeiras
                  </p>
                </div>
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
            &copy; Copyright 2024. Todos os direitos reservados por{" "}
            <span className="font-semibold">MR Ferreira Representações.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
