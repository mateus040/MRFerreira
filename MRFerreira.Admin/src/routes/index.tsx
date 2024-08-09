import { AuthProvider, useAuth } from "../context/auth-context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Providers from "../pages/providers";
import Products from "../pages/products";
import CreateProduct from "../pages/products/create";
import EditProduct from "../pages/products/edit";
import CreateProvider from "../pages/providers/create";
import EditProvider from "../pages/providers/edit";
import Categories from "../pages/categories";
import EditCategory from "../pages/categories/edit";
import NotFound from "../pages/not-found";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute element={<Home />} />} />

          {/* Rotas fornecedor */}
          <Route
            path="/fornecedores"
            element={<PrivateRoute element={<Providers />} />}
          />

          <Route
            path="/fornecedores/adicionar"
            element={<PrivateRoute element={<CreateProvider />} />}
          />

          <Route
            path="/fornecedores/editar/:providerId"
            element={<PrivateRoute element={<EditProvider />} />}
          />

          {/* Rotas produto */}
          <Route
            path="/produtos"
            element={<PrivateRoute element={<Products />} />}
          />

          <Route
            path="/produtos/adicionar"
            element={<PrivateRoute element={<CreateProduct />} />}
          />

          <Route
            path="/produtos/editar/:productId"
            element={<PrivateRoute element={<EditProduct />} />}
          />

          {/* Rotas categoria */}
          <Route
            path="/categorias"
            element={<PrivateRoute element={<Categories />} />}
          />

          <Route
            path="/categorias/editar/:categoryId"
            element={<PrivateRoute element={<EditCategory />} />}
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
