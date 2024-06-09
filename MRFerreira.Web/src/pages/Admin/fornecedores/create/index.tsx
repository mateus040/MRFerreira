import AdminLayout from "../../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";

export default function AdicionarFornecedores() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/fornecedores",
      name: "Fornecedores",
    },
    {
      link: "/admin/fornecedores/adicionar",
      name: "Adicionar fornecedores",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="nome"
              placeholder="Informe o nome do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              placeholder="Informe o CNPJ"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="Informe o CPF"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Rua</label>
            <input
              type="text"
              id="rua"
              placeholder="Informe o nome da rua"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <label className="block mb-2 font-medium">Bairro</label>
            <input
              type="text"
              id="bairro"
              placeholder="Informe o bairro"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Nº</label>
            <input
              type="text"
              id="numero"
              placeholder="Nº"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Cidade</label>
            <input
              type="text"
              id="cidade"
              placeholder="Informe a cidade"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Estado</label>
            <input
              type="text"
              id="estado"
              placeholder="UF"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Informe o e-mail do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Telefone</label>
            <input
              type="text"
              id="telefone"
              placeholder="Informe o telefone"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <input
              type="text"
              id="celular"
              placeholder="Informe o celular"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo</label>
            <input
              type="text"
              id="logo"
              placeholder="Informe a logo do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
