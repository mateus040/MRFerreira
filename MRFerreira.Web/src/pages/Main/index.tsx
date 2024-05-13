import MainLayout from "../../components/Layouts/main";
import Contato from "./components/contato";
import Empresas from "./components/empresas";
import Home from "./components/home";
import Produtos from "./components/produtos";
import Sobre from "./components/sobre";

export default function Main() {
  return (
    <MainLayout>
      <div>
        <Home />
        <Produtos />
        <Empresas />
        <Sobre />
        <Contato />
      </div>
    </MainLayout>
  );
}
