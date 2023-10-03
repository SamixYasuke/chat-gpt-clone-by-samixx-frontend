import { useState } from "react";
import style from "../CSS/login.module.css";
import axios from "axios";
import openAILogo from "../assets/openAISvgLogo.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [userEmail, setUserEmail] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [userNotExist, setUserNotExist] = useState(false);
  const [passwordNotValid, setPasswordNotValid] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const [fieldsNotComplete, setFieldsNotComplete] = useState(false);
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setUserNotExist(false);
    setPasswordNotValid(false);
    setLogInError(false);
    setFieldsNotComplete(false);

    const data = {
      userEmail: userEmail,
      userPassWord: userPassWord,
    };
    const emailIsEntered = userEmail.length > 0 ? true : false;
    const passwordIsEntered = userPassWord.length > 0 ? true : false;
    if (emailIsEntered && passwordIsEntered) {
      setButtonIsActive(true);
      try {
        const logUser = await axios.post("http://localhost:3000/loginuser", data);
        localStorage.setItem("user Token", logUser.data.token);
        console.log(logUser.data);
        setButtonIsActive(false);
        // Redirect to the home page (the `/` route) on successful login
        navigate("/");
      } catch (error) {
        setButtonIsActive(false);
        console.log(error.message);
        if (error.response.status === 404) {
          setUserNotExist(true);
        } else if (error.response.status === 401) {
          setPasswordNotValid(true);
        } else if (error.response.status === 500) {
          setLogInError(true);
        }
      }
    } else {
      setFieldsNotComplete(true);
    }
  };

  return (
    <>
      <main className={style.registerPage}>
        <div className={style.logoDiv}>
          <img className={style.logo} src={openAILogo} alt="openAI" />
        </div>
        <div className={style.registerPageText}>
          <h2>Enter your password</h2>
        </div>
        {userNotExist && <p style={{ color: "red" }}>The Login Details You Provided don't belong to any User</p>}
        {passwordNotValid && <p style={{ color: "red" }}>You've provided an Invalid Password!!!</p>}
        {logInError && <p style={{ color: "red" }}>An Unexpected Login Error has Occurred!!!, Please Try Again</p>}
        {fieldsNotComplete && <p style={{ color: "red" }}>Complete All Fields!!!!</p>}
        <form className={style.registerPageForm}>
          <input onChange={(e) => setUserEmail(e.target.value)} type="email" placeholder="Email Address" />
          <input onChange={(e) => setUserPassWord(e.target.value)} type="password" placeholder="PassWord" />
          <button onClick={loginUser} disabled={buttonIsActive}>
            {buttonIsActive ? "Logging..." : "Continue"}
          </button>
          <div>
            <p>
              Don't have an account?{" "}
              <span>
                <a href="/signup">Sign Up</a>
              </span>
            </p>
          </div>
        </form>
        <div className={style.termsandpolicyDiv}>
          <a href="/#">Terms Of Use</a>
          <p>|</p>
          <a href="#">Privacy Policy</a>
        </div>
      </main>
    </>
  );
};

export default Login;