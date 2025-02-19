
import './App.css'
import CtrlPerosnCard from './components/people/controls/CtrlPerosnCard'
import CtrlPersonCardWithFilter from './components/people/controls/CtrlPersonCardWithFilter'

function App() {

  return (
    <>
    <CtrlPersonCardWithFilter filterEnable={true} />
    </>
  )
}

export default App
