import Navbar from "./Components/ui-components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Components/ui-components/footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />

      {location.pathname !== "/sign-up" && location.pathname !== "/login" && (
        <Footer />
      )}
    </>
  );
}

export default App;
