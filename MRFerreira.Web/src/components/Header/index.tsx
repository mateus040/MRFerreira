import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="fixed flex top-0 left-0 right-0 justify-between bg-black px-16 py-5">
      <div>
        <Link to="/">
          {/*<img src="/logo-branco.png" className="h-20"/>*/}
          <p className="text-white text-2xl font-bold">MR Ferreira</p>
          <p className="text-white text-lg font-semibold -mt-1">
            Representações
          </p>
        </Link>
      </div>

      <nav className="text-white flex items-center justify-center">
        <Link to="#produtos" className="mx-2">Produtos</Link>
        <Link to="#features" className="mx-2">Features</Link>
        <Link to="#empresas" className="mx-2">Empresas</Link>
        <Link to="#sobre" className="mx-2">Sobre</Link>
        <Link to="#contato" className="mx-2">Contato</Link>
      </nav>
    </div>
  );
}
