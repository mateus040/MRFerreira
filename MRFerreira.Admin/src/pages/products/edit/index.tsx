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
  nome: string;
  descricao: string;
  comprimento: string | null;
  altura: string | null;
  profundidade: string | null;
  peso: string | null;
  linha: string;
  materiais: string;
  foto: File | string;
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

  const [comprimentoUnit, setComprimentoUnit] = useState<string>("");
  const [alturaUnit, setAlturaUnit] = useState<string>("");
  const [profundidadeUnit, setProfundidadeUnit] = useState<string>("");
  const [pesoUnit, setPesoUnit] = useState<string>("");

  const fetchProduct = async (): Promise<void> => {
    setLoadingProducts(true);

    api
      .get<ServiceResult<ProductModel>>(
        `/products/${productId}`
      )
      .then(({ data }) => {
        const product = data.results as ProductModel;
        setValue("nome", product.nome);
        setValue("descricao", product.descricao);
        setValue("comprimento", product.comprimento.toString());
        setValue("altura", product.altura.toString());
        setValue("profundidade", product.profundidade.toString());
        setValue("peso", product.peso.toString());
        setValue("linha", product.linha);
        setValue("materiais", product.materiais);
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
      .get<ListServiceResult<ProviderModel>>(
        "/providers"
      )
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
      .get<ListServiceResult<CategoryModel>>(
        "/categories"
      )
      .then(({ data }) => {
        setCategories(data.results);
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
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("comprimento", data.comprimento || "");
    formData.append("altura", data.altura || "");
    formData.append("profundidade", data.profundidade || "");
    formData.append("peso", data.peso || "");
    formData.append("linha", data.linha);
    formData.append("materiais", data.materiais);
    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    if (data.foto instanceof File) {
      formData.append("foto", data.foto);
    }

    toast
      .promise(
        api.post<ServiceResult>(
          `/products/update/${productId}`,
          formData
        ),
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
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-8" onSubmit={handleSubmit(onSubmitChange)}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 xl:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="nome"
              placeholder={
                loadingProducts ? "..." : "Informe o nome do produto"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("nome", { required: "O nome é obrigatório" })}
              disabled={loadingProducts}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
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
          <div className="col-span-12 xl:col-span-8">
            <label className="block mb-2 font-medium">Descrição*</label>
            <input
              type="text"
              id="descricao"
              placeholder={loadingProducts ? "..." : "Informe a descrição"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("descricao", {
                required: "A descrição é obrigatória",
              })}
              disabled={loadingProducts}
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm">{errors.descricao.message}</p>
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
          <div className="col-span-12 xl:col-span-12">
            <label className="block mb-2 font-medium">Materiais</label>
            <input
              type="text"
              id="materiais"
              placeholder={loadingProducts ? "..." : "Informe os materiais"}
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("materiais")}
              disabled={loadingProducts}
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="linha"
              placeholder={
                loadingProducts ? "..." : "Informe a linha do produto"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("linha")}
              disabled={loadingProducts}
            />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Comprimento</label>
            <div className="flex">
              <input
                type="text"
                id="comprimento"
                placeholder={loadingProducts ? "..." : "Informe o comprimento"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("comprimento")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Altura</label>
            <div className="flex">
              <input
                type="text"
                id="altura"
                placeholder={loadingProducts ? "..." : "Informe a altura"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("altura")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Profundidade</label>
            <div className="flex">
              <input
                type="text"
                id="profundidade"
                placeholder={loadingProducts ? "..." : "Informe a profundidade"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("profundidade")}
                disabled={loadingProducts}
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
            <label className="block mb-2 font-medium">Peso</label>
            <div className="flex">
              <input
                type="text"
                id="peso"
                placeholder={loadingProducts ? "..." : "Informe o peso"}
                className="flex-1 p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none"
                {...register("peso")}
                disabled={loadingProducts}
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
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("foto")}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("foto", e.target.files[0]);
                }
              }}
              disabled={loadingProducts}
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
