import { useEffect, useState } from "react";
import ProdutoModel from "../../interface/models/ProdutoModel";
import FornecedorModel from "../../interface/models/FornecedorModel";
import axios from "axios";
import { Home } from "./components/home";
import { SectionProducts } from "./components/products";
import { SectionProviders } from "./components/providers";
import { SectionAbout } from "./components/about";
import { SectionContact } from "./components/contact";
import MainLayout from "../../components/layouts/main";
import { useSearchParams } from "react-router-dom";

export default function Main() {
  const [searchParams, _] = useSearchParams();
  const section = searchParams.get("section");

  // const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  // const [loadingProviders, setLoadingProviders] = useState<boolean>(false);

  const [products, setProducts] = useState<ProdutoModel[]>([]);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});
  const [fotos, setFotos] = useState<{ [key: string]: string }>({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/products"
      );
      const productsData: ProdutoModel[] = response.data.results;

      setProducts(productsData);

      // Gerar o objeto logosTemp a partir dos dados dos produtos
      const logosTemp: { [key: string]: string } = {};
      productsData.forEach((product) => {
        if (product.foto_url) {
          logosTemp[product.foto] = product.foto_url;
        }
      });

      setFotos(logosTemp);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const fetchProviders = async () => {
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
    }
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
          // loadingProducts={loadingProducts}
        />

        <SectionProviders
          providers={providers}
          logos={logos}
          //loading={loadingProviders}
        />

        <SectionAbout />
        <SectionContact />
      </div>
    </MainLayout>
  );
}
