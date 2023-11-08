import Navbar from "./Components/ui-components/navbar/Navbar";
import Footer from "./Components/ui-components/footer/Footer";
import { Outlet } from "react-router-dom";

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
