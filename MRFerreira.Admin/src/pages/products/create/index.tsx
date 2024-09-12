import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProviderModel from "../../../interface/models/provider-model";
import CategoryModel from "../../../interface/models/category-model";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import { SubmitHandler, useForm } from "react-hook-form";
import MainLayout from "../../../components/layout";
import ListServiceResult from "../../../interface/list-service-result";
import ServiceResult from "../../../interface/service-result";
import api from "../../../services/api-client";
import { getApiErrorMessage } from "../../../services/api-error-handler";

interface ProductField {
  nome: string;
  descricao: string;
  comprimento: string | null;
  altura: string | null;
  profundidade: string | null;
  peso: string | null;
  linha: string;
  materiais: string;
  foto: FileList;
  id_provider: string;
  id_category: string;
}

export default function CreateProducts() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/produtos",
      name: "Produtos",
    },
    {
      link: "/produtos/adicionar",
      name: "Adicionar produtos",
    },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);

  const [providers, setProviders] = useState<ProviderModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [comprimentoUnit, setComprimentoUnit] = useState<string>("");
  const [alturaUnit, setAlturaUnit] = useState<string>("");
  const [profundidadeUnit, setProfundidadeUnit] = useState<string>("");
  const [pesoUnit, setPesoUnit] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductField>();

  const fetchProviders = async (): Promise<void> => {
    setLoadingProviders(true);

    api
      .get<ListServiceResult<ProviderModel>>("/providers")
      .then(({ data }) => {
        setProviders(data.results);
      })
      .catch((error) => {
        toast.error("Erro ao buscar empresas: ", error);
      })
      .finally(() => setLoadingProviders(false));
  };

  const fetchCategories = async (): Promise<void> => {
    setLoadingCategories(true);

    api
      .get<ListServiceResult<CategoryModel>>("/categories")
      .then(({ data }) => {
        setCategories(data.results);
      })
      .catch((error) => {
        toast.error("Erro ao buscar categorias: ", error);
      })
      .finally(() => setLoadingCategories(false));
  };

  const onSubmit: SubmitHandler<ProductField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("comprimento", data.comprimento || "");
    formData.append("altura", data.altura || "");
    formData.append("profundidade", data.profundidade || "");
    formData.append("peso", data.peso || "");
    formData.append("linha", data.linha);
    formData.append("materiais", data.materiais);
    if (data.foto.length > 0) {
      formData.append("foto", data.foto[0]);
    }
    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    toast
      .promise(
        api.post<ServiceResult>("/products/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Cadastrando produto...",
          success: () => {
            navigate("/produtos");
            return "Produto criado com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const comprimentoValue = watch("comprimento");
  const alturaValue = watch("altura");
  const profundidadeValue = watch("profundidade");
  const pesoValue = watch("peso");

  const handleComprimentoSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setComprimentoUnit(selectedValue);
    setValue(
      "comprimento",
      `${comprimentoValue?.split(" ")[0]} ${selectedValue}`
    );
  };

  const handleAlturaSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setAlturaUnit(selectedValue);
    setValue("altura", `${alturaValue?.split(" ")[0]} ${selectedValue}`);
  };

  const handleProfundidadeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setProfundidadeUnit(selectedValue);
    setValue(
      "profundidade",
      `${profundidadeValue?.split(" ")[0]} ${selectedValue}`
    );
  };

  const handlePesoSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setPesoUnit(selectedValue);
    setValue("peso", `${pesoValue?.split(" ")[0]} ${selectedValue}`);
  };

  useEffect(() => {
    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <p className="font-medium text-slate-600 mt-8">
        Campos com (*) são obrigatórios
      </p>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="nome"
              {...register("nome", { required: "O nome é obrigatório" })}
              placeholder="Informe o nome do produto"
              className={`w-full p-2 rounded-lg border ${
                errors.nome ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Categoria*</label>
            <select
              id="id_category"
              {...register("id_category", {
                required: "A categoria é obrigatória",
              })}
              className={`w-full p-2 rounded-lg border ${
                errors.id_category ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories ? "..." : "Selecione uma categoria"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nome}
                </option>
              ))}
            </select>
            {errors.id_category && (
              <p className="text-red-500 text-sm">
                {errors.id_category.message}
              </p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Empresa*</label>
            <select
              id="id_provider"
              {...register("id_provider", {
                required: "A empresa é obrigatória",
              })}
              className={`w-full p-2 rounded-lg border ${
                errors.id_provider ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loadingProviders}
            >
              <option value="">
                {loadingProviders ? "..." : "Selecione uma empresa"}
              </option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.nome}
                </option>
              ))}
            </select>
            {errors.id_provider && (
              <p className="text-red-500 text-sm">
                {errors.id_provider.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Descrição*</label>
            <textarea
              id="descricao"
              {...register("descricao", {
                required: "A descrição é obrigatória",
              })}
              placeholder="Informe a descrição"
              className={`w-full p-2 rounded-lg border ${
                errors.descricao ? "border-red-500" : "border-gray-300"
              }`}
              rows={5}
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm">{errors.descricao.message}</p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Materiais</label>
            <input
              type="text"
              id="materiais"
              {...register("materiais")}
              placeholder="Informe os materiais do produto"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="linha"
              {...register("linha")}
              placeholder="Informe a linha"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Comprimento (cm)</label>
            <div className="flex">
              <input
                type="text"
                id="comprimento"
                {...register("comprimento")}
                placeholder="Informe o comprimento"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleComprimentoSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={comprimentoUnit}
              >
                <option value="">Selecione</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="dm">dm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Altura (cm)</label>
            <div className="flex">
              <input
                type="text"
                id="altura"
                {...register("altura")}
                placeholder="Informe a altura"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleAlturaSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={alturaUnit}
              >
                <option value="">Selecione</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="dm">dm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Profundidade (cm)</label>
            <div className="flex">
              <input
                type="text"
                id="profundidade"
                {...register("profundidade")}
                placeholder="Informe a profundidade"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleProfundidadeSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={profundidadeUnit}
              >
                <option value="">Selecione</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="dm">dm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Peso (kg)</label>
            <div className="flex">
              <input
                type="text"
                id="peso"
                {...register("peso")}
                placeholder="Informe o peso"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handlePesoSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={pesoUnit}
              >
                <option value="">Selecione</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Foto*</label>
            <input
              type="file"
              id="foto"
              {...register("foto", { required: "A foto é obrigatória" })}
              className={`w-full p-2 rounded-lg border ${
                errors.foto ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.foto && (
              <p className="text-red-500 text-sm">{errors.foto.message}</p>
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
