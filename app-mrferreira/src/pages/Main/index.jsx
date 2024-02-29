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

const Main = () => {
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

          <section className="features">
            <Features />
          </section>

          <section className="categories">
            <Categories />
          </section>

          <section className="about">
            <About />
          </section>

          <section className="review">
            <ViewCompanys />
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
        <a
          href="https://api.whatsapp.com/send?phone=5514991896619"
          target="_blank"
        >
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
};

export default Main;
