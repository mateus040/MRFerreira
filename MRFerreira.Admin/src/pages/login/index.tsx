import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingLogin from "../../components/loadings/loading-login";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../services/api-client";
import apiErrorHandler from "../../services/api-error-handler";

interface UserField {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserField>();

  const handleLogin: SubmitHandler<UserField> = async (data) => {
    setLoading(true);

    api
      .postForm("/login", data)
      .then(({ data: { token } }) => {
        sessionStorage.setItem("auth", JSON.stringify({ token }));
        navigate("/");
        toast.success("Bem-vindo!");
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img
            className="object-cover object-top w-full h-full"
            src="/images/fundo-login.jpg"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative">
          <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
            <h3 className="text-4xl font-bold text-white">
              Área administrativa <br />
              MR Ferreira
            </h3>
            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-white rounded-full">
                  <FaCheck className="text-sm" />
                </div>
                <span className="text-lg font-medium text-white">
                  Visão geral
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-white rounded-full">
                  <FaCheck className="text-sm" />
                </div>
                <span className="text-lg font-medium text-white">
                  Controle de dados
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-white rounded-full">
                  <FaCheck className="text-sm" />
                </div>
                <span className="text-lg font-medium text-white">
                  Adicionar produtos
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-white rounded-full">
                  <FaCheck className="text-sm" />
                </div>
                <span className="text-lg font-medium text-white">
                  Adicionar empresas
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white px-12 md:px-20 lg:py-28">
        <img
          src="/images/logo-transparente.png"
          alt="logo"
          className="w-32 mx-auto lg:hidden mt-10"
        />
        <h2 className="text-3xl text-center font-bold leading-tight text-black sm:text-4xl">
          Acesse sua conta
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">
                E-mail
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="email"
                  id="email"
                  placeholder="Informe seu e-mail"
                  className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                  {...register("email", { required: "O e-mail é obrigatório" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">
                  Senha
                </label>
              </div>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="password"
                  id="password"
                  placeholder="Informe sua senha"
                  className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:black focus:bg-whit"
                  {...register("password", {
                    required: "A senha é obrigatória",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-black inline-flex items-center justify-center w-full h-16 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md hover:bg-opacity-95"
              disabled={loading}
            >
              {loading ? <LoadingLogin /> : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
