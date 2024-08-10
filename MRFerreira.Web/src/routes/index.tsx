import { Routes, BrowserRouter, Route } from "react-router-dom";
import Main from "../pages/main";
import ProductsByProvider from "../pages/product-by-provider";
import ProductInfo from "../pages/product-info";
import ProductsByCategory from "../pages/product-by-category";
import NotFound from "../pages/not-found";
import ScrollToTop from "../components/scroll-top";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/fornecedor/:providerId"
          element={<ProductsByProvider />}
        />

        <Route
          path="/fornecedor/:providerId/:productId"
          element={<ProductInfo />}
        />

        <Route path="/categoria/:categoryId" element={<ProductsByCategory />} />

        {/* TODO: implementar rota que tras todos os produtos */}

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
