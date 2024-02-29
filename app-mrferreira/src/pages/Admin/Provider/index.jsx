import React, { useState, useEffect } from "react";
import Inputmask from "react-input-mask";
import "./style.css";
import Sidebar from "../../../components/Sidebar";
import TableProvider from "../components/TableProvider";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";

const PageProvider = () => {

    useEffect(() => {
        document.title = 'Empresas - Admin'
    })

    const { token } = useAuth();

    const navigate = useNavigate();

    const navigateToEditPage = (company) => {
        navigate(`/fornecedores/update/${company.id}`);
    };

    const [companys, setCompanys] = useState([]);

    const { setValue } = useForm();

    const [companyField, setCompanyField] = useState({
        name: "", cnpj: "", road: "", neighborhood: "", number: "", cep: "",
        city: "", state: "", complement: "", email: "", phone: "", cellphone: "", logo: ""
    });

    const changeCompanysFieldHandler = (e) => {
        setCompanyField({
            ...companyField,
            [e.target.name]: e.target.value
        });
    }

    const handleLogoChange = (e) => {
        setCompanyField({
            ...companyField,
            logo: e.target.files[0],
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", companyField.name);
            formData.append("cnpj", companyField.cnpj);
            formData.append("road", companyField.road);
            formData.append("neighborhood", companyField.neighborhood);
            formData.append("number", companyField.number);
            formData.append("cep", companyField.cep);
            formData.append("city", companyField.city);
            formData.append("state", companyField.state);
            formData.append("complement", companyField.complement);
            formData.append("email", companyField.email);
            formData.append("phone", companyField.phone);
            formData.append("cellphone", companyField.cellphone);
            formData.append("logo", companyField.logo);

            const response = await axios.post("http://127.0.0.1:8000/api/companys/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response);
            toast.success("Dados registrados com sucesso!", {
                theme: 'colored',
                style: {
                    fontSize: '1.6rem',
                },
            });
        } catch (err) {
            toast.error("Erro ao enviar solicitação: " + err.response.data.message, {
                theme: "colored",
                style: {
                    fontSize: '1.6rem',
                },
            });
            console.error("Erro ao enviar solicitação: ", err)
            console.error("Erro ao cadastrar o produto: " + err.response.data.message);
            //alert("Erro no servidor: " + err.response.data.message);
        }
    }

    const onDeleteCompany = async (companyId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/companys/delete/${companyId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const updatedCompanys = companys.filter(company => company.id !== companyId);
            setCompanys(updatedCompanys);

            toast.success("Fornecedor deletado com sucesso!", {
                theme: "colored",
                style: {
                    fontSize: '1.6rem',
                },
            });
        } catch (err) {
            toast.error("Erro ao deletar o fornecedor: " + err.response.data.message, {
                theme: "colored",
                style: {
                    fontSize: '1.6rem',
                },
            });
            console.error("Erro ao enviar solicitação: ", err)
            console.error("Erro ao deletar o fornecedor: " + err.response.data.message);
            //alert("Erro no servidor: " + err.response.data.message);
        }
    };

    useEffect(() => {
        setValue('road', companyField.road || '');
        setValue('neighborhood', companyField.neighborhood || '');
        setValue('city', companyField.city || '');
        setValue('state', companyField.state || '');
    }, [companyField]);

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCompanyField({
                    ...companyField,
                    road: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                });
            })
            .catch(error => {
                console.error("Erro ao obter informações do CEP:", error);
            });
    }

    return (
        <div className="page-provider">

            <Sidebar />

            <div className="content-provider">
                <main>
                    <section className="content">
                        <div>
                            <div className="content-header">
                                <h1 className="title">Empresas</h1>
                                <ul className="breadcrumbs">
                                    <li>
                                        <a href="">Novo</a>
                                    </li>
                                    <li className="divider">/</li>
                                    <li>
                                        <a href="#" className="active">
                                            Cadastrados
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <article className="content-article">
                            <form>
                                <div className="content-form">
                                    <div className="column-2">
                                        <label htmlFor="name">Nome*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite o nome da empresa"
                                            id="name"
                                            name="name"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="cnpj">CNPJ*</label>
                                        <Inputmask
                                            mask="99.999.999/9999-99"
                                            placeholder="__.___.___/____-__"
                                            id="cnpj" name="cnpj"
                                            className="input-form"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="cep">CEP*</label>
                                        <Inputmask
                                            mask="99999-999"
                                            placeholder="_____-___"
                                            id="cep" name="cep"
                                            className="input-form"
                                            value={companyField.cep}
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            onBlur={checkCEP}
                                            required
                                        />
                                    </div>

                                    <div className="column-2">
                                        <label htmlFor="rua">Rua*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite o nome da rua"
                                            id="road"
                                            name="road"
                                            value={companyField.road}
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="bairro">Bairro*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite o nome do bairro"
                                            id="neighborhood"
                                            name="neighborhood"
                                            value={companyField.neighborhood}
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="numero">Nº*</label>
                                        <input
                                            type="number"
                                            className="input-form"
                                            placeholder="Digite o número"
                                            id="number"
                                            name="number"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="cidade">Cidade*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite a cidade"
                                            id="city"
                                            name="city"
                                            value={companyField.city}
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="estado">Estado*</label>
                                        <select
                                            className="input-form"
                                            id="state" name="state"
                                            value={companyField.state}
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        >
                                            <option value="" disabled selected>Selecione um estado</option>
                                            <option value="AC">AC</option>
                                            <option value="AL">AL</option>
                                            <option value="AP">AP</option>
                                            <option value="AM">AM</option>
                                            <option value="BA">BA</option>
                                            <option value="CE">CE</option>
                                            <option value="DF">DF</option>
                                            <option value="ES">ES</option>
                                            <option value="GO">GO</option>
                                            <option value="MA">MA</option>
                                            <option value="MT">MT</option>
                                            <option value="MS">MS</option>
                                            <option value="MG">MG</option>
                                            <option value="PA">PA</option>
                                            <option value="PB">PB</option>
                                            <option value="PR">PR</option>
                                            <option value="PE">PE</option>
                                            <option value="PI">PI</option>
                                            <option value="RJ">RJ</option>
                                            <option value="RN">RN</option>
                                            <option value="RS">RS</option>
                                            <option value="RO">RO</option>
                                            <option value="RR">RR</option>
                                            <option value="SC">SC</option>
                                            <option value="SP">SP</option>
                                            <option value="SE">SE</option>
                                            <option value="TO">TO</option>
                                        </select>
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="complemento">Complemento</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite o complemento"
                                            id="complement"
                                            name="complement"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="logo">Logo*</label>
                                        <input
                                            type="file"
                                            className="input-form"
                                            id="logo" name="logo"
                                            accept="image/*"
                                            onChange={(e) => handleLogoChange(e)}

                                        />
                                    </div>

                                    <div className="column-2">
                                        <label htmlFor="email">Email*</label>
                                        <input
                                            type="email"
                                            className="input-form"
                                            placeholder="Digite o email"
                                            id="email"
                                            name="email"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="telefone">Telefone</label>
                                        <Inputmask
                                            mask="(99) 9999-9999"
                                            placeholder="(__) ____-____"
                                            id="phone" name="phone"
                                            className="input-form"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="celular">Celular</label>
                                        <Inputmask
                                            mask="(99) 99999-9999"
                                            placeholder="(__) _____-____"
                                            id="cellphone" name="cellphone"
                                            className="input-form"
                                            onChange={e => changeCompanysFieldHandler(e)}
                                        />
                                    </div>

                                    <button className="btn" type="submit" onClick={e => onSubmitChange(e)}>Enviar</button>
                                </div>
                            </form>

                            <div className="content-table">
                                <TableProvider navigateToEditPage={navigateToEditPage} onDeleteCompany={onDeleteCompany} />
                            </div>
                        </article>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default PageProvider;