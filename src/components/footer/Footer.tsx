import {
  ArrowCircleUpRightIcon,
  ClockIcon,
  CreditCardIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  MoneyIcon,
  PixLogoIcon,
  WhatsappLogoIcon
} from "@phosphor-icons/react";

import { useEffect, useState } from "react";
import LogoTemperoBR from "../../assets/img/temperoBRlogo.png";

function Footer() {
  const [entregando, setEntregando] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    function verificaEntrega() {
      const agora = new Date();
      const dia = agora.getDay();
      const hora = agora.getHours();

      const diaValido = dia >= 1 && dia <= 6; // 1 - seg a 6 - sáb
      const dentroDoHorario = hora >= 10 && hora < 23;

      setEntregando(diaValido && dentroDoHorario);
    }

    verificaEntrega();

    const interval = setInterval(verificaEntrega, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 drop-shadow-sm w-full mt-20 pt-10 pb-4 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-700 text-sm md:justify-items-center">

        <div className="flex flex-col items-start gap-4">
          <img src={LogoTemperoBR} alt="Logo Tempero BR" className="w-36" />
          <p className="leading-relaxed text-left max-w-80">
            No <strong className="text-green-400">Tempero BR</strong>, nossa missão é levar o sabor caseiro
            até você, com ingredientes frescos e temperos que fazem a diferença.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left">Contato</h4>
          <div className="flex items-center gap-2">
            <WhatsappLogoIcon size={18} /> <span>(99) 99999-9999</span>
            <a href="#whatsapp" target="_blank" rel="noopener noreferrer" className="hover:text-green-100"><ArrowCircleUpRightIcon size={18} /></a>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon size={18} /> <span>Rua das Flores, 123 - Centro, Cidade</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon size={18} /> <span>Seg a Sáb: 10h - 23h</span>
          </div>
          {entregando && (
            <span className="px-3 py-1 bg-green-50 w-fit text-green-700 rounded-full mt-2 shadow-sm">
              🚴‍♂️ Estamos entregando agora
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left">Links rápidos</h4>
          <a href="#promocoes" className="hover:text-green-200 transition-colors text-left w-full">Promoções</a>
          <a href="https://github.com/Grupo-4-Turma-Javascript-07" className="hover:text-green-200 transition-colors text-left w-full">Ajuda</a>
          <a href="#politica" className="hover:text-green-200 transition-colors text-left w-full">Política de Privacidade</a>
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left">Pagamentos</h4>
          <div className="flex flex-wrap items-center gap-4">
            <CreditCardIcon size={26} />
            <PixLogoIcon size={26} />
            <MoneyIcon size={26} />
          </div>
          <p className="text-xs text-gray-500 max-w-52 text-left">
            Aceitamos cartões, Pix, dinheiro e vales alimentação/refeição (VR, VA).
          </p>

          <h4 className="font-semibold text-lg mt-4 text-left">Siga-nos</h4>
          <div className="flex gap-4">
            <a href="https://github.com/Grupo-4-Turma-Javascript-07" className="hover:text-green-200"><GithubLogoIcon size={22} /></a>
            <a href="https://www.instagram.com/generationbrasil" className="hover:text-green-200"><InstagramLogoIcon size={22} /></a>
            <a href="https://www.linkedin.com/school/generationbrasil" className="hover:text-green-200"><LinkedinLogoIcon size={22} /></a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-8 border-t border-gray-200 pt-4 text-xs text-gray-500">
        <span>Grupo 4 - Generation JavaScript 07 © {year} Tempero BR — Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;