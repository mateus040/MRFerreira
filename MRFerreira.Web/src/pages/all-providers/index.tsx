import { Link, useSearchParams } from "react-router-dom";
import MainLayout from "../../components/layouts/main";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import FornecedorModel from "../../interface/models/FornecedorModel";
import axios from "axios";
import formatNameForURL from "../../utils/formatNameForURL";

export default function AllProviders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchProviders = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/providers"
      );
      const providersData: FornecedorModel[] = response.data.results;

      setProviders(providersData);

      // Gerar o objeto logosTemp a partir dos dados dos fornecedores
      const logosTemp: { [key: string]: string } = {};
      providersData.forEach((provider) => {
        if (provider.logo_url) {
          logosTemp[provider.logo] = provider.logo_url;
        }
      });

      setLogos(logosTemp);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
    } finally {
      setLoading(false);
    }
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

              <div className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {providers.map((provider) => (
                    <div className="col-span-4" key={provider.id}>
                      <div className="col-span-4" key={provider.id}>
                        <div className="bg-white px-12 py-16 rounded-lg">
                          <div className="flex flex-col items-center justify-center">
                            <div className="hover:scale-105 transtion-transform cursor-pointer">
                              {logos[provider.logo] && (
                                <img
                                  src={logos[provider.logo]}
                                  className="h-52 object-contain"
                                />
                              )}
                            </div>
                            <p className="mt-8 text-xl font-semibold text-center">
                              {provider.nome}
                            </p>
                            <Link
                              to={`/fornecedor/${
                                provider.id
                              }?fornecedor=${formatNameForURL(provider.nome)}`}
                              className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                            >
                              Ver catálogo
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
