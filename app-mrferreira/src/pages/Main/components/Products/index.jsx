import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style.css";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const productsResponse = await axios.get(
          "http://127.0.0.1:8000/api/products"
        );
        setProducts(productsResponse.data.results);

        const companiesResponse = await axios.get(
          "http://127.0.0.1:8000/api/companys"
        );
        setCompanies(companiesResponse.data.results);
      } catch (err) {
        console.error("Erro ao buscar dados: ", err);
        alert("Erro no servidor: " + err.response.data.message);
      }
    };

    fecthProducts();
  }, []);

  return (
    <div className="products anim" id="products">
      <div className="text-page">
        <h1 className="heading">Conheça algum de nossos produtos</h1>
        <p>Fique por dentro das últimas novidades</p>
      </div>

      <Swiper
        className="product-slider"
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 7500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1020: { slidesPerView: 3 },
        }}
        initialSlide={0}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-slider box">
              {product.photo && (
                <img src={`http://127.0.0.1:8000/storage/${product.photo}`} />
              )}
              <h3>{product.name}</h3>
              <p>{companies.find((company) => company.id === product.id_company)?.name}</p>
              <a href="" className="btn">
                Detalhes
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;
