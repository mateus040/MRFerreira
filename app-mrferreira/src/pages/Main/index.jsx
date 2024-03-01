import React from "react";
import "./style.css";
import Home from "./components/Home";
import Features from "./components/Features";
import Products from "./components/Products";
import Categories from "./components/Categories";
import About from "./components/About";
import Brands from "./components/Brands";
import Contact from "./components/Contact";
import ViewCompanys from "./components/Companys";
import Sobre from "./components/Sobre";
import MainLayout from "../../components/Layout/Main";
import { Link } from "react-router-dom";

const Main = () => {

  const whatsappMessage = `Olá, tudo bem? Quero saber mais sobre a empresa!`;

  return (
    <div className="app">
      <div className="components">
        <MainLayout>
          <section className="home">
            <Home />
          </section>

          <section className="sobre">
            <Sobre />
          </section>

          <section className="products">
            <Products />
          </section>

          
          <section className="review">
            <ViewCompanys />
          </section>

          {/*<section className="features">
            <Features />
          </section>

          <section className="categories">
            <Categories />
  </section>*/}

          <section className="about">
            <About />
          </section>

          <section className="contact">
            <Contact />
          </section>

          {/*<section className="brands">
            <Brands />
  </section>*/}
        </MainLayout>
      </div>

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
};

export default Main;
