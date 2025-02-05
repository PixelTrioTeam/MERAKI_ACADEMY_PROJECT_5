import "./App.css";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/login'





//===============================================================

const App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path="/login" element= {<Login/>}/>
    </Routes>
    </div>
  );
};

export default App;
