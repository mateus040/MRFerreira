import { useState } from "react";
import HeaderAdmin from "../../pages/Admin/components/header";
import SidebarAdmin from "../../pages/Admin/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((state) => !state);
  };

  return (
    <div className="flex h-screen">
      <div>
        <SidebarAdmin isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-col flex-1 w-full">
        <HeaderAdmin toggleSidebar={toggleSidebar} />
        <div className="px-8 py-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
