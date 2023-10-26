import { Outlet } from "react-router-dom";
import Navbar from './Components/Navbar'
import Footer from "./Components/Footer";
import './index.css'

function App() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
  )
}

export default App
