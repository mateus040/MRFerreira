import { useState } from "react";
import HeaderAdmin from "../../pages/Admin/components/header";
import SidebarAdmin from "../../pages/Admin/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(state => !state);
  };

  return (
    <div className="flex">
      <div>
        <SidebarAdmin isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="w-full">
        <HeaderAdmin toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}
