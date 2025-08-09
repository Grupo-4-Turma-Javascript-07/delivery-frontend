function Home() {
    return (
        <>
            <div id='home' className=" min-h-screen bg-background flex items-center justify-center scroll-mt-20">
                <div className='container grid grid-cols-2  text-nav-footer'>
                <div className="flex justify-center">
                        <img
                            src="https://alegrafoods.com.br/wp-content/uploads/2023/06/composicao-kit-feijoada-scaled.jpg"
                            alt="Imagem Página Home"
                            className='w-full h-96 rounded-[56px] object-cover shadow-lg'
                        />
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center py-4 px-9 ">
                        <h2 className='text-4xl font-bold text-green-400 mb-1'>
                            TemperoBR
                        </h2>
                        <h3 className="text-3xl font-light text-green-300 mb-4 relative">
                            Sabores do{' '}
                            <span className="relative z-10 px-2 text-shadow-lg/15 font-semibold text-green-400">Brasil
                            <span className="absolute left-0 bottom-1 h-9 bg-amber-300 rounded border-r-[4px] border-[#262626] animate-brasil"></span>
                            </span>
                        </h3>
                        <p className='text-lg text-green-400'>
                            No TemperoBR, cada garfada é uma viagem pelos sabores do nosso Brasil.
                            Da feijoada caprichada ao tropeiro da vovó, entregamos comida com alma, feita com carinho e aquele tempero que aquece o coração.
                        </p>
                        <button className="px-4 py-2 hover:bg-green-400 hover:text-white hover:border-green-400 transition-all duration-300 border-2 rounded-4xl cursor-pointer">Ver Cardápio</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home