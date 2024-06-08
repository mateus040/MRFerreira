import AdminLayout from "../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../components/breadCrumb";

export default function Admin() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/produtos",
      name: "Home",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>
    </AdminLayout>
  );
}
