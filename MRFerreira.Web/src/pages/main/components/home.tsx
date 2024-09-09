import { useEffect } from "react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1600 });
  }, []);

  return (
    <div id="home" className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/images/fundo.png"
          className="w-full h-full object-cover fundo-home"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <div data-aos="fade-up">
          <h1 className="uppercase text-2xl sm:text-3xl lg:text-4xl font-bold">
            O conforto que você merece!
          </h1>
          <p className="mt-5 text-md sm:text-lg text-gray-300 mb-10">
            Descubra nossas coleções e adquira peças que não ocupam espaço, mas
            transformam ambientes!
          </p>
          <button
            onClick={() => navigate("/?section=produtos")}
            className="mt-8 border-2 border-white rounded px-8 py-2 hover:bg-white hover:text-black transition-all"
          >
            Venha conhecer!
          </button>
        </div>
      </div>
    </div>
  );
};
