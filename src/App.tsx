import { useState } from "react";
import Categoria from "./components/Categoria";
import Home from "./components/Home";

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      {/* Navegação simples para desenvolvimento */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-green-200 text-slate-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'admin'
                  ? 'bg-green-200 text-slate-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              ⚙️ Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo da página */}
      {currentPage === 'home' ? <Home /> : <Categoria />}
    </div>
  );
}

export default App;