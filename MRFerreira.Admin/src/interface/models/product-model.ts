import CategoryModel from "./category-model";
import ProviderModel from "./provider-model";

export default interface ProductModel {
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
  provider: ProviderModel;
  category: CategoryModel;
  foto_url: string;
}
