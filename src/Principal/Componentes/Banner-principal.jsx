function BannerPrincipal() {
    return (
        <section id="bannerPrincipal" className="sticky top-[72px] z-10 h-[calc(100vh-72px)] overflow-hidden bg-[#D4FCF4] px-4 sm:px-6 lg:px-10 py-10 md:py-16">
            <div className="mx-auto flex h-full max-w-6xl items-center">
                <div className="w-full bg-[#262788] text-[#F8FCFB] px-6 py-10 md:px-10 md:py-14">
                    <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#FECF64] font-semibold mb-4">
                        Fill D Gap
                    </p>
                    <h1 className="font-montserrat text-3xl md:text-6xl font-bold leading-tight max-w-4xl">
                        Cubrimos el puesto que falta para que tu empresa no se detenga.
                    </h1>
                    <p className="font-montserrat text-lg md:text-2xl mt-5 text-[#F8FCFB] max-w-3xl">
                        Talento temporal, impacto continuo.
                    </p>
                    <p className="font-montserrat text-sm md:text-lg mt-4 max-w-3xl text-[#DFE4EA]">
                        Conectamos empresas con profesionales seleccionados para cubrir necesidades temporales.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default BannerPrincipal
