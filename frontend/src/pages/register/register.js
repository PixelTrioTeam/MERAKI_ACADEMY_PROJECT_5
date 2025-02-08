import { useState, useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  //   // invoke about context store
  //   const { setHideOrShowHome, setHideAndShowNavbar } = useContext(aboutContext);
  //   // delcare navigate =>
  //   const navigate = useNavigate();
  //   // declare statues for information users
  //   const [userName, setUserName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [university, setUniversity] = useState("");
  //   const [universityMajor, setUniversityMajor] = useState("");
  //   // declare statues for information company
  //   const [companyName, setCompanyName] = useState("");

  //   // declare state for change the company and user register
  //   const [changeToCompany, setChangeToCompany] = useState(true);

  //   //   declare state message the login
  //   const [message, setMessage] = useState("");

  //   //   declare state show success for login user
  //   const [success, setSuccess] = useState(false);

  return (
    <>
      <div className="background-image-register">
        <div className="register-container">
          <>
            <h3 className="sign-h3">Sign Up</h3>
            <form>
              <input
                className="input-register"
                placeholder="UserName"
                type="text"
                onChange={(e) => {}}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Email"
                type="email"
                onChange={(e) => {}}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Password"
                type="password"
                onChange={(e) => {}}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Counrty"
                type="text"
                onChange={(e) => {}}
                required
              />{" "}
              <button className="sign_up">Sign Up </button>
              {/* {message && (
                  <h3 className={success ? "success" : "failed"}>
                    {message}!!
                  </h3>
                )} */}
              <span style={{ fontFamily: "arial" }}>
                Return To The Home Page?
                <Link className="back_navbar" to={"/"}>
                  Click Here
                </Link>
              </span>
            </form>
          </>
        </div>
      </div>
    </>
  );
};

export default Register;
