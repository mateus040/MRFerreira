import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";

export default function Header() {
  const [menuState, setMenuState] = useState<string>("menu");

  const onToggleMenu = () => {
    setMenuState((prevState) => (prevState === "menu" ? "close" : "menu"));
  };

  return (
    <>
      <div className="flex justify-between items-center px-8 lg:px-20 py-5 mx-auto bg-black shadow-lg">
        <div>
          <p className="text-xl font-semibold text-white">MR Ferreira</p>
          <p
            className="font-semibold mx-4 text-white"
            style={{ fontSize: "12px" }}
          >
            Representações
          </p>
        </div>
        <div
          className={`nav-links duration-500 lg:static absolute bg-black lg:min-h-fit min-h-[60vh] left-0 ${
            menuState === "menu" ? "top-[-100%]" : "top-[12.5%]"
          } lg:w-auto w-full flex items-center px-5 shadow-lg lg:shadow-none`}
        >
          <ul className="flex lg:flex-row flex-col lg:items-center gap-8">
            <li className="mx-4 lg:mx-0">
              <Link
                to="/"
                className="hover:text-gray-500 text-white font-semibold"
              >
                Produtos
              </Link>
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/"
                className="hover:text-gray-500 text-white font-semibold"
              >
                Features
              </Link>
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/"
                className="hover:text-gray-500 text-white font-semibold"
              >
                Empresas
              </Link>
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/"
                className="hover:text-gray-500 text-white font-semibold"
              >
                Sobre
              </Link>
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/"
                className="hover:text-gray-500 text-white font-semibold"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex lg:hidden items-center gap-6">
          <div className="hover:bg-white text-white hover:text-black p-3 rounded transition-all">
            <FaBars
              className="text-xl cursor-pointer menu"
              onClick={onToggleMenu}
            />
          </div>
        </div>
      </div>
    </>
  );
}
