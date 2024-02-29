import React, { useEffect, useState } from 'react'
import "./style.css";
import axios from 'axios';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import Contact from '../Main/components/Contact';

export default function CompanysProducts() {

  const { companyId } = useParams();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/companys/${companyId}/products`);
        console.log(response.data);
        setProducts(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar produtos: ", err);
        alert("Erro no servidor: " + err.response.data.message);
      }
    };

    fecthProducts();
  }, [companyId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.name.toLowerCase();
    const searchTerms = searchTerm.split(" ").map(term => term.trim().toLowerCase());

    return searchTerms.every(term => productNameLower.includes(term));
  });

  const openModal = (product) => {
    setSelectedProduct(product);
  }

  const closeModal = () => {
    setSelectedProduct(null);
  }

  return (
    <div className='companys-products'>
      <header className="header">
        <Header />
      </header>

      <section className="products-container">
        {/*<div className="heading">the <span>empresa1</span></div>*/}

        <div className="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type='text'
            id='search'
            name='search'
            className='input-search'
            placeholder='Pesquisar produto...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="box-container">
          {filteredProducts.map((product) => (
            <div className="box" key={product.id}>
              {product.photo && (
                <img
                  src={`http://127.0.0.1:8000/storage/${product.photo}`}
                />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button className="btn" onClick={() => openModal(product)}>detalhes</button>
            </div>
          ))}
        </div>

        <Modal product={selectedProduct} onClose={closeModal} />
      </section>
    </div>
  )
}
