import React, { useState } from "react";
import "./style.css";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function sendEmail(e) {
        e.preventDefault();

        if (name === '' || email === '' || message === '') {
            toast.error("Preencha todos os campos!", {
                theme: 'colored',
                style: {
                    fontSize: '1.6rem',
                },
            });
            return;
        }

        const templateParams = {
            from_name: name,
            email: email,
            message: message
        }

        emailjs.send("service_1abjk2t", "template_62jt1f9", templateParams, "T8MWfJ1-F8f4_UT5r")
        .then((response) => {
            console.log("Email enviado!", response.status, response.text);
            toast.success("Email enviado com sucesso!", {
                theme: 'colored',
                style: {
                    fontSize: '1.6rem',
                },
            });

            setName('')
            setEmail('')
            setMessage('')
        }, (err) => {
            console.log("Erro: ", err);
            toast.error("Ocorreu um erro ao enviar o email!", {
                theme: 'colored',
                style: {
                    fontSize: '1.6rem',
                },
            });
        })
    }

    return (
        <div className="contact anim" id="contact">
            <h1 className="heading">Envie um <span>email</span></h1>
            <div className="content-container">
                <div className="box-container">
                    <div className="box">
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="text">
                            <h3>Endereço</h3>
                            <p>Jaú - São Paulo</p>
                            <p>17209838</p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        <div className="text">
                            <h3>Telefone</h3>
                            <p>+123 345 6789</p>
                            <p>+111 222 333</p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="text">
                            <h3>E-mail</h3>
                            <p>mr.ferreira@mrferreira.com</p>
                            <p>example@gmail.com</p>
                        </div>
                    </div>
                </div>

                <form className="form" onSubmit={sendEmail}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome"
                        className="input"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <textarea 
                        name="message" 
                        className="input" 
                        placeholder="Envie uma mensagem"
                        rows="10"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />

                    <input type="submit" value="Enviar mensagem" className="btn" />
                </form>

            </div>
        </div>
    )
}

export default Contact;