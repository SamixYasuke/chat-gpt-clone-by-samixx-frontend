// Chat.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { startNewConversation, decodeUserToken } from "../Utilities/userData";
import style from "../CSS/chat.module.css";
import openAISystem from "../assets/openAISystem.png";
import activeBtn from "../assets/chatbtnactive.png";
import hamburgerMenu from "../assets/icons8-hamburger-menu-50.png";
import addImg from "../assets/icons8-plus.svg";

const Chat = ({ toggleMobileNav }) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [userPrompts, setUserPrompts] = useState([]);
  const [systemResponses, setSystemResponses] = useState([]);
  const userToken = localStorage.getItem("user Token");
  const { conversationId, userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/conversation/${userId}/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = response.data;
        if (data.messages) {
          const prompts = data.messages
            .filter((message) => message.role === "user")
            .map((message) => message.content);
          const responses = data.messages
            .filter((message) => message.role === "system")
            .map((message) => message.content);

          setUserPrompts(prompts);
          setSystemResponses(responses);
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };
    fetchConversationData();
  }, [conversationId, userToken]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setUserPrompts((prevPrompts) => [...prevPrompts, userPrompt]);
    setSystemResponses((prevResponses) => [...prevResponses, "Typing..."]);
    setUserPrompt("");
    if (userPrompt.trim().length > 0) {
      try {
        const sendChat = await axios.post(
          `http://localhost:3000/sendMessage/${conversationId}`,
          {
            userPrompt: userPrompt,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const response = sendChat.data;
        setSystemResponses((prevResponses) => [
          ...prevResponses.slice(0, -1),
          response.message,
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  async function handleStartNewConversation() {
    try {
      const newConversationId = await startNewConversation(userToken);
      navigate(`/chat/${decodeUserToken(userToken)}/${newConversationId}`);
    } catch (error) {
      console.error("Error starting a new conversation:", error.message);
    }
  }

  return (
    <div className={style.chatContainer}>
      {userPrompts.length === 0 && systemResponses.length === 0 ? (
        <div className={style.emptyChat}>
          <h1>CONVERSATION IS EMPTY, BUT YOU CAN CHANGE THAT 😊</h1>
        </div>
      ) : (
        userPrompts.map((prompt, index) => (
          <div key={index} className={style.userContainer}>
            <div className={style.user}>
              <h4>HI</h4>
              <p>{prompt}</p>
            </div>
            {systemResponses[index] && (
              <div className={style.systemContainer}>
                <div className={style.system}>
                  <img src={openAISystem} alt="j" />
                  <p>{systemResponses[index]}</p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <div className={style.gap}></div>
      <form className={style.chatForm}>
        <div className={style.inputContainer}>
          <textarea
            onChange={(e) => setUserPrompt(e.target.value)}
            value={userPrompt}
            placeholder="Send a message"
          />
          <button
            className={
              userPrompt.trim().length === 0
                ? style.inactiveBtn
                : style.activeBtn
            }
            onClick={sendMessage}
            disabled={userPrompt.trim().length === 0}
          >
            <img src={activeBtn} alt="btn-active" />
          </button>
        </div>
      </form>
      <div className={style.chatMenuTop}>
        <img
          onClick={toggleMobileNav}
          className={style.mobileOpen}
          src={hamburgerMenu}
          alt="menu"
        />
        <p>Chat GPT Clone</p>
        <img
          onClick={handleStartNewConversation}
          className={style.mobileCreate}
          src={addImg}
          alt="add"
        />
      </div>
    </div>
  );
};

export default Chat;