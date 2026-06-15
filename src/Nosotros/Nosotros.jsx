import MENU from '../Componentes/Menu.jsx'

const sections = [
    {
        title: 'Quiénes somos',
        text: 'Nuestra empresa nace de la necesidad bilateral entre empresarios y profesionales independientes por obtener una relación flexible, eficiente y estratégica que supla las necesidades inmediatas de las empresas y a la vez permita al profesional mantener el control de sus metas personales.',
    },
    {
        title: 'Qué hacemos',
        text: 'Dotamos a las empresas con cobertura temporal de un puesto vacante, cubriendo de manera eventual su necesidad. Nuestra comunidad profesional es previamente seleccionada y se caracteriza por su trayectoria, experiencia y compromiso con nuestro enfoque.',
    },
    {
        title: 'Qué nos identifica',
        text: 'Tenemos una visión fresca y moderna. Queremos apoyar tanto a empresarios como a profesionales comprometidos y es por esto que no somos una agencia de reclutamiento masivo, sino una comunidad selecta de profesionales dispuestos a cubrir puestos eventuales y dar continuidad a tu negocio cuando más lo necesitas.',
    },
]

function Nosotros() {
    return (
        <section id="NOSOTROS" className="min-h-screen bg-[#F8FCFB]">
            <MENU />

            <div className="px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="bg-[#262788] text-[#F8FCFB] px-6 py-8 md:px-10 md:py-12">
                            <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#FECF64] font-semibold mb-4">
                                Nosotros
                            </p>
                            <h1 className="font-montserrat text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
                                Permítenos reclutar tu eslabón faltante y cubrir esa ausencia sin que se detenga tu productividad.
                            </h1>
                            <p className="font-montserrat text-base md:text-lg text-[#DFE4EA] mt-5 max-w-2xl">
                                Conectamos empresas con profesionales seleccionados para cubrir necesidades temporales.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-6 md:px-8 md:py-8">
                                <p className="font-montserrat text-sm uppercase tracking-[0.2em] text-[#262788] font-semibold mb-3">
                                    Nuestra visión
                                </p>
                                <p className="font-montserrat text-lg md:text-2xl font-bold text-[#262788] leading-tight">
                                    Una comunidad selecta, flexible y estratégica.
                                </p>
                            </div>

                            <div className="bg-[#FECF64] border border-[#DFE4EA] px-6 py-6 md:px-8 md:py-8">
                                <p className="font-montserrat text-sm uppercase tracking-[0.2em] text-[#262788] font-semibold mb-3">
                                    Enfoque
                                </p>
                                <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] leading-relaxed">
                                    No reclutamiento masivo. Solo cobertura temporal con profesionales que aportan continuidad.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {sections.map((section, index) => (
                            <article
                                key={section.title}
                                className={`px-6 py-7 md:px-8 md:py-8 border shadow-sm ${
                                    index === 1
                                        ? 'bg-white border-[#262788]/15 translate-y-0'
                                        : 'bg-white border-[#DFE4EA]'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#262788] text-[#F8FCFB] font-montserrat font-bold">
                                        0{index + 1}
                                    </span>
                                    <h2 className="font-montserrat text-2xl font-bold text-[#262788]">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] leading-relaxed">
                                    {section.text}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] items-stretch">
                        <div className="bg-[#262788] text-[#F8FCFB] px-6 py-8 md:px-8 md:py-10">
                            <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#FECF64] font-semibold mb-3">
                                Lo que nos mueve
                            </p>
                            <h2 className="font-montserrat text-2xl md:text-4xl font-bold leading-tight">
                                Relación flexible, eficiente y estratégica.
                            </h2>
                        </div>

                        <div className="bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-8 md:px-8 md:py-10">
                            <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] leading-relaxed max-w-3xl">
                                Nuestra propuesta conecta la necesidad inmediata de las empresas con el control de metas personales de los profesionales, creando una solución ágil para cubrir vacantes eventuales sin detener la operación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Nosotros
