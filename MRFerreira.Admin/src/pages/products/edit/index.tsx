import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import ProviderModel from "../../../interface/models/provider-model";
import CategoryModel from "../../../interface/models/category-model";
import MainLayout from "../../../components/layout";
import ListServiceResult from "../../../interface/list-service-result";
import ServiceResult from "../../../interface/service-result";
import ProductModel from "../../../interface/models/product-model";
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

export default function EditProduct() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);

  const breadCrumbHistory: Page[] = [
    { link: "/", name: "Início" },
    { link: "/produtos", name: "Produtos" },
    { link: `/produtos/editar/${productId}`, name: "Editar produto" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProductField>();

  const [providers, setProviders] = useState<ProviderModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [lengthUnit, setLengthUnit] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("");
  const [depthUnit, setDepthUnit] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("");

  const fetchProduct = async (): Promise<void> => {
    setLoadingProducts(true);

    api
      .get<ServiceResult<ProductModel>>(`/products/${productId}`)
      .then(({ data }) => {
        const product = data.data as ProductModel;
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("length", product.length.toString());
        setValue("height", product.height.toString());
        setValue("depth", product.depth.toString());
        setValue("weight", product.weight.toString());
        setValue("line", product.line);
        setValue("materials", product.materials);
        setValue("id_provider", product.id_provider);
        setValue("id_category", product.id_category);
      })
      .catch((error) => {
        toast.error("Erro ao buscar dados do produtos: ", error);
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  };

  const fetchProviders = async (): Promise<void> => {
    setLoadingProviders(true);

    api
      .get<ListServiceResult<ProviderModel>>("/providers")
      .then(({ data }) => {
        setProviders(data.data);
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
        setCategories(data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar categorias: ", error);
      })
      .finally(() => setLoadingCategories(false));
  };

  const onSubmitChange: SubmitHandler<ProductField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("length", data.length || "");
    formData.append("height", data.height || "");
    formData.append("depth", data.depth || "");
    formData.append("weight", data.weight || "");
    formData.append("line", data.line);
    formData.append("materials", data.materials);
    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    if (data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    toast
      .promise(
        api.post<ServiceResult>(`/products/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Editando produto...",
          success: () => {
            navigate("/produtos");
            return "Produto editado com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => setLoading(false));
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
    setValue("length", `${lengthValue?.split(" ")[0]} ${selectedValue}`);
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
    setValue("depth", `${depthValue?.split(" ")[0]} ${selectedValue}`);
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

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-8" onSubmit={handleSubmit(onSubmitChange)}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="name"
              placeholder={
                loadingProducts ? "..." : "Informe o nome do produto"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("name", { required: "O nome é obrigatório" })}
              disabled={loadingProducts}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Categoria*</label>
            <select
              id="id_category"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("id_category", {
                required: "A categoria é obrigatória",
              })}
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
            <label className="block mb-2 font-medium">Empresa*</label>
            <select
              id="id_provider"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("id_provider", {
                required: "A empresa é obrigatória",
              })}
              disabled={loadingProviders}
            >
              <option value="">
                {loadingProviders ? "..." : "Selecione uma empresa"}
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
              id="descricao"
              placeholder={loadingProducts ? "..." : "Informe a descrição"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("description", {
                required: "A descrição é obrigatória",
              })}
              disabled={loadingProducts}
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-12">
            <label className="block mb-2 font-medium">Materiais</label>
            <input
              type="text"
              id="materials"
              placeholder={loadingProducts ? "..." : "Informe os materiais"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("materials")}
              disabled={loadingProducts}
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="line"
              placeholder={
                loadingProducts ? "..." : "Informe a linha do produto"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("line")}
              disabled={loadingProducts}
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Comprimento</label>
            <div className="flex">
              <input
                type="text"
                id="length"
                placeholder={loadingProducts ? "..." : "Informe o comprimento"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("length")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Altura</label>
            <div className="flex">
              <input
                type="text"
                id="height"
                placeholder={loadingProducts ? "..." : "Informe a altura"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("height")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Profundidade</label>
            <div className="flex">
              <input
                type="text"
                id="depth"
                placeholder={loadingProducts ? "..." : "Informe a profundidade"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("depth")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Peso</label>
            <div className="flex">
              <input
                type="text"
                id="weight"
                placeholder={loadingProducts ? "..." : "Informe o peso"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("weight")}
                disabled={loadingProducts}
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
              accept="image/*"
              id="photo"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("photo")}
            />
            {/* <input
              type="file"
              id="photo"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("photo")}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("photo", e.target.files[0]);
                }
              }}
              disabled={loadingProducts}
            /> */}
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
