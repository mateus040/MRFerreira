import { useNavigate } from "react-router-dom";
import { Page } from "../../components/bread-crumb";
import { useState } from "react";

export default function User() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/users",
      name: "Usuários",
    },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [users, setUsers] = useState<ProductModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const navigateToEditPage = (product: ProductModel) => {
    navigate(`/produtos/editar/${product.id}`);
  };

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<ProductModel>>("/products")
      .then(({ data }) => {
        const productsData = data.data;

        setProducts(productsData);

        const logosTemp: { [key: string]: string } = {};
        productsData.forEach((product) => {
          if (product.foto_url) {
            logosTemp[product.photo] = product.foto_url;
          }
        });

        setLogos(logosTemp);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  const deleteProduct = async (productId: string) => {
    setLoadingDelete(true);

    toast
      .promise<ServiceResult>(
        api.delete(`/products/${productId}`),

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
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  useEffect(() => {
    fetchProducts();
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
                      {product.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.description.length > 50
                        ? `${product.description.slice(0, 50)}...`
                        : product.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.category.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.provider.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.line}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.materials}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.length}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.height}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.depth}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {product.weight}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {logos[product.photo] && (
                        <img
                          src={logos[product.photo]}
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
                  <span className="text-gray-500">{product.name}</span>
                </div>
                <div className="text-sm">
                  Descrição:{" "}
                  <span className="text-gray-700">{product.description}</span>
                </div>
                <div className="text-sm">
                  Categoria:{" "}
                  <span className="text-gray-700">{product.category.name}</span>
                </div>
                <div className="text-sm">
                  Fornecedor:{" "}
                  <span className="text-gray-700">{product.provider.name}</span>
                </div>
                <div className="text-sm">
                  Linha: <span className="text-gray-700">{product.line}</span>
                </div>
                <div className="text-sm">
                  Materiais:{" "}
                  <span className="text-gray-700">{product.materials}</span>
                </div>
                <div className="text-sm">
                  Comprimento:{" "}
                  <span className="text-gray-700">{product.length}</span>
                </div>
                <div className="text-sm">
                  Altura:{" "}
                  <span className="text-gray-700">{product.height}</span>
                </div>
                <div className="text-sm">
                  Profundidade:{" "}
                  <span className="text-gray-700">{product.depth}</span>
                </div>
                <div className="text-sm">
                  Peso: <span className="text-gray-700">{product.weight}</span>
                </div>
                {logos[product.photo] && (
                  <img
                    src={logos[product.photo]}
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