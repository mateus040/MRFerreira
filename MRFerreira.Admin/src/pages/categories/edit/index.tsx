import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth-context";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import MainLayout from "../../../components/layout";
import Loading from "../../../components/loadings/loading";

interface CategoryField {
  nome: string;
}

export default function EditCaategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/categorias",
      name: "Categorias",
    },
    {
      link: `/admin/catgorias/editar/${categoryId}`,
      name: `Editar categoria`,
    },
  ];

  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [categoryData, setCategoryData] = useState<CategoryField>({
    nome: "",
  });

  const fetchCategory = async () => {
    setLoadingCategory(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryData(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar dados do fornecedor:", error);
      toast.error("Erro ao buscar dados do fornecedor.");
    } finally {
      setLoadingCategory(false);
    }
  };

  const changeCategoryFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Verifica se o valor é null ou undefined e define como string vazia
    const sanitizedValue = value === null || value === undefined ? "" : value;
    setCategoryData((prevData) => ({
      ...prevData,
      [id]: sanitizedValue,
    }));
  };

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nome", categoryData.nome);

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
          navigate("/admin/categorias");
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

      {loadingCategory && <Loading centered />}

      {!loadingCategory && (
        <form className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-10">
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Informe o nome da categoria"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeCategoryFieldHandler(e)}
                value={
                  categoryData && categoryData.nome ? categoryData.nome : ""
                }
                required
              />
            </div>

            <div className="col-span-12 lg:col-span-2">
              <button
                className="w-full px-8 py-2 flex items-center justify-center h-full bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-full"
                type="submit"
                onClick={(e) => onSubmitChange(e)}
                disabled={loading}
              >
                Adicionar
              </button>
            </div>
          </div>
        </form>
      )}
    </MainLayout>
  );
}
