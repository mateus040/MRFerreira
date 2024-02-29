import React, { useEffect, useState } from "react";
import "./style.css";
import { useAuth } from "../../context/AuthContext"; 
import axios from "axios";

const Sidebar = () => {

    const { logout, token } = useAuth();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUserInfo(response.data);
            } catch (err) {
                console.error("Erro ao obter informações do usuário: ", err);
            }
        };

        if (token) {
            fetchUserInfo();
        };
    }, [token]);

    const handleLogout = () => {
        logout();
        alert("Deslogado");
    }

    useEffect(() => {
        let btn = document.querySelector("#btn-icon");
        let sidebar = document.querySelector(".sidebar");

        btn.onclick = function () {
            sidebar.classList.toggle("active");
        }
    });

    return (
        <div className="sidebar">
            <div className="logo-content">
                <div className="logo">
                    <img src="/images/logos/logo-transparente.png" className="logo-image"></img>
                    <div className="logo-name">MR Ferreira</div>
                </div>
                <i class="fa-solid fa-bars" id="btn-icon"></i>
            </div>
            <ul className="nav-list">
                <li>
                    <a href="/home/admin">
                        <i class="fa-solid fa-house"></i>
                        <span className="links-name">dashboard</span>
                    </a>
                    <span className="tooltip">dashboard</span>
                </li>

                <li>
                    <a href="/produtos">
                        <i class="fa-solid fa-box"></i>
                        <span className="links-name">produtos</span>
                    </a>
                    <span className="tooltip">produtos</span>
                </li>

                <li>
                    <a href="/fornecedores">
                        <i class="fa-solid fa-truck"></i>
                        <span className="links-name">fornecedores</span>
                    </a>
                    <span className="tooltip">fornecedores</span>
                </li>
            </ul>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-details">
                        <div className="name-job">
                            <div className="name">{userInfo?.name || "Convidado"}</div>
                            <div className="job">Administrador</div>
                        </div>
                    </div>
                    <button onClick={handleLogout}>
                        <i class="fa-solid fa-right-from-bracket" id="log-out"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;