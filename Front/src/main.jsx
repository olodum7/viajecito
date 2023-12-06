import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./Routes/NotFound";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import AddTour from "./Routes/AddTour";
import EditTour from "./Routes/EditTour";
import Home from "./Routes/Home";
import Detail from "./Routes/Detail";
import Favs from "./Routes/Favs";
import AdminPanel from "./Routes/AdminPanel";
import Context from "./Components/utils/global.context";
import ProtectedRoute from "./Components/utils/ProtectedRoute";

// Toast notification
import { ToastContainer } from "react-toastify";
import Profile from "./Routes/Profile";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tour" element={<AddTour />} />
          {<Route path="tour/:id" element={<Detail />} />}
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route path="profile" element={
            <ProtectedRoute onlyAdmin={false}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route
            path="detailReservation"
            element={
              <ProtectedRoute>
                {/* { <Detail /> } */}
              </ProtectedRoute>
            }
          />
          <Route path="profile/favs" element={
            <ProtectedRoute onlyAdmin={false}>
              <Favs />
            </ProtectedRoute>
          } />

          <Route path="admin" element={
            <ProtectedRoute onlyAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />

          <Route path="/admin/tour" element={
            <ProtectedRoute onlyAdmin={true}>
              <EditTour />
            </ProtectedRoute>
          } />

          <Route path="/admin/tour/add" element={
            <ProtectedRoute onlyAdmin={true}>
              <AddTour />
            </ProtectedRoute>
          } />

          <Route path="admin/categories" element={
            <ProtectedRoute onlyAdmin={true}>
              {/* <List /> */}
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </Context>
);
