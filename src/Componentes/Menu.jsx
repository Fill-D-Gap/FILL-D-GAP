import { useState } from 'react';
import { Users, UserPlus, Mail, Menu as IconMenu, X as CloseIcon, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Menu() {
    const [menuOpen, menusetOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    const scrollToId = (target) => {
        menusetOpen(false);
        const runScroll = () => {
            const element = document.getElementById(target);
            if (!element) return;
            const headerOffset = 72;
            const elementPosition = element.offsetTop;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth',
            });
        };

        if (location.pathname !== '/') {
            navigate('/');
            window.setTimeout(runScroll, 350);
            window.setTimeout(runScroll, 700);
            return;
        }

        window.setTimeout(runScroll, 50);
    };

    const goHome = () => {
        menusetOpen(false);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (menuOpen) {
        return (
            <div className="fixed top-0 left-0 bg-[#262788] min-h-screen w-full transition-all duration-300 z-50">
                <nav className="flex mx-3 py-3 justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <img src="/Redes-sociales.svg" alt="Logo Fill D Gap" className="w-10 cursor-pointer" onClick={goHome} />
                        <h1 className='text-[#F8FCFB] font-montserrat font-bold' onClick={goHome}>
                            FILL D GAP
                        </h1>
                    </div>

                    <button onClick={() => menusetOpen(false)} className="text-white focus:outline-none flex items-center justify-center">
                        <CloseIcon className="h-10 w-auto" />
                    </button>
                </nav>

                <div className="px-6 py-8">
                    <ul className="flex flex-col gap-6 text-xl text-white">
                        <li className="flex items-center gap-3 py-3 border-b border-white/10 cursor-pointer" onClick={goHome}>
                            <Home className="w-6 h-6 text-[#FECF64]" />
                            Inicio
                        </li>
                        <li className="flex items-center gap-3 py-3 border-b border-white/10 cursor-pointer" onClick={() => scrollToId('futuro-tuyo')}>
                            <Users className="w-6 h-6 text-[#FECF64]" />
                            Comunidad
                        </li>
                        <li className="flex items-center gap-3 py-3 border-b border-white/10 cursor-pointer" onClick={() => scrollToId('registro')}>
                            <UserPlus className="w-6 h-6 text-[#FECF64]" />
                            Registro
                        </li>
                        <li className="flex items-center gap-3 py-3 cursor-pointer" onClick={() => navigate('/Nosotros')}>
                            <Mail className="w-6 h-6 text-[#FECF64]" />
                            Nosotros
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#262788] sticky top-0 left-0 right-0 z-50 shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <nav className="md:mx-10 mx-3 py-2 md:py-3 flex justify-between items-center md:gap-2">
                <div className="flex gap-3 items-center">
                    <img src="/Redes-sociales.svg" alt="Logo Fill D Gap" className="md:w-15 w-10 cursor-pointer transition duration-200 hover:scale-105" onClick={goHome} />
                    <h1 className='text-[#F8FCFB] font-montserrat font-bold md:text-xl cursor-pointer hover:scale-105 duration-200' onClick={goHome}>
                        FILL D GAP
                    </h1>
                </div>
                <div className="hidden md:block">
                    <ul className="md:flex md:gap-10 text-lg text-[#F8FCFB]">
                        <li className="flex items-center gap-2 cursor-pointer transition duration-200 hover:scale-105" onClick={() => scrollToId('bannerPrincipal')}>
                            <Home className="w-5 h-5 text-[#FECF64]" />
                            Inicio
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer transition duration-200 hover:scale-105" onClick={() => scrollToId('futuro-tuyo')}>
                            <Users className="w-5 h-5 text-[#FECF64]" />
                            Comunidad
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer transition duration-200 hover:scale-105" onClick={() => scrollToId('registro')}>
                            <UserPlus className="w-5 h-5 text-[#FECF64]" />
                            Registro
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer transition duration-200 hover:scale-105" onClick={() => navigate('/Nosotros')}>
                            <Mail className="w-5 h-5 text-[#FECF64]" />
                            Nosotros
                        </li>
                    </ul>
                </div>
                <div className="md:invisible md:pl-50">
                    <button onClick={() => menusetOpen(true)} className="text-[#F8FCFB] focus:outline-none flex items-center justify-center">
                        <IconMenu className="h-10 w-auto" />
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
