import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProdutoModel from "../../interface/models/ProdutoModel";
import axios from "axios";
import formatNameForURL from "../../utils/formatNameForURL";
import Loading from "../../components/loading";
import MainLayout from "../../components/layouts/main";
import ListServiceResult from "../../interface/list-service-result";
import apiErrorHandler from "../../services/api-error-handle";

export default function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<ProdutoModel[]>([]);

  const [fotos, setFotos] = useState<{ [key: string]: string }>({});

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);

    axios
      .get<ListServiceResult<ProdutoModel>>(
        "https://mrferreira-api.vercel.app/api/api/products"
      )
      .then(({ data }) => {
        const productsData = data.results;
        setProducts(productsData);

        const logosTemp: { [key: string]: string } = {};
        productsData.forEach((product) => {
          if (product.foto_url) {
            logosTemp[product.foto] = product.foto_url;
          }
        });

        setFotos(logosTemp);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchParams({ search });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <div className="px-8 lg:px-12 py-12 container mx-auto">
        <div className="mt-10">
          {loading && <Loading centered />}

          {!loading && (
            <>
              <p className="text-2xl sm:text-3xl font-semibold text-center">
                Todos os produtos
              </p>
              <p className="text-md mt-3 text-gray-600 text-center">
                Conheça todos os nossos produtos
              </p>
              <form className="mt-8">
                <input
                  type="text"
                  name="search"
                  className="w-full px-4 py-2 rounded-lg"
                  placeholder="Pesquisar produto"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>

              <div className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {products.map((product) => (
                    <div className="col-span-4" key={product.id}>
                      <div className="col-span-4" key={product.id}>
                        <div className="bg-white px-12 py-16 rounded-lg">
                          <div className="flex flex-col items-center justify-center">
                            <div className="hover:scale-105 transtion-transform cursor-pointer">
                              {fotos[product.foto] && (
                                <img
                                  src={fotos[product.foto]}
                                  className="h-52 object-contain"
                                />
                              )}
                            </div>
                            <p className="mt-8 text-xl font-semibold text-center">
                              {product.nome}
                            </p>
                            <p className="mt-3 text-md text-center">
                              {product.provider.nome}
                            </p>
                            <Link
                              to={`/produtos/${
                                product.id
                              }?produto=${formatNameForURL(product.nome)}`}
                              className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                            >
                              Detalhes
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!loading && products.length === 0 && (
            <div className="flex items-center justify-center text-gray-500 text-xl">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
