import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from "./Routes/Home";
import './index.css'
import Footer from "./Components/Footer";


function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
