import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Routes/Home.jsx";
import Register from "./Routes/Register.jsx";
import Detail from "./Routes/Detail.jsx";
import Gallery from './Routes/Gallery.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path ="register" element={<Register />} />
        <Route path ="tour/:id" element={<Detail />} />
        <Route path="gallery" element={<Gallery/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
