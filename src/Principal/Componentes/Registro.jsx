function Registro() {
    return (
        <section id="registro" className="sticky top-[72px] z-30 h-[calc(100vh-72px)] overflow-auto bg-[#F8FCFB] px-4 sm:px-6 lg:px-10 py-12 md:py-16">
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#262788] font-semibold mb-3">
                        Registro
                    </p>
                    <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-[#262788] leading-tight">
                        Regístrate y forma parte de nuestra comunidad.
                    </h2>
                    <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] mt-4 max-w-2xl">
                        Completa tus datos para verificar tu perfil y avanzar en el proceso de ingreso.
                    </p>
                    <div className="mt-8 bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-6">
                        <h3 className="font-montserrat text-lg font-bold text-[#262788]">Interesados en saber más</h3>
                        <p className="font-montserrat text-sm md:text-base text-[#2B2B2B] mt-2">
                            No te parece posible y quieres saber más? Más adelante podrá ampliarse esta sección para quienes busquen información adicional.
                        </p>
                    </div>
                </div>

                <form className="bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-6 md:px-8 md:py-8 shadow-sm">
                    <h3 className="font-montserrat text-2xl font-bold text-[#262788]">
                        Formulario de inscripción de talento
                    </h3>
                    <p className="font-montserrat text-sm text-[#2B2B2B] mt-2 mb-6">
                        Regístrate y forma parte de nuestra comunidad.
                    </p>

                    <div className="grid gap-4">
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Tu vocación</span>
                            <input className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Provincia de residencia</span>
                            <input className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Disponibilidad para viajar</span>
                            <select className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95">
                                <option>Selecciona una opción</option>
                                <option>Local</option>
                                <option>Entre provincias</option>
                                <option>Internacional</option>
                            </select>
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Años de experiencia</span>
                            <input className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="number" min="0" />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Licencia para ejercer</span>
                            <select className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white">
                                <option>Selecciona una opción</option>
                                <option>Sí</option>
                                <option>No</option>
                            </select>
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">País</span>
                            <input className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Cartas de referencia</span>
                            <input className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] 
                            bg-white w-full text-sm text-[#2B2B2B]
                            rtl file:ltr
                            file:py-1 file:px-3
                            file:border-0 file:bg-[#262788] file:text-white
                            file:text-sm file:font-semibold file:font-montserrat
                            hover:file:bg-[#422C9B] file:transition-colors file:cursor-pointer" 
                            type="file" 
                            />
                        </label>
                    </div>

                    <button
                        type="button"
                        className="mt-6 w-full bg-[#262788] text-[#F8FCFB] font-montserrat font-semibold px-5 py-3 hover:bg-[#422C9B] transition-colors"
                    >
                        Enviar registro
                    </button>

                    <p className="font-montserrat text-xs text-[#262788] mt-4 ">
                        Los datos suministrados se verificarán al encontrar tu eslabón de enganche.
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Registro
