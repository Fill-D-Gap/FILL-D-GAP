import { FaFacebook, FaInstagram } from 'react-icons/fa';

function BannerFin () {
    return(
        <div className="bg-[#D4FCF4] py-8 px-6 rounded-t-xl">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-5 text-center sm:text-left">
                    
                    <img src="/Logo.svg" alt="Logo Nuevo Menú" className="w-30 md:w-20 object-contain" /> 
                
                    <div>
                        <h1 className="font-montserrat text-2xl md:text-4xl text-[#262788] font-bold leading-tight">
                            Sé parte del cambio.
                        </h1>
                        <h2 className="font-montserrat text-sm md:text-2xl text-[#262788] mt-1 font-medium">
                            Juntos generando un impacto.
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                    <h3 className="font-montserrat text-sm md:text-base text-[#262788] font-bold uppercase tracking-wider">
                        ¡Síguenos!
                    </h3>
                    <div className="flex gap-4">
                        <FaFacebook className="w-8 h-8 text-[#262788] hover:text-[#E9478F] cursor-pointer transition-all duration-300 transform hover:scale-115" />
                        <FaInstagram className="w-8 h-8 text-[#262788] hover:text-[#E9478F] cursor-pointer transition-all duration-300 transform hover:scale-115" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BannerFin;