import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

const TableProvider = ({ navigateToEditPage, onDeleteCompany }) => {

    const { token } = useAuth();

    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        const fetchCompanys = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/companys', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setCompanys(response.data.results);
            } catch (err) {
                console.error('Erro ao buscar fornecedores:', err);
                alert("Erro no servidor: " + err.response.data.message);
            }
        };

        fetchCompanys();
    }, [])

    return (
        <div className="table-provider">
            <div className="table-content">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Rua</th>
                            <th>Bairro</th>
                            <th>Número</th>
                            <th>CEP</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Celular</th>
                            <th>Logo</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {companys.map(company => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.cnpj}</td>
                                <td>{company.road}</td>
                                <td>{company.neighborhood}</td>
                                <td>{company.number}</td>
                                <td>{company.cep}</td>
                                <td>{company.city}</td>
                                <td>{company.state}</td>
                                <td>{company.email}</td>
                                <td>{company.phone}</td>
                                <td>{company.cellphone}</td>
                                <td>
                                    {company.logo && (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${company.logo}`}
                                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                                        />
                                    )}
                                </td>
                                <td className="btn-edit" onClick={() => navigateToEditPage(company)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </td>
                                <td className="btn-delete" onClick={() => onDeleteCompany(company.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableProvider;