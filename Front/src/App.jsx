import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/ui-components/navbar/Navbar";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Detail from "./Routes/Detail";
import Gallery from "./Routes/Gallery";
import Footer from "./Components/ui-components/footer/Footer";
import List from "./Routes/List"
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="tour/:id" element={<Detail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="list" element={<List />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
