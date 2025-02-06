import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {  
  const nav = useNavigate();

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => nav("/dashboard")}>Go to Dashboard</button> 
    </div>
  );
};

export default Login;
