import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import AddTour from "./Routes/AddTour";
import Detail from "../src/Routes/Detail";
import SignUp from "./Routes/SignUp";
import NotFound from "./Routes/NotFound";
import Login from "./Routes/Login";
import Favs from "./Routes/Favs";
import AdminPanel from "./Routes/AdminPanel";
import Context from "./Components/utils/global.context";
import List from "./Routes/List";

import ProtectedRoute from "./Components/utils/ProtectedRoute";

// Toast notification
import { ToastContainer } from "react-toastify";
import Profile from "./Routes/Profile";
import Reservation from "./Routes/Reservation";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tour" element={<AddTour />} />
          <Route path="tour/:id" element={<Detail />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="list" element={<List />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservation"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/favs"
            element={
              <ProtectedRoute>
                <Favs />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </Context>
);
