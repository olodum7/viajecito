import Navbar from "./components/ui-components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/ui-components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
}

export default App;
