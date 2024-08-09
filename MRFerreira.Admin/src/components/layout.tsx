import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((state) => !state);
  };

  return (
    <div className="flex h-screen" style={{ overflowX: "hidden" }}>
      <div>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div
        className="flex flex-col flex-1 w-full"
        style={{ overflowX: "auto" }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
