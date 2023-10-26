
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrarTour from './Routes/Registrar_Tour'
import './index.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Registrar_Tour" element={<RegistrarTour/>} />
      </Routes>
    </Router>
  )
  
}

export default App
