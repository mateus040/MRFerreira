import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useRef, useState } from "react";

export default function Header() {
  const [menuState, setMenuState] = useState<string>("menu");

  const onToggleMenu = () => {
    setMenuState((prevState) => (prevState === "menu" ? "close" : "menu"));
  };

  return (
    <div>
      <div className="bg-black">
        <div className="flex justify-between items-center px-8 lg:px-20 py-5 mx-auto">
          <div>
            <p className="text-white text-xl font-bold">MR Ferreira</p>
            <p className="text-white font-semibold mx-5" style={{ fontSize: "12px" }}>Representações</p>
          </div>
          <div
            className={`nav-links duration-500 lg:static absolute bg-black lg:min-h-fit min-h-[60vh] left-0 ${
              menuState === "menu" ? "top-[-100%]" : "top-[12.5%]"
            } lg:w-auto w-full flex items-center px-5`}
          >
            <ul className="flex lg:flex-row flex-col lg:items-center gap-8">
              <li className="mx-4 lg:mx-0">
                <Link to="/" className="hover:text-gray-500 text-white">
                  Produtos
                </Link>
              </li>
              <li className="mx-4 lg:mx-0">
                <Link to="/" className="hover:text-gray-500 text-white">
                  Features
                </Link>
              </li>
              <li className="mx-4 lg:mx-0">
                <Link to="/" className="hover:text-gray-500 text-white">
                  Empresas
                </Link>
              </li>
              <li className="mx-4 lg:mx-0">
                <Link to="/" className="hover:text-gray-500 text-white">
                  Sobre
                </Link>
              </li>
              <li className="mx-4 lg:mx-0">
                <Link to="/" className="hover:text-gray-500 text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex lg:hidden items-center gap-6">
            <FaBars
              className="text-white text-xl cursor-pointer menu"
              onClick={onToggleMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
