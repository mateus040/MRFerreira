import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Inputmask from "react-input-mask";
import { SubmitHandler, useForm } from "react-hook-form";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import toast from "react-hot-toast";
import MainLayout from "../../../components/layout";
import ServiceResult from "../../../interface/service-result";
import ProviderModel from "../../../interface/models/provider-model";
import { getApiErrorMessage } from "../../../services/api-error-handler";
import api from "../../../services/api-client";
import { removeSpecialCharacters } from "../../../utils/format-fields";

interface ProviderField {
  name: string;
  cnpj: string;
  street: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  city: string;
  state: string;
  complement: string;
  email: string;
  phone: string;
  cellphone: string;
  logo: FileList;
}

export default function EditProvider() {
  const { providerId } = useParams<{ providerId: string }>();
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
      link: "/fornecedores",
      name: "Fornecedores",
    },
    {
      link: `/fornecedores/editar/${providerId}`,
      name: `Editar fornecedor`,
    },
  ];

  const fetchProvider = async (): Promise<void> => {
    setLoadingProviders(true);

    api
      .get<ServiceResult<ProviderModel>>(`/providers/${providerId}`)
      .then(({ data }) => {
        const provider = data.data as ProviderModel;
        setValue("name", provider.name || "");
        setValue("cnpj", provider.cnpj || "");
        setValue("street", provider.address.street || "");
        setValue("neighborhood", provider.address.neighborhood || "");
        setValue("zipcode", provider.address.zipcode || "");
        setValue("number", provider.address.number || "");
        setValue("city", provider.address.city || "");
        setValue("state", provider.address.state || "");
        setValue("complement", provider.address.complement || "");
        setValue("email", provider.email || "");
        setValue("cellphone", provider.cellphone || "");
        setValue("phone", provider.phone || "");
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
    formData.append("name", data.name);
    formData.append("cnpj", removeSpecialCharacters(data.cnpj));
    formData.append("email", data.email);
    formData.append("phone", removeSpecialCharacters(data.phone));
    formData.append("cellphone", removeSpecialCharacters(data.cellphone));

    if (data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    formData.append("address[zipcode]", removeSpecialCharacters(data.zipcode));
    formData.append("address[street]", data.street);
    formData.append("address[number]", data.number);
    formData.append("address[neighborhood]", data.neighborhood);
    formData.append("address[state]", data.state);
    formData.append("address[city]", data.city);
    formData.append("address[complement]", data.complement || "");

    toast
      .promise<ServiceResult>(api.post(`/providers/${providerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }), {
        loading: "Editando fornecedor...",
        success: () => {
          navigate("/fornecedores");
          return "Fornecedor editado com sucesso!";
        },
        error: (error) => getApiErrorMessage(error),
      })
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

      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmitChange)}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="name"
              placeholder={
                loadingProviders ? "..." : "Informe o nome do fornecedor"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("name", { required: "O nome é obrigatório" })}
              disabled={loadingProviders}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
              id="zipcode"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("zipcode", { required: "O CEP é obrigatório" })}
              disabled={loadingProviders}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Rua*</label>
            <input
              type="text"
              id="street"
              placeholder={loadingProviders ? "..." : "Informe o nome da rua"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("street", {
                required: "O nome da rua é obrigatório",
              })}
              disabled={loadingProviders}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-6">
            <label className="block mb-2 font-medium">Bairro*</label>
            <input
              type="text"
              id="neighborhood"
              placeholder={loadingProviders ? "..." : "Informe o bairro"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("neighborhood", {
                required: "O bairro é obrigatório",
              })}
              disabled={loadingProviders}
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-sm">
                {errors.neighborhood.message}
              </p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Nº*</label>
            <input
              type="text"
              id="number"
              placeholder={loadingProviders ? "..." : "Nº"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("number", { required: "O número é obrigatório" })}
              disabled={loadingProviders}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Cidade*</label>
            <input
              type="text"
              id="city"
              placeholder={loadingProviders ? "..." : "Informe a cidade"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("city", { required: "A cidade é obrigatório" })}
              disabled={loadingProviders}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Estado*</label>
            <select
              id="state"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("state", { required: "O estado é obrigatório" })}
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
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Complemento</label>
            <input
              type="text"
              id="complement"
              placeholder={loadingProviders ? "..." : "Informe o complemento"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("complement")}
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
              id="phone"
              placeholder={loadingProviders ? "..." : "(__) _____-____"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("phone")}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <Inputmask
              mask="(99) 99999-9999"
              id="cellphone"
              placeholder={loadingProviders ? "..." : "(__) _____-____"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cellphone")}
              disabled={loadingProviders}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo</label>
            <input
              type="file"
              accept="image/*"
              id="logo"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("logo")}
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
