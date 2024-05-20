export default function Home() {
  return (
    <div id="home">
      <div className="relative">
        <img
          src="/images/fundo.png"
          className="min-w-full aspect-video object-cover fundo-home"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-80 fundo-home"></div>
      <div className="absolute inset-0 flex items-center justify-center sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 text-white text-center">
        <div>
          <h1 className="uppercase text-2xl sm:text-3xl lg:text-4xl font-bold">
            O conforto que você merece!
          </h1>
          <p className="mt-5 text-md sm:text-lg text-gray-300">
            Descubras nossas coleções e adquira peças que não ocupam espaço, mas
            transformam ambientes!
          </p>
          <button className="mt-8 border-2 border-white rounded px-8 py-2 hover:bg-white hover:text-black transition-all">
            Venha conhecer!
          </button>
        </div>
      </div>
    </div>
  );
}
