import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useAuth } from "../../../context/AuthContext";

const EditProduct = () => {

    const { token } = useAuth();

    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState(null);

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fecthProductData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setProductData(response.data.products);
            } catch (err) {
                console.error("Erro ao buscar dados do produto: ", err);
                alert("Erro no servidor: " + err.response.data.message);
            }
        };

        fecthProductData();
    }, [productId]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/companys", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setCompanies(response.data.results);
            } catch (err) {
                console.error("Erro ao obter empresas: ", err);
            }
        };

        fetchCompanies();
    }, []);

    const changeProductsFieldHandler = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }

    const handlePhotoChange = (e) => {
        setProductData({
            ...productData,
            photo: e.target.files[0],
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append("name", productData.name);
            formData.append("description", productData.description);
            formData.append("length", productData.length);
            formData.append("height", productData.height);
            formData.append("depth", productData.depth);
            formData.append("weight", productData.weight);
            formData.append("photo", productData.photo);
            formData.append("id_company", productData.id_company);

            const response = await axios.post(`http://127.0.0.1:8000/api/products/update/${productId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log(response);
            alert("Dados atualizados com sucesso!");
            navigate('/produtos');
        } catch (err) {
            console.error("Erro ao enviar solicitação: ", err);
            alert("Erro no servidor: " + err.response.data.message);
        }
    }

    return (
        <div className="edit-product">
            <Sidebar />

            <div className="content-products">
                <main>
                    <section className="content">
                        <div>
                            <div className="content-header">
                                <h1 className="title">Editar produtos</h1>
                                <ul className="breadcrumbs">
                                    <li>
                                        <a href="">Cadastrados</a>
                                    </li>
                                    <li className="divider">/</li>
                                    <li>
                                        <a href="#" className="active">
                                            Editar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <article className="content-article">
                            <form>
                                <div className="content-form">
                                    <div className="column-3">
                                        <label htmlFor="name">Nome*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite o nome do produto"
                                            id="name" name="name"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.name ? productData.name : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="empresa">Empresa*</label>
                                        <select
                                            className="input-form"
                                            id="id_company" name="id_company"
                                            onChange={(e) => changeProductsFieldHandler(e)}
                                            value={productData && productData.id_company ? productData.id_company : ''}
                                            required
                                        >
                                            <option value="">Selecione a empresa</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="comprimento">Comprimento*</label>
                                        <input
                                            type="number"
                                            className="input-form"
                                            placeholder="Digite o comprimento"
                                            id="length" name="length"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.length ? productData.length : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="altura">Altura*</label>
                                        <input
                                            type="number"
                                            className="input-form"
                                            placeholder="Digite a altura"
                                            id="height" name="height"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.height ? productData.height : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="profundidade">Profundidade*</label>
                                        <input
                                            type="number"
                                            className="input-form"
                                            placeholder="Digite a profundidade"
                                            id="depth" name="depth"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.depth ? productData.depth : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="peso">Peso Sup.*</label>
                                        <input
                                            type="number"
                                            className="input-form"
                                            placeholder="Digite o peso"
                                            id="weight" name="weight"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.weight ? productData.weight : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-3">
                                        <label htmlFor="descricao">Descrição*</label>
                                        <input
                                            type="text"
                                            className="input-form"
                                            placeholder="Digite a descrição"
                                            id="description" name="description"
                                            onChange={e => changeProductsFieldHandler(e)}
                                            value={productData && productData.description ? productData.description : ''}
                                            required
                                        />
                                    </div>

                                    <div className="column-1">
                                        <label htmlFor="photo">Foto*</label>
                                        <input
                                            type="file"
                                            className="input-form"
                                            id="photo" name="photo"
                                            accept="image/*"
                                            onChange={(e) => handlePhotoChange(e)}
                                            required
                                        />
                                    </div>

                                    <button className="btn" type="submit" onClick={e => onSubmitChange(e)}>Enviar</button>
                                </div>
                            </form>
                        </article>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default EditProduct;