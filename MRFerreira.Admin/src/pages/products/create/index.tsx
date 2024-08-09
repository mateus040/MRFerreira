import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth-context";
import FornecedorModel from "../../../interface/models/FornecedorModel";
import CategoriaModel from "../../../interface/models/CategoriaModel";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import { SubmitHandler, useForm } from "react-hook-form";
import MainLayout from "../../../components/layout";

interface ProductField {
  nome: string;
  descricao: string;
  comprimento: number;
  altura: number;
  profundidade: number;
  peso: number;
  linha: string;
  materiais: string;
  foto: FileList;
  id_provider: string;
  id_category: string;
}

export default function CreateProducts() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/produtos",
      name: "Produtos",
    },
    {
      link: "/admin/produtos/adicionar",
      name: "Adicionar produtos",
    },
  ];

  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);
  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductField>();

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/providers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const providersData: FornecedorModel[] = response.data.results;
      setProviders(providersData);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const categoriesData: CategoriaModel[] = response.data.results;
      setCategories(categoriesData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const onSubmit: SubmitHandler<ProductField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("comprimento", data.comprimento.toString());
    formData.append("altura", data.altura.toString());
    formData.append("profundidade", data.profundidade.toString());
    formData.append("peso", data.peso.toString());
    formData.append("linha", data.linha);
    formData.append("materiais", data.materiais);
    if (data.foto.length > 0) {
      formData.append("foto", data.foto[0]);
    }
    formData.append("id_provider", data.id_provider);
    formData.append("id_category", data.id_category);

    toast
      .promise(
        axios.post(
          "https://mrferreira-api.vercel.app/api/api/products/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Cadastrando produto...",
          success: () => {
            navigate("/admin/produtos");
            return "Produto criado com sucesso!";
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
    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
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
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Fornecedor*</label>
            <select
              id="id_provider"
              {...register("id_provider", {
                required: "O fornecedor é obrigatório",
              })}
              className={`w-full p-2 rounded-lg border ${
                errors.id_provider ? "border-red-500" : "border-gray-300"
              }`}
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
              {...register("descricao", {
                required: "A descrição é obrigatória",
              })}
              placeholder="Informe a descrição"
              className={`w-full p-2 rounded-lg border ${
                errors.descricao ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm">{errors.descricao.message}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Categoria*</label>
            <select
              id="id_category"
              {...register("id_category", {
                required: "A categoria é obrigatória",
              })}
              className={`w-full p-2 rounded-lg border ${
                errors.id_category ? "border-red-500" : "border-gray-300"
              }`}
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
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="linha"
              {...register("linha")}
              placeholder="Informe a linha"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Comprimento (cm)</label>
            <input
              type="number"
              id="comprimento"
              {...register("comprimento", { valueAsNumber: true })}
              placeholder="Informe o comprimento"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Altura (cm)</label>
            <input
              type="number"
              id="altura"
              {...register("altura", { valueAsNumber: true })}
              placeholder="Informe a altura"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Profundidade (cm)</label>
            <input
              type="number"
              id="profundidade"
              {...register("profundidade", { valueAsNumber: true })}
              placeholder="Informe a profundidade"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Peso (kg)</label>
            <input
              type="number"
              id="peso"
              {...register("peso", { valueAsNumber: true })}
              placeholder="Informe o peso"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
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
