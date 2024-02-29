import React from "react";
import "./style.css";

const Footer = () => {
    return (
        <footer className="footer anim" id="footer">
            <div className="box-container">
                <div className="box">
                    <img src="/images/logos/logo.jpeg" className="img-footer"></img>
                    <p>Lorem ipsum dolor sit amet, adipiscing elit. Labore, aspernatur!</p>
                    <div className="share">
                        <a href="" className="fab fa-facebook-f"></a>
                        <a href="" className="fab fa-twitter"></a>
                        <a href="" className="fab fa-instagram"></a>
                        <a href="" className="fab fa-linkedin"></a>
                    </div>
                </div>

                <div className="box">
                    <h3>Contato</h3>
                    <a href="" className="links"><i className="fas fa-phone"></i> +123-456-7890</a>
                    <a href="" className="links"><i className="fas fa-phone"></i> +111-222-3333</a>
                    <a href="" className="links"><i className="fas fa-envelope"></i> shaikhanas@gmail.com</a>
                    <a href="" className="links"><i className="fas fa-map-marker-alt"></i> Jaú, SP</a>
                </div>

                <div className="box">
                    <h3>Links</h3>
                    <a href="#home" className="links"><i className="fas fa-arrow-right"></i> Início</a>
                    <a href="#products" className="links"><i className="fas fa-arrow-right"></i> Produtos</a>
                    <a href="#features" className="links"><i className="fas fa-arrow-right"></i> Features</a>
                    <a href="#company" className="links"><i className="fas fa-arrow-right"></i> Empresas</a>
                    <a href="#about" className="links"><i className="fas fa-arrow-right"></i> Sobre</a>
                    <a href="#contact" className="links"><i className="fas fa-arrow-right"></i> Contato</a>
                </div>

                <div className="box">
                    <h3>newsletter</h3>
                    <p>subscribe for latest updates</p>
                    <input type="email" placeholder="Your Email" className="email" />
                    <input type="submit" value="subscribe" className="btn" />
                </div>
            </div>

            <div className="credit"> Por <span> &copy;MR Ferreira Representações </span> | Todos os direitos reservados. </div>
        </footer>
    )
}

export default Footer;