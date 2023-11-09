import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import AddTour from "./Routes/AddTour";
import Detail from "./Routes/Detail";
import Gallery from './Routes/Gallery';
import SignUp from './Routes/SignUp';
import NotFound from "./Routes/NotFound";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="tour" element={<AddTour />} />
        <Route path="tour/:id" element={<Detail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);