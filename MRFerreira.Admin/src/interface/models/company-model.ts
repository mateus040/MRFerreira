export default interface FornecedorModel {
  id: string;
  nome: string;
  cnpj: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  estado: string;
  cidade: string;
  complemento: string | null;
  email: string;
  telefone: string;
  celular: string;
  logo: string;
}
