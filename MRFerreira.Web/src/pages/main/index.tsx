import { useEffect, useState } from "react";
import ProdutoModel from "../../interface/models/ProdutoModel";
import FornecedorModel from "../../interface/models/FornecedorModel";
import { Home } from "./components/home";
import { SectionProducts } from "./components/products";
import { SectionProviders } from "./components/providers";
import { SectionAbout } from "./components/about";
import { SectionContact } from "./components/contact";
import MainLayout from "../../components/layouts/main";
import { useSearchParams } from "react-router-dom";
import ListServiceResult from "../../interface/list-service-result";
import apiErrorHandler from "../../services/api-error-handler";
import api from "../../services/api-client";

export default function Main() {
  const [searchParams, _] = useSearchParams();
  const section = searchParams.get("section");

  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);

  const [products, setProducts] = useState<ProdutoModel[]>([]);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});
  const [fotos, setFotos] = useState<{ [key: string]: string }>({});

  const fetchProducts = async (): Promise<void> => {
    setLoadingProducts(true);

    api
      .get<ListServiceResult<ProdutoModel>>(
        "https://mrferreira-api.vercel.app/api/api/products"
      )
      .then(({ data }) => {
        const productsData = data.results;
        setProducts(productsData);

        // Gerar o objeto logosTemp a partir dos dados dos produtos
        const logosTemp: { [key: string]: string } = {};
        productsData.forEach((product) => {
          if (product.foto_url) {
            logosTemp[product.foto] = product.foto_url;
          }
        });

        setFotos(logosTemp);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoadingProducts(false));
  };

  const fetchProviders = async (): Promise<void> => {
    setLoadingProviders(true);

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
      .finally(() => setLoadingProviders(false));
  };

  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 10);
    }
  }, [section]);

  useEffect(() => {
    fetchProducts();
    fetchProviders();
  }, []);

  return (
    <MainLayout>
      <div className="w-full overflow-x-hidden">
        <Home />

        <SectionProducts
          products={products}
          fotos={fotos}
          loading={loadingProducts}
        />

        <SectionProviders
          providers={providers}
          logos={logos}
          loading={loadingProviders}
        />

        <SectionAbout />
        <SectionContact />
      </div>
    </MainLayout>
  );
}
