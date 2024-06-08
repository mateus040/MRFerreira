import { FaBars } from "react-icons/fa6";
import { useState } from "react";

export default function Header() {
  const [menuResponsive, setMenuResponsive] = useState<boolean>(false);

  const handleClick = () => {
    setMenuResponsive((state) => !state);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-8 lg:px-20 py-5 mx-auto bg-white shadow-lg">
        <a href="#home">
          <p className="text-xl font-semibold">MR Ferreira</p>
          <p className="font-semibold mx-4" style={{ fontSize: "12px" }}>
            Representações
          </p>
        </a>
        <div
          className={`nav-links duration-500 lg:static absolute bg-white lg:min-h-fit min-h-[60vh] left-0 ${
            menuResponsive ? "top-full" : "top-[-500%]"
          } lg:w-auto w-full flex items-center px-5 shadow-lg lg:shadow-none`}
        >
          <ul className="flex lg:flex-row flex-col lg:items-center gap-8">
            <li className="mx-4 lg:mx-0">
              <a href="#home" className="hover:text-gray-500 font-semibold">
                Início
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#produtos" className="hover:text-gray-500 font-semibold">
                Produtos
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#empresas" className="hover:text-gray-500 font-semibold">
                Empresas
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#sobre" className="hover:text-gray-500 font-semibold">
                Sobre
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#contato" className="hover:text-gray-500 font-semibold">
                Contato
              </a>
            </li>
          </ul>
        </div>

        <div className="flex lg:hidden items-center gap-6">
          <div className="hover:bg-white hover:text-black p-3 rounded transition-all">
            <FaBars
              className="text-xl cursor-pointer menu"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
