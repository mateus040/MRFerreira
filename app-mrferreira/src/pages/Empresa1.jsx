import React, { useEffect, useState } from "react";
import 'swiper/css';
import "../styles/empresa1.css";
import Header from "../components/Header";
import axios from "axios";

const Empresa1 = () => {

    const [products, setProducts] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsResponse = await axios.get("http://127.0.0.1:8000/api/products");
                setProducts(productsResponse.data.results);

                const companiesResponse = await axios.get("http://127.0.0.1:8000/api/companys");
                setCompanies(companiesResponse.data.results);
            } catch (err) {
                console.error("Erro ao buscar produtos: ", err);
                alert("Erro no servidor: " + err.response.data.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="empresa1">
            <header className="header">
                <Header />
            </header>

            <section className="empresa-home">
                <div className="heading">the <span>empresa1</span></div>

                <div className="box-container">
                    {products.map((product) => (
                        <div className="box" key={product.id}>
                            {product.photo && (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${product.photo}`}
                                />
                            )}
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <a href="" className="btn">read more</a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Empresa1;