import { BiHome } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

export default function SidebarAdmin() {
  return (
    <div className="h-screen w-0 lg:w-60">
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
        <ul className="flex-1 p-2">
          <li className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white mb-2">
            <BiHome size={25} className="-mt-1" />
            <span className="overflow-hidden transition-all w-52 ml-3">
              Home
            </span>
          </li>
          <li className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white mb-2">
            <FaCartFlatbed size={25} className="-mt-1" />
            <span className="overflow-hidden transition-all w-52 ml-3">
              Fornecedores
            </span>
          </li>
          <li className="flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black hover:text-white">
            <BsBoxSeam size={25} className="-mt-1" />
            <span className="overflow-hidden transition-all w-52 ml-3">
              Produtos
            </span>
          </li>
        </ul>

        <div className="border-t flex p-4">
          <div className="flex justify-between items-center overflow-hidden w-52">
            <div className="flex justify-between items-center overflow-hidden transition-all">
              <div className="leading-4">
                <h4 className="font-semibold">MR Ferreira</h4>
                <span className="text-xs text-gray-600">Representações</span>
              </div>
            </div>
            <div className="cursor-pointer transition-colors group hover:bg-black hover:text-white p-2 rounded-md">
              <MdLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
