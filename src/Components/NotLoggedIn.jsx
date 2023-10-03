import style from "../CSS/notloggedin.module.css";
import openAiLogo from "../assets/openAISvgLogo.svg";

const NotLoggedIn = ()=>{

    return(
        <main className={style.notLoggedInPage}>
            <div className={style.notLoggedInContainer}>
                <div className={style.openAIImgContainer}>
                    <img src={openAiLogo} alt="openAi" />
                </div>
                <h1 className={style.notLoggedInText}>You're Not Logged In</h1>
                <a href="/login">Click Here To Log In</a>
            </div>
        </main>
    )
}

export default NotLoggedIn;