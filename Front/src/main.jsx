import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import RegistrarTour from "./Routes/RegistrarTour";
// import Detail from "./Routes/Detail";
import Gallery from './Routes/GalleryC';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import Create from './Routes/Create';
// import PageNotFound from './Components/errors/PageNotFound';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="tour" element={<RegistrarTour />} />
        {/* <Route path="tour/:id" element={<Detail />} /> */}
        <Route path="gallery" element={<Gallery />} />

        {/* Unificar estilos al con el signUp */}
        <Route path="create" element={<Create />} />
        <Route path="login" element={<Login/>} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
    {/* <Route path="*" element={<PageNotFound/>}/> */} 
    </Routes>
  </BrowserRouter>
);