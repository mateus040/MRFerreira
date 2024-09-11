import { AuthProvider } from "../context/auth-context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import PrivateRoute from "./private-routes";

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Rotas empresas parceiras */}
          <Route
            path="/empresas"
            element={
              <PrivateRoute>
                <Providers />
              </PrivateRoute>
            }
          />

          <Route
            path="/empresas/adicionar"
            element={
              <PrivateRoute>
                <CreateProvider />
              </PrivateRoute>
            }
          />

          <Route
            path="/empresas/editar/:providerId"
            element={
              <PrivateRoute>
                <EditProvider />
              </PrivateRoute>
            }
          />

          {/* Rotas produto */}
          <Route
            path="/produtos"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos/adicionar"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos/editar/:productId"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />

          {/* Rotas categoria */}
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />

          <Route
            path="/categorias/editar/:categoryId"
            element={
              <PrivateRoute>
                <EditCategory />
              </PrivateRoute>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
