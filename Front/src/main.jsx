import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home.jsx";
import Registrar_Tour from "./Routes/Registrar_Tour.jsx";
import { Detail } from "./Routes/Detail";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path ="registrar" element={<Registrar_Tour />} />
        <Route path ="/tour/:id" element={<Detail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
