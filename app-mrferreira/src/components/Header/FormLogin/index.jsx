import React, { useState } from "react";
import "./style.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token);
                navigate("/home/admin");
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    toast.error("Credenciais inválidas", {
                        theme: 'colored',
                        style: {
                            fontSize: "1.6rem",
                        },
                    });
                } else {
                    toast.error("Erro ao fazer login: " + errorData.error, {
                        theme: 'colored',
                        style: {
                            fontSize: "1.6rem",
                        },
                    });
                }
            }
        } catch (error) {
            toast.error("Erro ao fazer login: " + error.message, {
                theme: 'colored',
                style: {
                    fontSize: "1.6rem",
                },
            });
            console.error("Erro ao fazer login: ", error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h3>Login</h3>
            <input
                type="email"
                placeholder="Informe seu e-mail"
                className="box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Informe sua senha"
                className="box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" placeholder="Entrar" className="btn"></input>
        </form>
    )
}

export default FormLogin;