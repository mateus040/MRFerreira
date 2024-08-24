import { useEffect, useState } from "react";
import ProdutoModel from "../../interface/models/ProdutoModel";
import FornecedorModel from "../../interface/models/FornecedorModel";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../components/firebase/firebaseConfig";
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
    // setLoadingProducts(true);

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products"
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

      setFotos(logosTemp);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      // setLoadingProducts(false);
    }
  };

  const fetchProviders = async () => {
    // setLoadingProviders(true);

    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/providers"
      );
      const providersData: FornecedorModel[] = response.data.results;

      setProviders(providersData);

      // Get all unique logo paths
      const logoPaths = providersData
        .map((provider) => provider.logo)
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
      console.error("Erro ao buscar fornecedores:", err);
    } finally {
      // setLoadingProviders(false);
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
