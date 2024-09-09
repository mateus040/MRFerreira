import toast from "react-hot-toast";
import { BiCategory, BiHome } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  isSidebarOpen: boolean;
}

export const Sidebar = ({ isSidebarOpen }: Props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Deslogado com sucesso!");
  };

  return (
    <div
      className={`transition-all duration-300 ${
        !isSidebarOpen ? "w-24 lg:w-60" : "w-0"
      } `}
    >
      <div className="h-full flex flex-col bg-slate-900 min-h-screen">
        <div className="p-4 pb-2 flex items-center justify-center lg:justify-start">
          <img src="/images/logo-branco.png" className="w-20 h-20 rounded-md" />
          <p className="hidden lg:flex mx-2 font-semibold text-slate-400">
            <span className={`${isSidebarOpen ? "hidden" : "block"}`}>
              Painel Admin
            </span>
          </p>
        </div>
        <ul className="flex-1 p-4 lg:p-2">
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-slate-400"
            } mb-2`}
          >
            <Link
              to="/"
              className="flex items-center overflow-hidden transition-all"
            >
              <BiHome size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Início
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/empresas")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-slate-400"
            } mb-2`}
          >
            <Link
              to="/empresas"
              className="flex items-center overflow-hidden transition-all"
            >
              <FaCartFlatbed size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Empresas
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/produtos")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-slate-400"
            }`}
          >
            <Link
              to="/produtos"
              className="flex items-center overflow-hidden transition-all"
            >
              <BsBoxSeam size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Produtos
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group mt-2 ${
              isActive("/categorias")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-slate-400"
            }`}
          >
            <Link
              to="/categorias"
              className="flex items-center overflow-hidden transition-all"
            >
              <BiCategory size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Categorias
              </span>
            </Link>
          </li>
        </ul>
        <div className="border-t flex p-4">
          <div className="flex justify-center lg:justify-between items-center overflow-hidden w-52">
            <div className="flex justify-between items-center overflow-hidden transition-all">
              <div className="leading-4 hidden lg:block text-slate-400">
                <h4 className="font-semibold">MR Ferreira</h4>
                <span className="text-xs">Representações</span>
              </div>
            </div>
            <div
              className="cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white py-3 px-4 rounded-md text-slate-400"
              onClick={logout}
            >
              <MdLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
