import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/navBar";
import Footer from "../../components/Footer/Footer";

export default function Main() {
  return (
    <div>
      <header style={{ width: "1536px" }}>
        <Navbar />
      </header>
     
      <main>
        <Outlet />
      </main>
      <footer >
      <Footer/>
      </footer>
    </div>
  );
}
