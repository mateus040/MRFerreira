import MainLayout from "../../components/Layouts/main";
import Home from "./components/home";
import Produtos from "./components/produtos";

export default function Main() {
  return (
    <MainLayout>
      <div>
        <Home />
        <Produtos />
      </div>
    </MainLayout>
  );
}
