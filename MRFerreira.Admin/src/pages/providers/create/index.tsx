import { ChangeEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import MainLayout from "../../../components/layout";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import Inputmask from "react-input-mask";
import ServiceResult from "../../../interface/service-result";

interface ProviderField {
  nome: string;
  cnpj: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento?: string;
  email: string;
  telefone?: string;
  celular?: string;
  logo: FileList;
}

export default function CreateProvider() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/empresas",
      name: "Fornecedores",
    },
    {
      link: "/empresas/adicionar",
      name: "Adicionar fornecedores",
    },
  ];

  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProviderField>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitChange: SubmitHandler<ProviderField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("cnpj", data.cnpj);
    formData.append("rua", data.rua);
    formData.append("bairro", data.bairro);
    formData.append("numero", data.numero);
    formData.append("cep", data.cep);
    formData.append("cidade", data.cidade);
    formData.append("estado", data.estado);
    formData.append("complemento", data.complemento || "");
    formData.append("email", data.email);
    formData.append("telefone", data.telefone || "");
    formData.append("celular", data.celular || "");

    if (data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    toast
      .promise(
        axios.post<ServiceResult>(
          "https://mrferreira-api.vercel.app/api/api/providers/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Cadastrando fornecedor...",
          success: () => {
            navigate("/empresas");
            return "Fornecedor criado com sucesso!";
          },
          error: (error) => {
            if (axios.isAxiosError(error)) {
              return (
                "Erro de solicitação: " +
                (error.response?.data || error.message)
              );
            } else if (error instanceof Error) {
              return "Erro desconhecido: " + error.message;
            } else {
              return "Erro inesperado: " + error;
            }
          },
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const checkCEP = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      })
      .catch((error) => {
        toast.error("Erro ao obter informações do CEP: " + error.message);
      });
  };

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <p className="font-medium text-slate-600 mt-8">Campos com (*) são obrigatórios</p>

      <form onSubmit={handleSubmit(onSubmitChange)} className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="nome"
              placeholder="Informe o nome do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CNPJ</label>
            <Inputmask
              mask="99.999.999/9999-99"
              id="cnpj"
              placeholder="__.___.___/____-__"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cnpj")}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CEP*</label>
            <Inputmask
              mask="99999-999"
              placeholder="_____-___"
              id="cep"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cep", { required: "O CEP é obrigatório" })}
              onBlur={checkCEP}
            />
            {errors.cep && (
              <p className="text-red-500 text-sm">{errors.cep.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Rua*</label>
            <input
              type="text"
              id="rua"
              placeholder="Informe o nome da rua"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("rua", { required: "A rua é obrigatória" })}
            />
            {errors.rua && (
              <p className="text-red-500 text-sm">{errors.rua.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-6">
            <label className="block mb-2 font-medium">Bairro*</label>
            <input
              type="text"
              id="bairro"
              placeholder="Informe o bairro"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("bairro", { required: "O bairro é obrigatório" })}
            />
            {errors.bairro && (
              <p className="text-red-500 text-sm">{errors.bairro.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Nº*</label>
            <input
              type="text"
              id="numero"
              placeholder="Nº"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("numero", { required: "O número é obrigatório" })}
            />
            {errors.numero && (
              <p className="text-red-500 text-sm">{errors.numero.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Cidade*</label>
            <input
              type="text"
              id="cidade"
              placeholder="Informe a cidade"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cidade", { required: "A cidade é obrigatória" })}
            />
            {errors.cidade && (
              <p className="text-red-500 text-sm">{errors.cidade.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Estado*</label>
            <select
              id="estado"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("estado", { required: "O estado é obrigatório" })}
            >
              <option value="" disabled>
                UF
              </option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
            {errors.estado && (
              <p className="text-red-500 text-sm">{errors.estado.message}</p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Complemento</label>
            <input
              type="text"
              id="complemento"
              placeholder="Complemento"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("complemento")}
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">E-mail*</label>
            <input
              type="email"
              id="email"
              placeholder="Informe o e-mail"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("email", { required: "O e-mail é obrigatório" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Telefone</label>
            <Inputmask
              mask="(99) 9999-9999"
              id="telefone"
              placeholder="(00) 0000-0000"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("telefone")}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <Inputmask
              mask="(99) 99999-9999"
              id="celular"
              placeholder="(00) 00000-0000"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("celular")}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo</label>
            <input
              type="file"
              id="logo"
              className={`w-full p-2 rounded-lg border ${
                errors.logo ? "border-red-500" : "border-gray-300"
              }`}
              {...register("logo", { required: "O logo é obrigatório" })}
            />
            {errors.logo && (
              <p className="text-red-500 text-sm">{errors.logo.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
            disabled={loading}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
