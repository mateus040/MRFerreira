import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Inputmask from "react-input-mask";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const EditProvider = () => {
  const { token } = useAuth();

  const { companyId } = useParams();
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/companys/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyData(response.data.companys); // companys vindo da função show da API
      } catch (err) {
        console.error("Erro ao buscar dados do fornecedor:", err);
        alert("Erro no servidor: " + err.response.data.message);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const changeCompanysFieldHandler = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    setCompanyData({
      ...companyData,
      logo: e.target.files[0],
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", companyData.name);
      formData.append("cnpj", companyData.cnpj);
      formData.append("road", companyData.road);
      formData.append("neighborhood", companyData.neighborhood);
      formData.append("number", companyData.number);
      formData.append("cep", companyData.cep);
      formData.append("city", companyData.city);
      formData.append("state", companyData.state);
      formData.append("complement", companyData.complement);
      formData.append("email", companyData.email);
      formData.append("phone", companyData.phone);
      formData.append("cellphone", companyData.cellphone);
      formData.append("logo", companyData.logo);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/companys/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Dados atualizados com sucesso!", {
        theme: "colored",
        style: {
          fontSize: "1.6rem",
        },
      });
      navigate("/fornecedores");
    } catch (err) {
      console.error("Erro ao enviar solicitação: ", err);
      alert("Erro no servidor: " + err.response.data.message);
    }
  };

  return (
    <div className="edit-provider">
      <Sidebar />

      <div className="content-provider">
        <main>
          <section className="content">
            <div>
              <div className="content-header">
                <h1 className="title">Editar empresas</h1>
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
                  <div className="column-2">
                    <label htmlFor="name">Nome*</label>
                    <input
                      type="text"
                      className="input-form"
                      placeholder="Digite o nome da empresa"
                      id="name"
                      name="name"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.name ? companyData.name : ""
                      }
                      required
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="cnpj">CNPJ*</label>
                    <Inputmask
                      mask="99.999.999/9999-99"
                      placeholder="__.___.___/____-__"
                      id="cnpj"
                      name="cnpj"
                      className="input-form"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.cnpj ? companyData.cnpj : ""
                      }
                      required
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="cep">CEP*</label>
                    <Inputmask
                      mask="99999-999"
                      placeholder="_____-___"
                      id="cep"
                      name="cep"
                      className="input-form"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.cep ? companyData.cep : ""
                      }
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
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.road ? companyData.road : ""
                      }
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
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.neighborhood
                          ? companyData.neighborhood
                          : ""
                      }
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
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.number
                          ? companyData.number
                          : ""
                      }
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
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.city ? companyData.city : ""
                      }
                      required
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="estado">Estado*</label>
                    <input
                      type="text"
                      className="input-form"
                      placeholder="Digite o estado"
                      id="state"
                      name="state"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.state
                          ? companyData.state
                          : ""
                      }
                      required
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      type="text"
                      className="input-form"
                      placeholder="Digite o complemento"
                      id="complement"
                      name="complement"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.complement
                          ? companyData.road
                          : ""
                      }
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="logo">Logo*</label>
                    <input
                      type="file"
                      className="input-form"
                      id="logo"
                      name="logo"
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
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.email
                          ? companyData.email
                          : ""
                      }
                      required
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="telefone">Telefone</label>
                    <Inputmask
                      mask="(99) 9999-9999"
                      placeholder="(__) ____-____"
                      id="phone"
                      name="phone"
                      className="input-form"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.phone
                          ? companyData.phone
                          : ""
                      }
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="celular">Celular</label>
                    <Inputmask
                      mask="(99) 99999-9999"
                      placeholder="(__) _____-____"
                      id="cellphone"
                      name="cellphone"
                      className="input-form"
                      onChange={(e) => changeCompanysFieldHandler(e)}
                      value={
                        companyData && companyData.cellphone
                          ? companyData.cellphone
                          : ""
                      }
                    />
                  </div>

                  <button
                    className="btn"
                    type="submit"
                    onClick={(e) => onSubmitChange(e)}
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EditProvider;
