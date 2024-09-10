import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoriaModel from "../interface/models/CategoriaModel";
import formatNameForURL from "../utils/formatNameForURL";
import { FaTimes } from "react-icons/fa";
import ListServiceResult from "../interface/list-service-result";
import apiErrorHandler from "../services/api-error-handle";

export const Header = () => {
  const navigate = useNavigate();

  const [menuResponsive, setMenuResponsive] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const handleClick = () => {
    setMenuResponsive((state) => !state);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown((state) => !state);
  };

  const fetchCategories = async (): Promise<void> => {
    axios
      .get<ListServiceResult<CategoriaModel>>(
        "https://mrferreira-api.vercel.app/api/api/categories"
      )
      .then(({ data }) => {
        setCategories(data.results);
      })
      .catch(apiErrorHandler);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="flex justify-between items-center px-5 py-5 container mx-auto">
        <a
          onClick={() => navigate("/?section=home")}
          className="cursor-pointer"
        >
          <p className="text-xl font-semibold">MR Ferreira</p>
          <p className="font-semibold mx-4" style={{ fontSize: "12px" }}>
            Representações
          </p>
          {/* <img src="/images/logo-transparente.png" alt="logo" className="h-20 w-20" /> */}
        </a>
        <div
          className={`nav-links duration-500 lg:static absolute lg:min-h-fit min-h-[40vh] left-0 -mt-1 ${
            menuResponsive ? "top-full" : "top-[-600%]"
          } lg:w-auto w-full flex items-center px-5 shadow-xl lg:shadow-none font-semibold bg-white`}
        >
          <ul className="flex lg:flex-row flex-col lg:items-center gap-8 container mx-auto mt-6 lg:mt-1 mb-6 lg:mb-0">
            <li className="mx-4 lg:mx-0">
              <button
                onClick={() => navigate("/?section=home")}
                className="hover:text-gray-500 font-semibold"
              >
                Início
              </button>
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/produtos"
                className="hover:text-gray-500 font-semibold"
              >
                Produtos
              </Link>
            </li>
            <li className="mx-4 lg:mx-0 cursor-pointer">
              <span
                className="hover:text-gray-500 font-semibold"
                onClick={handleOpenDropdown}
              >
                Categorias
              </span>
              {openDropdown && (
                <ul className="absolute mt-3 w-48 bg-white border-gray-300 rounded-lg shadow-lg">
                  {categories.map((category) => (
                    <Link
                      to={`/categoria/${
                        category.id
                      }?categoria=${formatNameForURL(category.nome)}`}
                    >
                      <li className="p-2.5 hover:bg-gray-100 cursor-pointer">
                        {category.nome}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
            <li className="mx-4 lg:mx-0">
              <Link
                to="/empresas"
                className="hover:text-gray-500 font-semibold"
              >
                Empresas
              </Link>
            </li>
            <li className="mx-4 lg:mx-0">
              <button
                onClick={() => navigate("/?section=sobre")}
                className="hover:text-gray-500 font-semibold"
              >
                Sobre
              </button>
            </li>
            <li className="mx-4 lg:mx-0">
              <button
                onClick={() => navigate("/?section=contato")}
                className="hover:text-gray-500 font-semibold"
              >
                Contato
              </button>
            </li>
          </ul>
        </div>

        <div className="flex lg:hidden items-center gap-6">
          <div className="hover:bg-white hover:text-black p-3 rounded transition-all">
            {menuResponsive ? (
              <FaTimes
                className="text-xl cursor-pointer menu"
                onClick={handleClick}
              />
            ) : (
              <FaBars
                className="text-xl cursor-pointer menu"
                onClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
