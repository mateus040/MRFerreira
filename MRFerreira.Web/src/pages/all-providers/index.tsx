import { Link, useSearchParams } from "react-router-dom";
import MainLayout from "../../components/layouts/main";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import FornecedorModel from "../../interface/models/FornecedorModel";
import formatNameForURL from "../../utils/formatNameForURL";
import ListServiceResult from "../../interface/list-service-result";
import apiErrorHandler from "../../services/api-error-handler";
import api from "../../services/api-client";
import AOS from "aos";

export default function AllProviders() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchProviders = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<FornecedorModel>>(
        "https://mrferreira-api.vercel.app/api/api/providers"
      )
      .then(({ data }) => {
        const providersData = data.results;
        setProviders(providersData);

        const logosTemp: { [key: string]: string } = {};
        providersData.forEach((provider) => {
          if (provider.logo_url) {
            logosTemp[provider.logo] = provider.logo_url;
          }
        });

        setLogos(logosTemp);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchParams({ search });
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <MainLayout>
      <div className="px-8 lg:px-12 py-12 container mx-auto">
        <div className="mt-10">
          {loading && <Loading centered />}

          {!loading && (
            <>
              <p className="text-2xl sm:text-3xl font-semibold text-center">
                Todos as empresas
              </p>
              <p className="text-md mt-3 text-gray-600 text-center">
                Conheça todos as nossas empresas parceiras
              </p>
              <form className="mt-8">
                <input
                  type="text"
                  name="search"
                  className="w-full px-4 py-2 rounded-lg"
                  placeholder="Pesquisar fornecedor"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>

              <div className="mt-8" data-aos="fade-left">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {providers.map((provider) => (
                    <div className="col-span-4" key={provider.id}>
                      <div className="col-span-4" key={provider.id}>
                        <div className="bg-white px-6 py-8 rounded-lg flex flex-col justify-between">
                          <div className="flex flex-col items-center justify-center">
                            <div className="hover:scale-105 transtion-transform cursor-pointer">
                              {logos[provider.logo] && (
                                <img
                                  src={logos[provider.logo]}
                                  className="h-52 object-contain"
                                />
                              )}
                            </div>
                            <p className="mt-4 text-xl font-semibold text-center">
                              {provider.nome}
                            </p>
                            <div className="flex justify-center mt-8">
                              <Link
                                to={`/fornecedor/${
                                  provider.id
                                }?fornecedor=${formatNameForURL(
                                  provider.nome
                                )}`}
                                className="flex items-center justify-center w-[230px] border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                              >
                                Ver catálogo
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!loading && providers.length === 0 && (
            <div className="flex items-center justify-center text-gray-500 text-xl">
              Nenhuma empresa encontrada.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
