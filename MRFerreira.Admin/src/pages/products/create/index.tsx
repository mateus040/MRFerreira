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
  name: string;
  description: string;
  length: string | null;
  height: string | null;
  depth: string | null;
  weight: string | null;
  line: string;
  materials: string;
  photo: FileList;
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

  const [lengthUnit, setLengthUnit] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("");
  const [depthUnit, setDepthUnit] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("");

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
        setProviders(data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar fornecedores: ", error);
      })
      .finally(() => setLoadingProviders(false));
  };

  const fetchCategories = async (): Promise<void> => {
    setLoadingCategories(true);

    api
      .get<ListServiceResult<CategoryModel>>("/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar categorias: ", error);
      })
      .finally(() => setLoadingCategories(false));
  };

  const onSubmit: SubmitHandler<ProductField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("length", data.length || "");
    formData.append("height", data.height || "");
    formData.append("depth", data.depth || "");
    formData.append("weight", data.weight || "");
    formData.append("line", data.line);
    formData.append("materials", data.materials);

    if (data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    toast
      .promise(
        api.post<ServiceResult>("/products", formData, {
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

  const lengthValue = watch("length");
  const heightValue = watch("height");
  const depthValue = watch("depth");
  const weightValue = watch("weight");

  const handleLengthSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setLengthUnit(selectedValue);
    setValue(
      "length",
      `${lengthValue?.split(" ")[0]} ${selectedValue}`
    );
  };

  const handleHeightSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setHeightUnit(selectedValue);
    setValue("height", `${heightValue?.split(" ")[0]} ${selectedValue}`);
  };

  const handleDepthSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setDepthUnit(selectedValue);
    setValue(
      "depth",
      `${depthValue?.split(" ")[0]} ${selectedValue}`
    );
  };

  const handleWeightSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setWeightUnit(selectedValue);
    setValue("weight", `${weightValue?.split(" ")[0]} ${selectedValue}`);
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
              id="name"
              {...register("name", { required: "O nome é obrigatório" })}
              placeholder="Informe o nome do produto"
              className={`w-full p-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                  {category.name}
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
            <label className="block mb-2 font-medium">Fornecedor*</label>
            <select
              id="id_provider"
              {...register("id_provider", {
                required: "O fornecedor é obrigatória",
              })}
              className={`w-full p-2 rounded-lg border ${
                errors.id_provider ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loadingProviders}
            >
              <option value="">
                {loadingProviders ? "..." : "Selecione um fornecedor"}
              </option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
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
              id="description"
              {...register("description", {
                required: "A descrição é obrigatória",
              })}
              placeholder="Informe a descrição"
              className={`w-full p-2 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Materiais</label>
            <input
              type="text"
              id="materials"
              {...register("materials")}
              placeholder="Informe os materiais do produto"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="line"
              {...register("line")}
              placeholder="Informe a linha"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Comprimento (cm)</label>
            <div className="flex">
              <input
                type="text"
                id="length"
                {...register("length")}
                placeholder="Informe o comprimento"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleLengthSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={lengthUnit}
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
                id="height"
                {...register("height")}
                placeholder="Informe a altura"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleHeightSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={heightUnit}
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
                id="depth"
                {...register("depth")}
                placeholder="Informe a profundidade"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleDepthSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={depthUnit}
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
                id="weight"
                {...register("weight")}
                placeholder="Informe o peso"
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <select
                onChange={handleWeightSelectChange}
                className="hidden sm:block p-2 rounded-r-lg border border-gray-300"
                value={weightUnit}
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
              id="photo"
              accept="image/*"
              {...register("photo", { required: "A foto é obrigatória" })}
              className={`w-full p-2 rounded-lg border ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
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
