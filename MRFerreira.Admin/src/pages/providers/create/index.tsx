import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../components/layout";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import Inputmask from "react-input-mask";
import ServiceResult from "../../../interface/service-result";
import api from "../../../services/api-client";
import { getApiErrorMessage } from "../../../services/api-error-handler";
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
  complement?: string;
  email: string;
  phone: string;
  cellphone: string;
  logo: FileList;
}

export default function CreateProvider() {
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
      link: "/fornecedores/adicionar",
      name: "Adicionar fornecedores",
    },
  ];

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
    formData.append("name", data.name);
    formData.append("cnpj", removeSpecialCharacters(data.cnpj));
    formData.append("email", data.email);
    formData.append("phone", removeSpecialCharacters(data.phone) || "");
    formData.append("cellphone", removeSpecialCharacters(data.cellphone) || "");

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
      .promise(
        api.post<ServiceResult>("/providers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Cadastrando fornecedor...",
          success: () => {
            navigate("/fornecedores");
            return "Fornecedor criado com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
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
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
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

      <p className="font-medium text-slate-600 mt-8">
        Campos com (*) são obrigatórios
      </p>

      <form onSubmit={handleSubmit(onSubmitChange)} className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="name"
              placeholder="Informe o nome do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("name", { required: "O nome é obrigatório" })}
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
              id="zipcode"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("zipcode", { required: "O CEP é obrigatório" })}
              onBlur={checkCEP}
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
              placeholder="Informe o nome da rua"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("street", { required: "A rua é obrigatória" })}
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
              placeholder="Informe o bairro"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("neighborhood", {
                required: "O bairro é obrigatório",
              })}
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
              placeholder="Nº"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("number", { required: "O número é obrigatório" })}
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
              placeholder="Informe a cidade"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("city", { required: "A cidade é obrigatória" })}
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
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Complemento</label>
            <input
              type="text"
              id="complement"
              placeholder="Complemento"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("complement")}
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
              id="phone"
              placeholder="(00) 0000-0000"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("phone")}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <Inputmask
              mask="(99) 99999-9999"
              id="cellphone"
              placeholder="(00) 00000-0000"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("cellphone")}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo</label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              className={`w-full p-2 rounded-lg border ${
                errors.logo ? "border-red-500" : "border-gray-300"
              }`}
              {...register("logo", { required: "A logo é obrigatória" })}
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
