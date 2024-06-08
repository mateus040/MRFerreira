import { BiHome } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  isSidebarOpen: boolean;
}

export default function SidebarAdmin({ isSidebarOpen }: Props) {
  return (
    <div
      className={`transition-all duration-300 ${
        !isSidebarOpen ? "w-24 lg:w-60" : "w-0"
      } `}
    >
      <div className="h-full flex flex-col bg-slate-900 min-h-screen">
        <div className="p-4 pb-2 flex items-center justify-center lg:justify-start">
          <img src="/images/logo-branco.png" className="w-20 h-20 rounded-md" />
          <p className="hidden lg:flex mx-2 font-semibold text-slate-400">Painel Admin</p>
        </div>
        <ul className="flex-1 p-4 lg:p-2">
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white mb-2 text-slate-400">
            <BiHome size={25} className="lg:-mt-1" />
            <Link
              to="/"
              className="hidden lg:flex overflow-hidden transition-all w-52 ml-3"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white mb-2 text-slate-400">
            <FaCartFlatbed size={25} className="lg:-mt-1" />
            <Link to="/admin/fornecedores" className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
              Fornecedores
            </Link>
          </li>
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white text-slate-400">
            <BsBoxSeam size={25} className="lg:-mt-1" />
            <Link to="/admin/produtos" className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
              Produtos
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
            <div className="cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white py-3 px-4 rounded-md text-slate-400">
              <MdLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
