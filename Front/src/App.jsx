import { Body } from './componentes/Body'
import './App.css'
//import Detail from './routes/Detail';
//import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';



/*
function App() {
  
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/body"/>} />
            <Route path="/body" element={<Body/>} />
            <Route path="/tour/:id" element={<Detail/>} />
          </Routes>
        </div>
    </Router>
    
  )
}*/

function App() {
  
  return (
    <>
      <Body />
    </>
  )
}

export default App
