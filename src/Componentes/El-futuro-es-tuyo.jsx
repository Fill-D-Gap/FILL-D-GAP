import { BicepsFlexed, Compass, Flame, Target, Clock} from 'lucide-react'

function Metas () {
    return (
        <div id="futuro-tuyo" className="flex flex-col items-center mt-10 px-4 ">
            <h1 className="font-montserrat text-3xl font-bold mt-10 mb-10 bg-gradient-to-r 
            from-[#E9478F] to-[#422C9B] bg-clip-text text-transparent md:text-4xl text-center">
                ¡El futuro es tuyo!
            </h1>
            <div className='flex flex-wrap items-center justify-center gap-6'>
                {/* Reconoces tu talento */}
            <div className="flex flex-col  items-center max-w-xl w-full bg-white p-6 rounded-2xl mb:50
            shadow-sm border border-gray-100 mb-5">
                <h2 className="font-montserrat text-xl font-bold mb-3 text-[#262788] md:text-2xl">
                    Reconoces tu talento
                </h2>
                <div className='flex items-center gap-4 w-full'>
                    <div className="flex items-center justify-center p-2 bg-[#E5F1FC] rounded-full text-[#262788] shrink-0">
                        <BicepsFlexed className="w-17 h-17" />
                    </div>
                    <p className="font-montserrat text-sm text-gray-600 leading-relaxed pt-1">
                        Tus habilidades únicas, tus pasiones y tus metas personales no son simples 
                        herramientas de trabajo; son el motor que te impulsa a crecer y el puente 
                        para conectar con organizaciones.
                    </p>
                </div>
            </div>
            {/* Independencia sobre permanencia */}
            <div className="flex flex-col items-center max-w-xl w-full bg-white p-6 rounded-2xl mb:50
            shadow-sm border border-gray-100 mb-5">
                <div className="">
                    <h2 className="font-montserrat text-xl text-center font-bold mb-3 text-[#262788] md:text-2xl">
                    Independencia sobre permanencia
                </h2>
                </div>
                <div className='flex items-center gap-4 w-full'>
                    <div className="flex items-center justify-center p-2 bg-[#E5F1FC] rounded-full text-[#262788] shrink-0">
                        <Compass className="w-17 h-17" />
                    </div>
                    <p className="font-montserrat text-sm text-gray-600 leading-relaxed pt-1">
                        Tu capacidad de decidir y avanzar con independencia vale más que la 
                        simple permanencia; eres el motor de tu propio impacto, no un pasajero.
                    </p>
                </div>
            </div>
            {/* ¡Tus metas, tu prioridad! */}
            <div className="flex flex-col items-center max-w-xl w-full bg-white p-6 rounded-2xl mb:50
            shadow-sm border border-gray-100 mb-5">
                <h2 className="font-montserrat text-xl font-bold mb-3 text-[#262788] md:text-2xl">
                    ¡Tus metas, tu prioridad!
                </h2>
                <div className='flex items-center gap-4 w-full'>
                    <div className="flex items-center justify-center p-2 bg-[#E5F1FC] rounded-full text-[#262788] shrink-0">
                        <Target className="w-17 h-17" />
                    </div>
                    <p className="font-montserrat text-sm text-gray-600 leading-relaxed pt-1">
                        Poner tus metas como tu prioridad es el acto de valentía que define tu 
                        éxito. No esperes a que el entorno decida por ti; diseña tu propio 
                        norte y avanza con la certeza de que tu crecimiento no es negociable.
                    </p>
                </div>
            </div>
            {/* Autonomía, eficiencia y pasión */}
            <div className="flex flex-col items-center max-w-xl w-full bg-white p-6 rounded-2xl mb:50 
            shadow-sm border border-gray-100 mb-5">
                <h2 className="font-montserrat text-xl font-bold mb-3 text-[#262788] md:text-2xl">
                    Autonomía, eficiencia y pasión
                </h2>
                <div className='flex items-center gap-4 w-full'>
                    <div className="flex items-center justify-center p-2 bg-[#E5F1FC] rounded-full text-[#262788] shrink-0">
                        <Flame className="w-17 h-17" />
                    </div>
                    <p className="font-montserrat text-sm text-gray-600 leading-relaxed pt-1">
                        Es lo que te diferencia del resto. No necesitas que te digan cómo brillar; 
                        tu disciplina y el amor por tu trabajo son el combustible que 
                        transforma cualquier reto en un resultado extraordinario.
                    </p>
                </div>
            </div>
            {/* Dueño de tu Tiempo, Amante de tu Oficio */}
            <div className="flex flex-col items-center max-w-xl w-full bg-white p-6 rounded-2xl mb:50
            shadow-sm border border-gray-100 mb-5">
                <div className='max-w-xs text-center'>
                    <h2 className="font-montserrat text-xl  font-bold mb-3 text-[#262788] md:text-2xl">
                    Dueño de tu tiempo, amante de tu oficio
                </h2>
                </div>
                <div className='flex items-center gap-4 w-full'>
                    <div className="flex items-center justify-center p-2 bg-[#E5F1FC] rounded-full text-[#262788] shrink-0">
                        <Clock className="w-17 h-17" />
                    </div>
                    <p className="font-montserrat text-sm text-gray-600 leading-relaxed pt-1">
                        Manejar tus propios horarios no significa trabajar menos, significa trabajar mejor. 
                        Eliges cuándo, dónde y cómo aportar tu valor, porque tu talento rinde más cuando 
                        tú tienes el control de tu agenda.
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Metas;