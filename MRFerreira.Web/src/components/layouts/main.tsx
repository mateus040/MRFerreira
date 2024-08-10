import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { Header } from "../header";
import { Footer } from "../footer";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-col grow">
          <main className="grow mt-10">{children}</main>
          <Footer />
        </div>
      </div>

      {/* Ícone do WhatsApp */}
      <div className="fixed bottom-8 right-7 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center z-50">
        <Link
          to={`https://api.whatsapp.com/send?phone=5514991896619&text=${encodeURIComponent(
            "Olá, tudo bem? Gostaria de saber mais informações sobre os produtos!"
          )}`}
          target="_blank"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </Link>
      </div>
    </>
  );
}
