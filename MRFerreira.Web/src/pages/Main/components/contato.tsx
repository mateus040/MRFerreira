import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function Contato() {
  return (
    <div className="px-8 lg:px-24 py-12 mx-auto" id="contato">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Entre em contato conosco
        </h1>
        <p className="text-md text-center mt-3 text-gray-600">
          Nos envie um e-mail para saber mais sobre nossos produtos
        </p>
      </div>

      <div className="block md:flex items-center justify-between mt-14">
        <div className="flex items-start md:items-center justify-start md:justify-center mb-8 md:mt-0">
          <div className="bg-black p-5 rounded-md">
            <IoLocationSharp className="text-white text-3xl" />
          </div>
          <div className="mx-4">
            <p className="font-bold text-lg">Endereço</p>
            <p className="text-sm">Jaú - São Paulo</p>
            <p className="text-sm">17209-838</p>
          </div>
        </div>
        <div className="flex items-start md:items-center justify-start md:justify-center mb-8 md:mt-0">
          <div className="bg-black p-5 rounded-md">
            <FaPhoneAlt className="text-white text-3xl" />
          </div>
          <div className="mx-4">
            <p className="font-bold text-lg">Telefone</p>
            <p className="text-sm">+123 345 6789</p>
            <p className="text-sm">+111 222 333</p>
          </div>
        </div>
        <div className="flex items-start md:items-center justify-start md:justify-center mb-8 md:mt-0">
          <div className="bg-black p-5 rounded-md">
            <FaEnvelope className="text-white text-3xl" />
          </div>
          <div className="mx-4">
            <p className="font-bold text-lg">Endereço</p>
            <p className="text-sm">mr.ferreira@mrferreira.com</p>
            <p className="text-sm">exemplo@gmail.com</p>
          </div>
        </div>
      </div>

      {/*<div className="flex flex-col items-center justify-center mt-5 bg-white p-8 rounded-md">*/}
      {/*<p className="text-2xl font-semibold mb-5">Envie um e-mail</p>*/}
      <form className="w-full mt-3">
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          className="bg-white  w-full rounded-md p-3 mb-6"
        />
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          className="bg-white w-full rounded-md p-3 mb-6"
        />
        <textarea
          name="descricao"
          placeholder="Digite a descrição"
          rows={10}
          className="bg-white w-full rounded-md p-3 mb-6"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
          >
            Enviar
          </button>
        </div>
      </form>
      {/*</div>*/}
    </div>
  );
}
