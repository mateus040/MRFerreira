import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";
import { useAuth } from "../../context/auth-context";
import CardsModel from "../../interface/models/cards-model";
import toast from "react-hot-toast";
import Loading from "../../components/loadings/loading";
import ServiceResult from "../../interface/service-result";
import api from "../../services/api-client";

export default function Home() {
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardsModel>();

  const fetchCards = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<CardsModel>>(`/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setCards(data.results as CardsModel);
      })
      .catch((error) => {
        console.error("Erro ao buscar informações cards:", error);
        toast.error("Erro ao buscar informações dos cards.");
      })
      .finally(() => setLoading(false))
  };

  // const fetchCards = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(
  //       `/cards`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setCards(response.data.results);
  //   } catch (error) {
  //     console.error("Erro ao buscar informações cards:", error);
  //     toast.error("Erro ao buscar informações dos cards.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white shadow-lg w-full py-4 px-5">
            <p className="text-sm font-medium">Empresas cadastrados</p>
            <div className="mt-2">
              {loading && <Loading className="mt-2 mb-2" />}

              {!loading && (
                <p className="text-4xl font-medium">
                  {cards?.providers_count !== 0 ? cards?.providers_count : 0}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white shadow-lg w-full py-4 px-5">
            <p className="text-sm font-medium">Produtos cadastrados</p>
            <div className="mt-2">
              {loading && <Loading className="mt-2 mb-2" />}

              {!loading && (
                <p className="text-4xl font-medium">
                  {cards?.products_count !== 0 ? cards?.products_count : 0}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <div className="bg-white shadow-lg w-full py-4 px-5">
            <p className="text-sm font-medium">Categorias cadastrados</p>
            <div className="mt-2">
              {loading && <Loading className="mt-2 mb-2" />}

              {!loading && (
                <p className="text-4xl font-medium">
                  {cards?.categories_count !== 0 ? cards?.categories_count : 0}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
