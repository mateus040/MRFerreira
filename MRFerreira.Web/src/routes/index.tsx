import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Admin from "../pages/Admin";
import Fornecedores from "../pages/Admin/fornecedores";
import AdicionarFornecedores from "../pages/Admin/fornecedores/create";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Main />} />

        {/* Private Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/fornecedores" element={<Fornecedores />} />
        <Route
          path="/admin/fornecedores/adicionar"
          element={<AdicionarFornecedores />}
        />
      </Routes>
    </Router>
  );
}
