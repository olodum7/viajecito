import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui-components/navbar/Navbar";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Detail from "./Routes/Detail";
import Gallery from "./Routes/Gallery";
import Footer from "./components/ui-components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="tour/:id" element={<Detail />} />
        <Route path="gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
