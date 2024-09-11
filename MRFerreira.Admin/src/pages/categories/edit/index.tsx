import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import MainLayout from "../../../components/layout";
import { SubmitHandler, useForm } from "react-hook-form";
import ServiceResult from "../../../interface/service-result";
import CategoryModel from "../../../interface/models/category-model";
import api from "../../../services/api-client";
import { getApiErrorMessage } from "../../../services/api-error-handler";

interface CategoryField {
  nome: string;
}

export default function EditCaategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/categorias",
      name: "Categorias",
    },
    {
      link: `/catgorias/editar/${categoryId}`,
      name: `Editar categoria`,
    },
  ];

  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryField>();

  const fetchCategory = async (): Promise<void> => {
    setLoadingCategory(true);

    api
      .get<ServiceResult<CategoryModel>>(
        `/categories/${categoryId}`
      )
      .then(({ data }) => {
        const category = data.results as CategoryModel;
        setValue("nome", category.nome);
      })
      .catch((error) => {
        toast.error("Erro ao buscar dados do fornecedor: ", error);
      })
      .finally(() => setLoadingCategory(false));
  };

  const onSubmitChange: SubmitHandler<CategoryField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nome", data.nome);

    toast.promise(
      api.post<ServiceResult>(
        `/categories/update/${categoryId}`,
        formData
      ),

      {
        loading: "Editando categoria...",
        success: () => {
          navigate("/categorias");
          return "Categoria editada com sucesso!";
        },
        error: (error) => getApiErrorMessage(error),
      }
    );
  };

  useEffect(() => {
    fetchCategory();
  }, [categoryId]);

  return (
    <MainLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-5" onSubmit={handleSubmit(onSubmitChange)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-10">
            <input
              type="text"
              id="nome"
              placeholder={
                loadingCategory ? "..." : "Informe o nome da categoria"
              }
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("nome", { required: "O nome é obrigatório" })}
              disabled={loadingCategory}
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
              Editar
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
