import { useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  toggleSidebar: () => void;
}

export default function HeaderAdmin({ toggleSidebar }: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleClick = () => {
    setOpenDropdown(state => !state);
  };

  return (
    <div className="bg-white px-5 py-3">
      <div className="flex items-center justify-between">
        <div className="cursor-pointer mx-3" onClick={toggleSidebar}>
          <FaBars size={20} />
        </div>

        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="p-1.5 rounded-full ring-1 ring-black ring-opacity-15">
              <FaRegUser size={25} />
            </div>

            <IoIosArrowDown />
          </button>

          <div
            className={`${
              openDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
            } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition transform duration-300 ease-out`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <Link
                to="/admin/fornecedores"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Fornecedores
              </Link>
              <Link
                to="/admin/produtos"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
              >
                Produtos
              </Link>
              <Link
                to="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
