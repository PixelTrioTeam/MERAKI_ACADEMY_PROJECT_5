import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomPage from './components/WelcomePage/welcomePage'
import Slider from './components/WelcomePage/slider'
import 'bootstrap/dist/css/bootstrap.min.css';




//===============================================================

const App = () => {
  return (
    <div className="App">
      <WelcomPage/>
      <Slider/>
    
    </div>
  );
};

export default App;
