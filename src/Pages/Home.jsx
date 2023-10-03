import React from "react";
import SideBar from "../Components/SideBar";
import style from "../CSS/conversation.module.css";
import NotLoggedIn from "../Components/NotLoggedIn";
import hamburgerMenu from "../assets/icons8-hamburger-menu-50.png";
import addImg from "../assets/icons8-plus.svg";
import { decodeUserToken, startNewConversation } from "../Utilities/userData";

const Home = ({ toggleMobileNav }) => {
  const userToken = localStorage.getItem("user Token");

  async function handleStartNewConversation() {
    try {
      const newConversationId = await startNewConversation(userToken);
      navigate(`/chat/${decodeUserToken(userToken)}/${newConversationId}`);
    } catch (error) {
      console.error("Error starting a new conversation:", error.message);
    }
  }


  if (!userToken) {
    return <NotLoggedIn />;
  } else {
    return (
      <main className={style.conversationContainer}>
        <SideBar />
        <div className={style.newConvo}>
          <h1>START A NEW CHAT TO GET STARTED</h1>
        </div>
        <div className={style.chatMenuTop}>
        <img onClick={toggleMobileNav} className={style.mobileOpen} src={hamburgerMenu} alt="menu" />
        <p>Lorem ipsum dolor sit .</p>
        <img onClick={handleStartNewConversation} className={style.mobileCreate} src={addImg} alt="add" />
      </div>
      </main>
    );
  }
};

export default Home;
