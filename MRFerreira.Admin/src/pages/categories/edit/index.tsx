import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth-context";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import MainLayout from "../../../components/layout";
import { SubmitHandler, useForm } from "react-hook-form";

interface CategoryField {
  nome: string;
}

export default function EditCaategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { token } = useAuth();
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

    axios
      .get(
        `https://mrferreira-api.vercel.app/api/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        const category = data.results;
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
      new Promise((resolve, reject) => {
        axios
          .post(
            `https://mrferreira-api.vercel.app/api/api/categories/update/${categoryId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
      {
        loading: "Editando categoria...",
        success: () => {
          navigate("/categorias");
          return "Categoria editada com sucesso!";
        },
        error: (error) => {
          if (axios.isAxiosError(error)) {
            return (
              "Erro de solicitação: " + (error.response?.data || error.message)
            );
          } else if (error instanceof Error) {
            return "Erro desconhecido: " + error.message;
          } else {
            return "Erro inesperado: " + error;
          }
        },
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
