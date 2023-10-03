import React from "react";
import { useNavigate } from "react-router-dom"; // Import 'useNavigate'
import SideBar from "../Components/SideBar";
import style from "../CSS/conversation.module.css";
import NotLoggedIn from "../Components/NotLoggedIn";
import addImg from "../assets/icons8-plus.svg";
import { decodeUserToken, startNewConversation } from "../Utilities/userData";

const Home = () => {
  const userToken = localStorage.getItem("user Token");

  const navigate = useNavigate(); // Add this line to get the 'navigate' function

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
          <h1 onClick={handleStartNewConversation}>CLICK ME TO START A NEW CONVERSATION</h1> 
        </div>
        <div className={style.chatMenuTop}>
          <p>Chat GPT Clone By Samuel</p>
          <img
            onClick={handleStartNewConversation}
            className={style.mobileCreate}
            src={addImg}
            alt="add"
          />
        </div>
      </main>
    );
  }
};

export default Home;
