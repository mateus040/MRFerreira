import CategoryModel from "./category-model";
import ProviderModel from "./provider-model";

export default interface ProductModel {
  id: string;
  name: string;
  description: string;
  length: number;
  height: number;
  depth: number;
  weight: number;
  line: string;
  materials: string;
  photo: string;
  foto_url: string;
  id_provider: string;
  id_category: string;
  provider: ProviderModel;
  category: CategoryModel;
}
