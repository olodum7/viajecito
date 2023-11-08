import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/ui-components/navbar/Navbar";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Detail from "./Routes/Detail";
import GalleryC from "./Routes/GalleryC";
import Login from "./Routes/Login";
import Create from "./Routes/Create";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />

        <Route path="/admin" element={<Create />} />

        <Route path="register" element={<Register />} />
        <Route path="gallery" element={<GalleryC />} />

        <Route path="tour/:id" element={<GalleryC />} />
      </Routes>
    </>
  );
}

export default App;
