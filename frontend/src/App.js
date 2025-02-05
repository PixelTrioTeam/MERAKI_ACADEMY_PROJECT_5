import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomPage from './components/WelcomePage/welcomePage'
import Slider from './components/WelcomePage/slider'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/index'





//===============================================================

const App = () => {
  return (
    <div className="App">
      <WelcomPage/>
      <Slider/>
    <Routes>
      <Route path="/login" element= {<Login/>}/>
    </Routes>
    </div>
  );
};

export default App;
