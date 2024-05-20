import MainLayout from "../../components/Layouts/main";
import Contato from "./components/contato";
import Empresas from "./components/empresas";
import Footer from "./components/footer";
import Home from "./components/home";
import Produtos from "./components/produtos";
import Sobre from "./components/sobre";

export default function Main() {
  return (
    <MainLayout>
      <div className="w-full overflow-x-hidden">
        <Home />
        <Produtos />
        <Empresas />
        <Sobre />
        <Contato />
        <Footer />
      </div>
    </MainLayout>
  );
}
