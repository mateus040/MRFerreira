import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="fixed flex top-0 left-0 right-0 justify-between bg-black px-10 lg:px-28 py-5">
      <div>
        <Link to="/">
          {/*<img src="/logo-branco.png" className="h-20"/>*/}
          <p className="text-white text-xl font-bold">MR Ferreira</p>
          <p
            className="text-white font-semibold mx-5"
            style={{ fontSize: "12px" }}
          >
            Representações
          </p>
        </Link>
      </div>

      <div className="text-white hidden lg:flex items-center justify-center">
        <Link to="#produtos" className="mx-2 font-semibold">
          Produtos
        </Link>
        <Link to="#features" className="mx-2 font-semibold">
          Features
        </Link>
        <Link to="#empresas" className="mx-2 font-semibold">
          Empresas
        </Link>
        <Link to="#sobre" className="mx-2 font-semibold">
          Sobre
        </Link>
        <Link to="#contato" className="mx-2 font-semibold">
          Contato
        </Link>
      </div>

      <div className="flex lg:hidden items-center justify-center">
        <div className="cursor-pointer hover:bg-white rounded p-2">
          <FaBars className="text-white text-xl hover:text-black" />
        </div>
      </div>
    </div>
  );
}
