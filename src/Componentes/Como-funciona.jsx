import { BicepsFlexed } from 'lucide-react'
function ComoFunciona () {
    return(
        <div className="flex flex-col items-center mt-15">
            <h1 className="font-montserrat text-2xl font-bold mb-12 mt-20 bg-gradient-to-r from-[#E9478F] 
            to-[#422C9B] bg-clip-text text-transparent md:text-4xl mb-50">¡El futuro es tuyo!</h1>

            <div className="flex flex-col items-center mt-20">
                
                <h1 className="font-montserrat text-2xl font-bold mb-10  md:text-4xl text-[#262788]"
                >Reconoces tu talento</h1>
                <BicepsFlexed className="size-25"/>
                <p className="max-w-3xl">Tus habilidades únicas, tus pasiones y tus metas personales no son simples 
                    herramientas de trabajo; son el motor que te impulsa a crecer y el puente 
                    para conectar con organizaciones que comparten tu visión de un impacto sostenible.</p>
                
            </div>
        </div>
    )
}
export default ComoFunciona