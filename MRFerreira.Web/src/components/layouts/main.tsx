import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { Header } from "../header";
import { Footer } from "../footer";
import { SectionContact } from "../../pages/main/components/contact";

interface Props {
  children: React.ReactNode;
  contact?: boolean; 
}

export default function MainLayout({ children, contact }: Props) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-col grow">
          <main className="grow mt-10">{children}</main>
          {contact && <SectionContact />}
          <Footer />
        </div>
      </div>

      {/* Ícone do WhatsApp */}
      <Link
        to={`https://api.whatsapp.com/send?phone=5514997831356&text=${encodeURIComponent(
          "Olá, tudo bem? Gostaria de saber mais informações sobre os produtos!"
        )}`}
        target="_blank"
        className="fixed bottom-8 right-7 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center z-50"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </Link>
    </>
  );
}
