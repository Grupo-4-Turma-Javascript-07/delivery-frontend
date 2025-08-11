import Cardapio from "./components/cardapio/Cardapio"
import Categoria from "./components/categoria/Categoria"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"


function App() {

  return (
    
    <>
      <Navbar />
      <main className="flex flex-col gap-24 pt-[88px]">
        <Home />
        <Cardapio />
        <Categoria />
      </main>
      <Footer />
    </>
  )
}
export default App;
