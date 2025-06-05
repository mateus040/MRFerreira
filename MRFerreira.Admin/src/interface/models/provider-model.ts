export default interface ProviderModel {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  cellphone: string;
  logo: string;
  logo_url: string;
  address: Address;
}

interface Address {
  street: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  state: string;
  city: string;
  complement: string | null;
}
