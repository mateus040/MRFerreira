import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Inputmask from "react-input-mask";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../context/auth-context";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import toast from "react-hot-toast";
import MainLayout from "../../../components/layout";

interface ProviderField {
  nome: string;
  cnpj: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento: string;
  email: string;
  telefone: string;
  celular: string;
  logo: File | string;
}

export default function EditProvider() {
  const { providerId } = useParams<{ providerId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProviderField>();

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
      link: `/empresas/editar/${providerId}`,
      name: `Editar fornecedor`,
    },
  ];

  const fetchProvider = async (): Promise<void> => {
    setLoadingProviders(true);

    axios
      .get(
        `https://mrferreira-api.vercel.app/api/api/providers/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        const provider = data.results;
        setValue("nome", provider.nome || "");
        setValue("cnpj", provider.cnpj || "");
        setValue("rua", provider.rua || "");
        setValue("bairro", provider.bairro || "");
        setValue("cep", provider.cep || "");
        setValue("numero", provider.numero || "");
        setValue("cidade", provider.cidade || "");
        setValue("estado", provider.estado || "");
        setValue("complemento", provider.complemento || "");
        setValue("email", provider.email || "");
        setValue("celular", provider.celular || "");
        setValue("telefone", provider.telefone || "");
      })
      .catch((error) => {
        toast.error("Erro ao buscar dados do fornecedor: ", error);
      })
      .finally(() => setLoadingProviders(false));
  };

  const onSubmitChange: SubmitHandler<ProviderField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
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
    formData.append("telefone", data.telefone);
    formData.append("celular", data.celular);

    // Verifica se logo é uma instância de File e a adiciona ao FormData
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }

    toast
      .promise(
        axios.post(
          `https://mrferreira-api.vercel.app/api/api/providers/update/${providerId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Editando fornecedor...",
          success: () => {
            navigate("/empresas");
            return "Fornecedor editado com sucesso!";
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

  useEffect(() => {
    fetchProvider();
  }, [providerId]);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-8" onSubmit={handleSubmit(onSubmitChange)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="nome"
              placeholder={
                loadingProviders ? "..." : "Informe o nome do fornecedor"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("nome", { required: "O nome é obrigatório" })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "__.___.___/____-__"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cnpj", { value: "" })}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CEP*</label>
            <Inputmask
              mask="99999-999"
              placeholder={loadingProviders ? "..." : "_____-___"}
              id="cep"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cep", { required: "O CEP é obrigatório" })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "Informe o nome da rua"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("rua", {
                required: "O nome da rua é obrigatório",
              })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "Informe o bairro"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("bairro", { required: "O bairro é obrigatório" })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "Nº"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("numero", { required: "O número é obrigatório" })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "Informe a cidade"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cidade", { required: "A cidade é obrigatório" })}
              disabled={loadingProviders}
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
              disabled={loadingProviders}
            >
              <option value="" disabled selected>
                {loadingProviders ? "..." : "UF"}
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
              placeholder={loadingProviders ? "..." : "Informe o complemento"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("complemento")}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-12">
            <label className="block mb-2 font-medium">Email*</label>
            <input
              type="email"
              id="email"
              placeholder={loadingProviders ? "..." : "Informe o email"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("email", { required: "O email é obrigatório" })}
              disabled={loadingProviders}
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
              placeholder={loadingProviders ? "..." : "(__) _____-____"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("telefone")}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <Inputmask
              mask="(99) 99999-9999"
              id="celular"
              placeholder={loadingProviders ? "..." : "(__) _____-____"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("celular")}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo</label>
            <input
              type="file"
              id="logo"
              {...register("logo")}
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("logo", e.target.files[0]);
                }
              }}
              disabled={loadingProviders}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
            disabled={loading}
          >
            Editar
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
