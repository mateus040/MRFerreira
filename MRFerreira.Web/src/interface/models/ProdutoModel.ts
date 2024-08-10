export default interface ProdutoModel {
  id: string;
  nome: string;
  descricao: string;
  comprimento: number;
  altura: number;
  profundidade: number;
  peso: number;
  linha: string;
  materiais: string;
  foto: string;
  id_provider: string;
  id_category: string;
}
