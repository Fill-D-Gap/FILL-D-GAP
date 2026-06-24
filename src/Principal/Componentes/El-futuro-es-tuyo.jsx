import { CheckCircle2 } from 'lucide-react'

const items = [
    'Reconoces tu talento, tu oficio y tu valor profesional.',
    'Escoges independencia sobre permanencia.',
    'Tus metas son tu prioridad.',
    'Eres autónomo, eficiente y apasionado en lo que haces.',
    'Necesitas disponer de tu tiempo, pero disfrutas de tu oficio.',
]

function Metas() {
    return (
        <section id="futuro-tuyo" className="sticky top-[72px] z-20 h-[calc(100vh-1px)] overflow-hidden bg-[#ED5275] px-4 sm:px-6 lg:px-10 py-12 md:pb-30 md:pt-30">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-3xl mb-20">
                    <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#ffffff] font-semibold mb-3">
                        Encaja contigo
                    </p>
                    <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-[#ffffff]">
                        ¡El futuro es tuyo!
                    </h2>
                    <p className="font-montserrat text-base md:text-lg text-[#ffffff] mt-4">
                        Si te identificas con esto, puedes formar parte de la comunidad.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                        <div key={item} className="bg-white/90 border border-[#DFE4EA] px-5 py-5 flex gap-4 items-start">
                            <CheckCircle2 className="w-6 h-6 text-[#262788] shrink-0 mt-0.5" />
                            <p className="font-montserrat text-base text-[#2B2B2B] leading-relaxed">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Metas
