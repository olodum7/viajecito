import React from "react";
import App from "./App";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Detail from "./Routes/Detail";
import Gallery from './Routes/Gallery';
import SignUp from './Routes/SignUp';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="tour/:id" element={<Detail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
