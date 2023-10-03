import SideBar from "../Components/SideBar";
import Chat from "../Components/Chat";
import style from "../CSS/conversation.module.css";
import NotLoggedIn from "../Components/NotLoggedIn";
import { useState } from "react";

const Conversation = ({ toggleMobileNav, mobileNavIsShown,  setMobileNavIsShown  }) => {
  const [chatData, setChatData] = useState(null);
  const updateChatData = (data)=>{
    setChatData(data)
  } 

  const userToken = localStorage.getItem("user Token");

  if (!userToken) {
    return <NotLoggedIn />;
  } else {
    return (
      <main className={style.conversationContainer}>
        <SideBar toggleMobileNav={toggleMobileNav} updateChatData={updateChatData} mobileNavIsShown={mobileNavIsShown} />
        <Chat data={chatData} toggleMobileNav={toggleMobileNav} mobileNavIsShown={mobileNavIsShown}/>
      </main>
    );
  }
};

export default Conversation;