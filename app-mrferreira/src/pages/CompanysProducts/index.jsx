import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import Contact from "../Main/components/Contact";
import { Link } from "react-router-dom";

export default function CompanysProducts() {
  const whatsappMessage = `Olá, tudo bem? Quero saber mais sobre a empresa!`;

  const { companyId } = useParams();

  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/companys/${companyId}/products`
        );
        console.log(response.data);
        setProducts(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar produtos: ", err);
        alert("Erro no servidor: " + err.response.data.message);
      }
    };

    fecthProducts();
  }, [companyId]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/companys");
        setCompanies(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar empresas: ", err);
      }
    };

    fetchCompany();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.name.toLowerCase();
    const productDescriptionLower = product.description.toLowerCase();
    const searchTerms = searchTerm
      .split(" ")
      .map((term) => term.trim().toLowerCase());

    return searchTerms.every(
      (term) =>
        productNameLower.includes(term) ||
        productDescriptionLower.includes(term)
    );
  });

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="companys-products">
      <header className="header">
        <Header />
      </header>

      <section className="products-container">
        {/*<div className="heading">the <span>empresa1</span></div>*/}

        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="search"
            name="search"
            className="input-search"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="box-container">
          {filteredProducts.map((product) => (
            <div className="box" key={product.id}>
              {product.photo && (
                <img src={`http://127.0.0.1:8000/storage/${product.photo}`} />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="company-name">
                {
                  companies.find((company) => company.id === product.id_company)
                    ?.name
                }
              </p>
              <button className="btn" onClick={() => openModal(product)}>
                detalhes
              </button>
            </div>
          ))}
        </div>

        <Modal
          product={selectedProduct}
          companyName={
            selectedProduct
              ? companies.find(
                  (company) => company.id === selectedProduct.id_company
                )?.name
              : ""
          }
          onClose={closeModal}
        />
      </section>

      <div className="icon-whats anim">
        <Link
          to={`https://api.whatsapp.com/send?phone=5514991896619&text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </Link>
      </div>
    </div>
  );
}
