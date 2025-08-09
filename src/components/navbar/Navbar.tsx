import { BasketIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import LogoTemperoBR from "../../assets/img/temperoBRlogo.png";

function Navbar() {
  return (
    <nav className="bg-white flex items-center justify-center drop-shadow-sm py-1.5 fixed w-full">
      <div className="container flex items-center justify-between w-full">
        <img src={LogoTemperoBR} width={112} className="cursor-pointer" alt="Logo Tempero BR" />

        <ul className="flex gap-8 text-xl">
          <li className="cursor-pointer relative group hover:brightness-105 hover:text-green-200">
            <a href="#home">Home</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-green-200 scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
          <li className="cursor-pointer relative group hover:brightness-105 hover:text-green-200">
            <a href="#cardapio">Cardápio</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-green-200 scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
          <li className="cursor-pointer relative group hover:brightness-105 hover:text-green-200">
            <a href="#contato">Contato</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-green-200 scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
        </ul>

        <div className="flex gap-6">
          <button>
            <MagnifyingGlassIcon width={26} height={26} className="cursor-pointer hover:text-green-200" />
          </button>
          <button>
            <BasketIcon width={26} height={26} className="cursor-pointer hover:text-green-200" />
          </button>
          <button className="text-xl border-2 rounded-4xl py-0.5 px-4 cursor-pointer hover:bg-green-400 hover:text-white hover:border-green-400 transition-all duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;