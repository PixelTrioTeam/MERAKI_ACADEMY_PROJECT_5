import "./App.css";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/login'
import MoviesPage from './components/Series and movies page/moviesPage'
import Navbar from './components/Navbar/navBar'







//===============================================================

const App = () => {
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
};

export default App;
