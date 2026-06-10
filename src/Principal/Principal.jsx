import MENU from '../Componentes/Menu.jsx'
import BANNER from '../Componentes/Banner-principal.jsx'
import TUFUTURO from '../Componentes/El-futuro-es-tuyo.jsx'
import BANNERFIN from '../Componentes/banner-fin.jsx'
function App() {

  return (
    <>
      <section className="bg-[#EDEDED] min-h-screen">
        <MENU />
        <BANNER />
        <TUFUTURO/>
        <BANNERFIN/>
      </section>

    </>
  )
}

export default App
