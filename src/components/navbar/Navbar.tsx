import { BasketIcon, ListIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import LogoTemperoBR from "../../assets/img/temperoBRlogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSearchInput, setOpenSearchInput] = useState(false);

  return (
    <nav className="bg-white flex items-center justify-center drop-shadow-sm py-1.5 px-6 fixed w-full z-1000">
      <div className="container flex items-center justify-between w-full">
        <div className="flex flex-1 justify-start">
          <img src={LogoTemperoBR} width={112} className="cursor-pointer" alt="Logo Tempero BR" />
        </div>

        <ul className="hidden lg:flex lg:w-1/3 justify-center gap-8 text-xl">
          <li className="cursor-pointer relative group hover:brightness-105 hover:text-green-200">
            <Link to='/home'>Home</Link>
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
          <li className="cursor-pointer relative group hover:brightness-105 hover:text-green-200">
            <Link to='/admin'>Admin</Link>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-green-200 scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
        </ul>

        <div className="flex-1 flex justify-end gap-6">
          <div className="flex">
            <button
              onClick={() => setOpenSearchInput(!openSearchInput)}
              className={`ml-2 ${openSearchInput && "mr-2"}`}
            >
              <MagnifyingGlassIcon width={26} height={26} className="cursor-pointer hover:text-green-200" />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${openSearchInput ? "min-w-[80px] max-w-[400px] opacity-100" : "max-w-0 opacity-0 ml-0"}`
              }
            >
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 placeholder:text-gray-400 border border-gray-300 rounded-full text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300 ease-in-out"
              />
            </div>

          </div>

          <button>
            <BasketIcon width={26} height={26} className="cursor-pointer hover:text-green-200" />
          </button>
          <button className="hidden sm:flex text-xl border-2 rounded-4xl py-0.5 px-4 cursor-pointer hover:bg-green-400 hover:text-white hover:border-green-400 transition-all duration-300">
            Login
          </button>

          <button
            className="lg:hidden text-azul-claro text-3xl font-bold"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            <ListIcon size={32} weight="light" />
          </button>
        </div>
      </div>

      {open && (
        <ul className="flex flex-col items-end gap-4 bg-white opacity-90 text-xl mt-1.5 px-6 py-4 lg:hidden fixed top-20 right-0 z-40 shadow-md rounded-lg w-52">
          <li className="relative w-full group hover:brightness-105">
            <a href="#home" onClick={() => setOpen(false)} className="block text-right">Home</a>
            <span className="block border-b border-slate-300 mt-2 w-full" />
          </li>
          <li className="relative w-full group hover:brightness-105">
            <a href="#cardapio" onClick={() => setOpen(false)} className="block text-right">Cardápio</a>
            <span className="block border-b border-slate-300 mt-2 w-full" />
          </li>
          <li className="relative w-full group hover:brightness-105">
            <a href="#contato" onClick={() => setOpen(false)} className="block text-right">Contato</a>
            <span className="block border-b border-slate-300 mt-2 w-full sm:last:border-none" />
          </li>

          <li className="sm:hidden relative w-full group hover:brightness-105">
            <a href="#login" onClick={() => setOpen(false)} className="block text-right">
              Login
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar;