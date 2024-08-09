import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../context/auth-context";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import FornecedorModel from "../../../interface/models/FornecedorModel";
import CategoriaModel from "../../../interface/models/CategoriaModel";
import MainLayout from "../../../components/layout";
import Loading from "../../../components/loadings/loading";

interface ProductField {
  nome: string;
  descricao: string;
  comprimento: number;
  altura: number;
  profundidade: number;
  peso: number;
  linha: string;
  materiais: string;
  foto: File | string;
  id_provider: string;
  id_category: string;
}

export default function EditProduct() {
  const { productId } = useParams<{ productId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const breadCrumbHistory: Page[] = [
    { link: "/admin", name: "Início" },
    { link: "/admin/produtos", name: "Produtos" },
    { link: `/admin/fornecedores/editar/${productId}`, name: "Editar produto" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductField>();

  const [providers, setProviders] = useState<FornecedorModel[]>([]);
  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const product = response.data.product;
      setValue("nome", product.nome);
      setValue("descricao", product.descricao);
      setValue("comprimento", product.comprimento);
      setValue("altura", product.altura);
      setValue("profundidade", product.profundidade);
      setValue("peso", product.peso);
      setValue("linha", product.linha);
      setValue("materiais", product.materiais);
      setValue("id_provider", product.id_provider);
      setValue("id_category", product.id_category);
    } catch (error) {
      console.error("Erro ao buscar dados do produto:", error);
      toast.error("Erro ao buscar dados do produto.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/providers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProviders(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const onSubmitChange: SubmitHandler<ProductField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("comprimento", data.comprimento.toString());
    formData.append("altura", data.altura.toString());
    formData.append("profundidade", data.profundidade.toString());
    formData.append("peso", data.peso.toString());
    formData.append("linha", data.linha);
    formData.append("materiais", data.materiais);
    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    if (data.foto instanceof File) {
      formData.append("foto", data.foto);
    }

    toast
      .promise(
        axios.post(
          `https://mrferreira-api.vercel.app/api/api/products/update/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Editando produto...",
          success: () => {
            navigate("/admin/produtos");
            return "Produto editado com sucesso!";
          },
          error: (error) => {
            if (axios.isAxiosError(error)) {
              return `Erro de solicitação: ${
                error.response?.data || error.message
              }`;
            } else if (error instanceof Error) {
              return `Erro desconhecido: ${error.message}`;
            } else {
              return `Erro inesperado: ${error}`;
            }
          },
        }
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
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

      {loadingProducts && <Loading centered />}

      {!loadingProducts && (
        <form className="mt-8" onSubmit={handleSubmit(onSubmitChange)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Nome*</label>
              <input
                type="text"
                id="nome"
                placeholder="Informe o nome do produto"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("nome", { required: "O nome é obrigatório" })}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome.message}</p>
              )}
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Fornecedor*</label>
              <select
                id="id_provider"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("id_provider", {
                  required: "O fornecedor é obrigatório",
                })}
              >
                <option value="">Selecione um fornecedor</option>
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
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Descrição*</label>
              <input
                type="text"
                id="descricao"
                placeholder="Informe a descrição"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                })}
              />
              {errors.descricao && (
                <p className="text-red-500 text-sm">
                  {errors.descricao.message}
                </p>
              )}
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Categoria*</label>
              <select
                id="id_category"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("id_category", {
                  required: "A categoria é obrigatória",
                })}
              >
                <option value="">Selecione uma categoria</option>
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
            <div className="col-span-12 lg:col-span-12">
              <label className="block mb-2 font-medium">Materiais</label>
              <input
                type="text"
                id="materiais"
                placeholder="Informe os materiais"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("materiais")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Linha</label>
              <input
                type="text"
                id="linha"
                placeholder="Informe a linha do produto"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("linha")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Comprimento</label>
              <input
                type="number"
                id="comprimento"
                placeholder="Informe o comprimento"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("comprimento")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Altura</label>
              <input
                type="number"
                id="altura"
                placeholder="Informe a altura"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("altura")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Profundidade</label>
              <input
                type="number"
                id="profundidade"
                placeholder="Informe a profundidade"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("profundidade")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Peso</label>
              <input
                type="number"
                id="peso"
                placeholder="Informe o peso"
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("peso")}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
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
      )}
    </MainLayout>
  );
}
