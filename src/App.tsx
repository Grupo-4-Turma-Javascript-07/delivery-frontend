import Cardapio from "./components/cardapio/Cardapio";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <main className="flex flex-col gap-24 mt-24 pt-[88px]">
        <Home />
        <Cardapio />
      </main>
    </>
  );
}
export default App;