import { useState, useContext } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
} from "../../service/redux/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  // state reducer
  const state = useSelector((reducer) => {
    return {
      authReducer: reducer.authReducer,
    };
  });
  const isLoggedIn = state.authReducer.isLoggedIn;
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  // function register
  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/user/register", {
        firstName,
        lastName,
        country,
        email,
        password,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  const clientId =
    "583658858550-mc1n9c3ha94v9n87ifut6kfdi4aanh2d.apps.googleusercontent.com";

  // sign up with google
  const handleLoginSuccess = async (response) => {
    // Here you will get the token and other user info
    console.log("Login successful:", response);
    // You can now send this token to your server for further processing (like creating a new user in your database)
    const token = response.credential;

    try {
      const result = await axios.post(
        `http://localhost:5000/user/loginGoogle`,
        { token: token },
        {
          header: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data) {
        setMessage("");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        if (isLoggedIn) {
          nav("/main");
        }
      } else throw Error;
    } catch (error) {
      console.log("error during login : ", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };
  return (
    <>
      <div className="background-image-register">
        <div className="register-container">
          <>
            <h3 className="sign-h3">Sign Up</h3>
            <form>
              <input
                className="input-register"
                placeholder="firstName"
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="lastName"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />{" "}
              <input
                className="input-register"
                placeholder="Counrty"
                type="text"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
              />{" "}
              <button className="sign_up" onClick={(e) => addNewUser(e)}>
                Sign Up{" "}
              </button>
              <br />
              <button
                className="sign_up_google"
                onClick={() => {
                  console.log("hi");
                  setShowGoogleLogin(true);
                }}
              >
                Sign Up With Google{" "}
                <svg
                  className="icon_google"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>{" "}
              </button>
              {status
                ? message && <div className="SuccessMessage">{message}</div>
                : message && <div className="ErrorMessage">{message}</div>}
              <br />
              {showGoogleLogin && (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login"
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  isLoggedIn={true}
                />
              )}
              <span style={{ fontFamily: "arial" }}>
                Return To The Home Page?
                <Link className="back_navbar" to={"/"}>
                  Click Here
                </Link>
              </span>
              <br />
              <span style={{ fontFamily: "arial" }}>
                You Have Any Account?
                <Link className="back_navbar" to={"/login"}>
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
