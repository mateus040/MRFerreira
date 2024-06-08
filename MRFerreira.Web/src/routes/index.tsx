import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Admin from "../pages/Admin";
import Fornecedores from "../pages/Admin/fornecedores";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Main />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/fornecedores" element={<Fornecedores />} />
      </Routes>
    </Router>
  );
}
