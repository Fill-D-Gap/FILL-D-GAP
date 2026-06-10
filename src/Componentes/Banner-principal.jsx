function bannerPrincipal() {
    return(
        <div id='bannerPrincipal' className="bg-gradient-to-r from-[#422C9B] to-[#E9478F] py-5 rounded-b-lg 
        flex flex-col items-start pl-5 gap-3 md:py-33">
            <div className="font-montserrat text-lg text-white font-semibold
            md:text-6xl">
                <h1>Conectamos Organizaciones </h1>
                <h1 className="md:mt-2 -mt-2">para generar un impacto</h1>
                <h1 className="md:mt-2 -mt-2">sostenible.</h1>
            </div>
            <div className="font-montserrat text-xs text-white
            md:text-4xl">
                <h2>Cubrimos el puesto que falta para que tu</h2>
                <h2>empresa no se detenga.</h2>
            </div>
            <button className="bg-[#E9478F] font-montserrat rounded-2xl px-2 py-1 text-xs text-white italic font-semibold
            md:text-3xl md:mt-5 rounded-3xl px-4 py-2 hover:bg-white hover:text-[#E9478F] md:font-bold hover:scale-105
            md:transition md:duration-300 md:cursor-pointer">
                Conocer más
            </button>
        </div>
    )
}export default bannerPrincipal;