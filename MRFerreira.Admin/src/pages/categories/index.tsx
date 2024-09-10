import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../interface/models/category-model";
import { useAuth } from "../../context/auth-context";
import BreadCrumb, { Page } from "../../components/bread-crumb";
import MainLayout from "../../components/layout";
import Loading from "../../components/loadings/loading";
import ListServiceResult from "../../interface/list-service-result";
import apiErrorHandler, {
  getApiErrorMessage,
} from "../../services/api-error-handler";
import { SubmitHandler, useForm } from "react-hook-form";
import ServiceResult from "../../interface/service-result";

interface CategoryField {
  nome: string;
}

export default function Categories() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/categorias",
      name: "Categorias",
    },
  ];

  const { token } = useAuth();

  const navigate = useNavigate();

  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryField>();

  const navigateToEditPage = (category: CategoryModel) => {
    navigate(`/categorias/editar/${category.id}`);
  };

  const fetchCategories = async (): Promise<void> => {
    setLoadingCategories(true);

    axios
      .get<ListServiceResult<CategoryModel>>(
        "https://mrferreira-api.vercel.app/api/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setCategories(data.results);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoadingCategories(false));
  };

  const deleteCategories = async (categoryId: string) => {
    setLoadingDelete(true);

    toast
      .promise(
        axios.delete<ServiceResult>(
          `https://mrferreira-api.vercel.app/api/api/categories/delete/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Excluindo categoria...",
          success: () => {
            const updatedCategories = categories.filter(
              (category) => category.id !== categoryId
            );
            setCategories(updatedCategories);
            fetchCategories();
            return "Categoria excluída com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => setLoadingDelete(false));
  };

  const onSubmitChange: SubmitHandler<CategoryField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);

    toast.promise(
      axios.post<ServiceResult>(
        "https://mrferreira-api.vercel.app/api/api/categories/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: "Cadastrando categoria...",
        success: () => {
          fetchCategories();
          reset();
          return "Categoria criada com sucesso!";
        },
        error: (error) => getApiErrorMessage(error),
      }
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-5" onSubmit={handleSubmit(onSubmitChange)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-10">
            <input
              type="text"
              id="nome"
              placeholder="Informe o nome da categoria"
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </div>

          <div className="col-span-12 lg:col-span-2">
            <button
              className="w-full px-8 py-2 flex items-center justify-center h-full bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-full"
              type="submit"
              disabled={loading}
            >
              Adicionar
            </button>
          </div>
        </div>
      </form>

      {loadingCategories && <Loading centered />}

      {!loadingCategories && (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block mt-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Nome
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr className="bg-white" key={category.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {category.nome}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                      <AiOutlineEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigateToEditPage(category)}
                        size={20}
                      />
                      <button disabled={loadingDelete}>
                        <AiOutlineDelete
                          className="text-red-600 cursor-pointer ml-2"
                          onClick={() => deleteCategories(category.id)}
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loadingCategories && categories.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum categoria encontrada
        </div>
      )}
    </MainLayout>
  );
}
