import MainLayout from "../../components/Layouts/main";
import Empresas from "./components/empresas";
import Home from "./components/home";
import Produtos from "./components/produtos";

export default function Main() {
  return (
    <MainLayout>
      <div>
        <Home />
        <Produtos />
        <Empresas />
      </div>
    </MainLayout>
  );
}
