import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "../../../components/Sidebar";
import TableProducts from "../components/TableProducts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const Products = () => {
  useEffect(() => {
    document.title = "Produtos - Admin";
  });

  const { token } = useAuth();

  const navigate = useNavigate();

  const navigateToEditProduct = (product) => {
    navigate(`/produtos/update/${product.id}`);
  };

  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);

  const [productsField, setProductsField] = useState({
    name: "",
    description: "",
    length: "",
    height: "",
    depth: "",
    weight: "",
    photo: "",
    id_company: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/companys", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data.results);
      } catch (err) {
        console.error("Erro ao obter empresas: ", err);
      }
    };

    fetchCompanies();
  }, []);

  const changeProductsFieldHandler = (e) => {
    setProductsField({
      ...productsField,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    setProductsField({
      ...productsField,
      photo: e.target.files[0], // Armazenando o a foto
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productsField.name);
      formData.append("description", productsField.description);
      formData.append("length", productsField.length);
      formData.append("height", productsField.height);
      formData.append("depth", productsField.depth);
      formData.append("weight", productsField.weight);
      formData.append("photo", productsField.photo);
      formData.append("id_company", productsField.id_company);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Dados registrados com sucesso!", {
        theme: "colored",
        style: {
          fontSize: "1.6rem",
        },
      });
    } catch (err) {
      toast.error("Erro ao enviar solicitação: " + err.response.data.message, {
        theme: "colored",
        style: {
          fontSize: "1.6rem",
        },
      });
      console.error("Erro ao enviar solicitação: ", err);
      console.error(
        "Erro ao cadastrar o produto: " + err.response.data.message
      );
      //alert("Erro no servidor: " + err.response.data.message);
    }
  };

  const onDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/products/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);

      toast.success("Forncedor deletado com sucesso!", {
        theme: "colored",
        style: {
          fontSize: "1.6rem",
        },
      });
    } catch (err) {
      toast.error("Erro ao deletar o produto: " + err.response.data.message, {
        theme: "colored",
        style: {
          fontSize: "1.6rem",
        },
      });
      console.error("Erro ao enviar solicitação: ", err);
      console.error("Erro ao deletar o produto: " + err.response.data.message);
      //alert("Erro no servidor: " + err.response.data.message);
    }
  };

  return (
    <div className="products">
      <Sidebar />

      <div className="content-products">
        <main>
          <section className="content">
            <div>
              <div className="content-header">
                <h1 className="title">Produtos</h1>
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
                  <div className="column-3">
                    <label htmlFor="name">Nome*</label>
                    <input
                      type="text"
                      className="input-form"
                      placeholder="Digite o nome do produto"
                      id="name"
                      name="name"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="empresa">Empresa*</label>
                    <select
                      className="input-form"
                      id="id_company"
                      name="id_company"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    >
                      <option value="" disabled selected>
                        Selecione a empresa
                      </option>
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
                      id="length"
                      name="length"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="altura">Altura*</label>
                    <input
                      type="number"
                      className="input-form"
                      placeholder="Digite a altura"
                      id="height"
                      name="height"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="profundidade">Profundidade*</label>
                    <input
                      type="number"
                      className="input-form"
                      placeholder="Digite a profundidade"
                      id="depth"
                      name="depth"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="peso">Peso Sup.*</label>
                    <input
                      type="number"
                      className="input-form"
                      placeholder="Digite o peso"
                      id="weight"
                      name="weight"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-3">
                    <label htmlFor="descricao">Descrição*</label>
                    <input
                      type="text"
                      className="input-form"
                      placeholder="Digite a descrição"
                      id="description"
                      name="description"
                      onChange={(e) => changeProductsFieldHandler(e)}
                    />
                  </div>

                  <div className="column-1">
                    <label htmlFor="photo">Foto*</label>
                    <input
                      type="file"
                      className="input-form"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(e)}
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

              <div className="content-table">
                <TableProducts
                  navigateToEditProduct={navigateToEditProduct}
                  onDeleteProduct={onDeleteProduct}
                />
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;
