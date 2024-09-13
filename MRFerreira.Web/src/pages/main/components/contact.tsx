import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import api from "../../../services/api-client";
import { getApiErrorMessage } from "../../../services/api-error-handler";

interface EmailPostArgs {
  nome: string;
  email: string;
  descricao: string;
}

export const SectionContact = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPostArgs>();

  const onSubmit: SubmitHandler<EmailPostArgs> = async (data) => {
    setLoading(true);

    let args: EmailPostArgs = { ...data };

    // const formData = new FormData();
    // formData.append("nome", data.nome);
    // formData.append("email", data.email);
    // formData.append("descricao", data.descricao);

    toast
      .promise(
        api.post("https://mrferreira-api.vercel.app/api/api/send-email", args),
        {
          loading: "Enviando e-mail...",
          success: "E-mail enviado com sucesso!",
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="px-8 lg:px-12 py-12 container mx-auto" id="contato">
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
        <div className="flex items-start justify-start mb-8 md:mt-0">
          <div className="bg-black p-5 rounded-md">
            <FaPhoneAlt className="text-white text-3xl" />
          </div>
          <div className="mx-4">
            <p className="font-bold text-lg">Telefone</p>
            <p className="text-sm">(14) 99783-1356</p>
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
      <form className="w-full mt-3" onSubmit={handleSubmit(onSubmit)}>
        {errors.nome && (
          <p className="text-red-500 text-sm mt-0">{errors.nome.message}</p>
        )}
        <input
          type="text"
          id="nome"
          {...register("nome", { required: "O nome é obrigatório" })}
          placeholder="Digite seu nome"
          className={`bg-white w-full rounded-md p-3 mb-6 ${
            errors.nome ? "border border-red-500" : ""
          }`}
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="email"
          id="email"
          {...register("email", { required: "O e-mail é obrigatório" })}
          placeholder="Digite seu e-mail"
          className={`bg-white w-full rounded-md p-3 mb-6 ${
            errors.email ? "border border-red-500" : ""
          }`}
        />

        {errors.descricao && (
          <p className="text-red-500 text-sm">{errors.descricao.message}</p>
        )}
        <textarea
          id="descricao"
          placeholder="Digite a descrição"
          {...register("descricao", { required: "A descrição é obrigatória" })}
          rows={10}
          className={`bg-white w-full rounded-md p-3 mb-6 ${
            errors.descricao ? "border border-red-500" : ""
          }`}
        />

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
            disabled={loading}
          >
            Enviar
          </button>
        </div>
      </form>
      {/*</div>*/}
    </div>
  );
};
