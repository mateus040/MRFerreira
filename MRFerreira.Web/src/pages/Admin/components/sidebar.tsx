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
      className={`h-screen transition-all duration-300 ${
        !isSidebarOpen ? "w-24 lg:w-60" : "w-0"
      } `}
    >
      <div className="h-full flex flex-col bg-white">
        <div className="p-4 pb-2 flex items-center justify-center">
          <img
            src="/images/logo-transparente.png"
            className="w-16 h-16 rounded-md"
          />
          {/*<div className="hidden lg:flex flex-col mx-3">
            <p className="font-semibold">Admin</p>
            <p className="font-semibold">MR Ferreira</p>
  </div>*/}
        </div>
        <ul className="flex-1 p-4 lg:p-2">
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white mb-2">
            <BiHome size={25} className="lg:-mt-1" />
            <Link to="/" className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
              Home
            </Link>
          </li>
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white mb-2">
            <FaCartFlatbed size={25} className="lg:-mt-1" />
            <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
              Fornecedores
            </span>
          </li>
          <li className="flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white">
            <BsBoxSeam size={25} className="lg:-mt-1" />
            <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
              Produtos
            </span>
          </li>
        </ul>

        <div className="border-t flex p-4">
          <div className="flex justify-center lg:justify-between items-center overflow-hidden w-52">
            <div className="flex justify-between items-center overflow-hidden transition-all">
              <div className="leading-4 hidden lg:block">
                <h4 className="font-semibold">MR Ferreira</h4>
                <span className="text-xs text-gray-600">Representações</span>
              </div>
            </div>
            <div className="cursor-pointer transition-colors group hover:bg-black hover:text-white py-3 px-4 rounded-md">
              <MdLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
