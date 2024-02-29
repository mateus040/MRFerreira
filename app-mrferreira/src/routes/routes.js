import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from '../pages/Main';
import PageProvider from '../pages/Admin/Provider';
import HomePrivate from '../pages/Admin/HomePrivate';
import Products from '../pages/Admin/Products';
import EditProvider from '../pages/Admin/Provider/edit';
import EditProduct from '../pages/Admin/Products/edit';
import CompanysProducts from '../pages/CompanysProducts';
import { AuthProvider, useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { token } = useAuth();

    return token ? element : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/empresa/:companyId' element={<CompanysProducts />} />

                    <Route path='/home/admin' element={<PrivateRoute element={<HomePrivate />} />} />
                    <Route path='/produtos' element={<PrivateRoute element={<Products />} />} />
                    <Route path='/produtos/update/:productId' element={<PrivateRoute element={<EditProduct />} />} />
                    <Route path='/fornecedores' element={<PrivateRoute element={<PageProvider />} />} />
                    <Route path='/fornecedores/update/:companyId' element={<PrivateRoute element={<EditProvider />} />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}