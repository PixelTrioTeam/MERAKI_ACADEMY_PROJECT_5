import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/navBar";

export default function Main (){
    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}