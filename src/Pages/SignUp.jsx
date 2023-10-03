import { useState } from "react";
import style from "../CSS/signup.module.css";
import openAILogo from "../assets/openAISvgLogo.svg";
import { useNavigate } from "react-router-dom";
import axios from"axios";

const Register = ()=>{
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [emailFormatIsWrong, setEmailFormatIsWrong] = useState(false);
    const [passwordLengthIsShort, setPasswordLengthIsShort] = useState(false);
    const [buttonIsActive, setButtonIsActive] = useState(false);
    const [emailIsUsed, setEmailIsUsed] = useState(false);
    const navigate = useNavigate();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const signUpUser = async(e)=>{
        e.preventDefault();
        setButtonIsActive(true);
        const emailIsCorrect = (userEmail.match(emailRegex)) ? true : false;

        if(!emailIsCorrect){
            setButtonIsActive(false)
            setEmailFormatIsWrong(!emailIsCorrect);
            console.log(emailIsCorrect)
            return
        }

        if(userPassword.length <= 5){
            setButtonIsActive(false)
            setPasswordLengthIsShort(true);
            console.log(userPassword.length)
            return
        }

        const data = {
            userEmail : userEmail,
            userPassword : userPassword
        }
        try {
            const postUser = await axios.post("http://localhost:3000/registeruser", data);
            if(postUser.status === 201){
                alert("Registered Successfully, you'll be redirected to the Login Page")
                navigate("/login");
            }
        } catch (error) {
            setButtonIsActive(false)
            console.log(error.message);
            if(error.response.status === 400){
                setEmailIsUsed(true);
            }
        }
    }


    return(
        <>
            <main className={style.registerPage}>
                <div className={style.logoDiv}>
                    <img className={style.logo} src={openAILogo} alt="openAI" />
                </div>
                <div className={style.registerPageText}>
                    <h2>Create your account</h2>
                    <div className={style.registerPageTextP}>
                        <p>
                            Note that phone verification may 
                            be required for signup. Your number
                            will only be used to verify your 
                            identity for security purposes.
                        </p>
                    </div>
                </div>
                <form className={style.registerPageForm}>
                    {
                        emailIsUsed && <p style={{color : "red", textAlign: "start"}}>This Email Address Has Been Used By Anothe User!!!</p>
                    }
                    <input onChange={(e)=>{setUserEmail(e.target.value)}} type="email" placeholder="Email Address"/>
                    {
                        emailFormatIsWrong && <p style={{color : "red", textAlign: "start"}}>Enter a valid Email address!!!</p>
                    }
                    <input onChange={(e)=>{setUserPassword(e.target.value)}} type="password" placeholder="PassWord"/>
                    {
                        passwordLengthIsShort && <p style={{color : "red", textAlign: "start"}}>PassWord Is too short!!!</p>
                    }
                    <button onClick={signUpUser} disabled={buttonIsActive}>
                        {buttonIsActive ? "Registering..." : "Continue"}
                    </button>
                    <div>
                        <p>Already have an account? 
                            <span>
                                <a href="/login">Log In</a>
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
    )
}

export default Register;