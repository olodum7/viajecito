import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import AddTour from "./Routes/AddTour";
import Detail from "./Routes/Detail";
import SignUp from './Routes/SignUp';
import NotFound from "./Routes/NotFound";
import Login from "./Routes/Login";
import List from "./Routes/List";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="tour" element={<AddTour />} />
        <Route path="tour/:id" element={<Detail />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login/>} /> 
        <Route path="list" element={<List/>} />
        {/* Unificar estilos al con el signUp */}
        {/* <Route path="create" element={<Create />} />*/}
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);