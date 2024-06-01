import HeaderAdmin from "../../pages/Admin/components/header";
import SidebarAdmin from "../../pages/Admin/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex">
      <div>
        <SidebarAdmin />
      </div>
      <div className="w-full">
        <HeaderAdmin />
        {children}
      </div>
    </div>
  );
}
