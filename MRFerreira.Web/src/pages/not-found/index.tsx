import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-center text-4xl font-semibold">
        Página não encontrada...
      </h1>
      <p className="text-center text-xl mt-5">
        A página que você está procurando não existe ou foi removida
      </p>

      <Link
        to="/"
        className="mt-8 bg-black hover:bg-zinc-950 text-white text-lg py-3 px-6 rounded-xl"
      >
        <span className="text-center">Voltar ao início</span>
      </Link>
    </div>
  );
}
