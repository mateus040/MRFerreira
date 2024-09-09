import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout";
import { useAuth } from "../../context/auth-context";
import BreadCrumb, { Page } from "../../components/bread-crumb";
import { useEffect, useState } from "react";
import ProdutoModel from "../../interface/models/product-model";
import FornecedorModel from "../../interface/models/company-model";
import CategoriaModel from "../../interface/models/category-model";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import toast from "react-hot-toast";
import Loading from "../../components/loadings/loading";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { firebaseStorage } from "../../components/firebase/firebaseConfig";

export default function Products() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/produtos",
      name: "Produtos",
    },
  ];

  const { token } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [products, setProducts] = useState<ProdutoModel[]>([]);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);
  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const navigateToEditPage = (product: ProdutoModel) => {
    navigate(`/produtos/editar/${product.id}`);
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productsData: ProdutoModel[] = response.data.results;

      setProducts(productsData);

      // Get all unique logo paths
      const logoPaths = productsData
        .map((product) => product.foto)
        .filter((logoPath) => logoPath !== null) as string[];

      // Fetch URLs for all logos
      const logosTemp: { [key: string]: string } = {};
      await Promise.all(
        logoPaths.map(async (logoPath) => {
          try {
            const logoRef = ref(firebaseStorage, logoPath);
            const logoUrl = await getDownloadURL(logoRef);
            logosTemp[logoPath] = logoUrl;
          } catch (error) {
            console.error(`Error fetching logo for path ${logoPath}:`, error);
          }
        })
      );

      setLogos(logosTemp);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteProduct = async (productId: string) => {
    setLoadingDelete(true);

    toast
      .promise(
        axios.delete(
          `https://mrferreira-api.vercel.app/api/api/products/delete/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        {
          loading: "Excluindo produto...",
          success: () => {
            const updatedProducts = products.filter(
              (product) => product.id !== productId
            );
            setProducts(updatedProducts);
            fetchProducts();
            return "Produto excluído com sucesso!";
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
        setLoadingDelete(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
        <Link
          to="/produtos/adicionar"
          className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
        >
          Adicionar
        </Link>
      </div>

      {loading && <Loading centered />}

      {!loading && (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Nome
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Descrição
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Categoria
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Fornecedor
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Linha
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Materiais
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Comprimento
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Altura
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Profundidade
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Peso Sup.
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Foto
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr className="bg-white" key={product.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.nome}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.descricao}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {
                        categories.find(
                          (category) => category.id === product.id_category
                        )?.nome
                      }
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {
                        providers.find(
                          (provider) => provider.id === product.id_provider
                        )?.nome
                      }
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.linha}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.materiais}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.comprimento}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.altura}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.profundidade}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.peso}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {logos[product.foto] && (
                        <img
                          src={logos[product.foto]}
                          className="max-w-[50px] max-h-[50px] object-cover"
                          alt="foto"
                        />
                      )}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                      <AiOutlineEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigateToEditPage(product)}
                        size={20}
                      />
                      <button disabled={loadingDelete}>
                        <AiOutlineDelete
                          className="text-red-600 cursor-pointer ml-2"
                          onClick={() => deleteProduct(product.id)}
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {products.map((product) => (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={product.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span>Nome:</span>
                  <span className="text-gray-500">{product.nome}</span>
                </div>
                <div className="text-sm">
                  Descrição:{" "}
                  <span className="text-gray-700">{product.descricao}</span>
                </div>
                <div className="text-sm">
                  Categoria:{" "}
                  <span className="text-gray-700">
                    {" "}
                    {
                      categories.find(
                        (category) => category.id === product.id_category
                      )?.nome
                    }
                  </span>
                </div>
                <div className="text-sm">
                  Fornecedor:{" "}
                  <span className="text-gray-700">
                    {
                      providers.find(
                        (provider) => provider.id === product.id_provider
                      )?.nome
                    }
                  </span>
                </div>
                <div className="text-sm">
                  Linha: <span className="text-gray-700">{product.linha}</span>
                </div>
                <div className="text-sm">
                  Materiais:{" "}
                  <span className="text-gray-700">{product.materiais}</span>
                </div>
                <div className="text-sm">
                  Comprimento:{" "}
                  <span className="text-gray-700">{product.comprimento}</span>
                </div>
                <div className="text-sm">
                  Altura:{" "}
                  <span className="text-gray-700">{product.altura}</span>
                </div>
                <div className="text-sm">
                  Profundidade:{" "}
                  <span className="text-gray-700">{product.profundidade}</span>
                </div>
                <div className="text-sm">
                  Peso: <span className="text-gray-700">{product.peso}</span>
                </div>
                {logos[product.foto] && (
                  <img
                    src={logos[product.foto]}
                    className="object-cover"
                    alt="foto"
                  />
                )}
                <button
                  onClick={() => navigateToEditPage(product)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                  disabled={loadingDelete}
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum produto encontrado
        </div>
      )}
    </MainLayout>
  );
}
