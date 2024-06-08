import AdminLayout from "../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../components/breadCrumb";

export default function Fornecedores() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/fornecedores",
      name: "Fornecedores",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Nome
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Descrição
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Empresa
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Comprimento
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Altura
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Profundidade
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Peso Sup.
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Foto
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Cadeira estofada
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                descrição da cadeira
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                fornecedora
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                2 metros
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1 metro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                50cm
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                120KG
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Foto
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  Delivered
                </span>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Cadeira estofada
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                descrição da cadeira
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                fornecedora
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                2 metros
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1 metro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                50cm
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                120KG
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Foto
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  Delivered
                </span>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Cadeira estofada
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                descrição da cadeira
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                fornecedora
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                2 metros
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1 metro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                50cm
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                120KG
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Foto
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  Delivered
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div className="text-gray-500">Cadeira estofada</div>
            <div>
              fornecedora
              {/* <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span> */}
            </div>
          </div>
          <div className="text-sm text-gray-700">descrição da cadeira</div>
          <div className="text-sm font-medium text-black">Compr.: 2 metros</div>
          <div className="text-sm font-medium text-black">Altura: 1 metro</div>
          <div className="text-sm font-medium text-black">Profun.: 50cm</div>
          <div className="text-sm font-medium text-black">Peso Sup.: 120KG</div>
          <div className="text-sm font-medium text-black">Foto: imagem</div>
        </div>
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div className="text-gray-500">Cadeira estofada</div>
            <div>
              fornecedora
              {/* <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span> */}
            </div>
          </div>
          <div className="text-sm text-gray-700">descrição da cadeira</div>
          <div className="text-sm font-medium text-black">Compr.: 2 metros</div>
          <div className="text-sm font-medium text-black">Altura: 1 metro</div>
          <div className="text-sm font-medium text-black">Profun.: 50cm</div>
          <div className="text-sm font-medium text-black">Peso Sup.: 120KG</div>
          <div className="text-sm font-medium text-black">Foto: imagem</div>
        </div>
<div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div className="text-gray-500">Cadeira estofada</div>
            <div>
              fornecedora
              {/* <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span> */}
            </div>
          </div>
          <div className="text-sm text-gray-700">descrição da cadeira</div>
          <div className="text-sm font-medium text-black">Compr.: 2 metros</div>
          <div className="text-sm font-medium text-black">Altura: 1 metro</div>
          <div className="text-sm font-medium text-black">Profun.: 50cm</div>
          <div className="text-sm font-medium text-black">Peso Sup.: 120KG</div>
          <div className="text-sm font-medium text-black">Foto: imagem</div>
        </div>
      </div>
    </AdminLayout>
  );
}
