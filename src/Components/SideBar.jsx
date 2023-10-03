// SideBar.js
import React, { useEffect, useState } from "react";
import style from "../CSS/sidebar.module.css";
import userProfileText from "../Utilities/userProfileText";
import deleteIcon from "../assets/delete-icon.svg";
import chatIcon from "../assets/chat-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  getConversationsForUser,
  startNewConversation,
  decodeUserToken,
  logOut,
} from "../Utilities/userData"; // Import API and utility functions

function SideBar({ toggleMobileNav, mobileNavIsShown }) {
  const userToken = localStorage.getItem("user Token");
  const [conversations, setConversations] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [popUpIsShown, setPopUpIsShown] = useState(false);
  const [sidebarIsShown, setSideBarIsShown] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user details
    async function fetchUserDetails() {
      try {
        const details = await getUserDetails(userToken);
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    // Function to fetch conversations for the user
    async function fetchConversations() {
      try {
        const userId = decodeUserToken(userToken);
        const conversations = await getConversationsForUser(userId, userToken);
        setConversations(conversations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setIsLoading(false);
      }
    }

    if (userToken) {
      fetchUserDetails();
      fetchConversations();
    }
  }, [userToken]);

  // Function to handle starting a new conversation
  async function handleStartNewConversation() {
    try {
      const newConversationId = await startNewConversation(userToken);
      navigate(`/chat/${decodeUserToken(userToken)}/${newConversationId}`);
      toggleMobileNav();
    } catch (error) {
      console.error("Error starting a new conversation:", error.message);
    }
  }

  const changeSideBar = () => {
    setSideBarIsShown(!sidebarIsShown);
  };

  const logOutHandler = () => {
    logOut(navigate);
  };

  return (
    <>
      <div className={style.openConversationDiv}>
        <button className={style.openConversationBtn} onClick={changeSideBar}>
          |
        </button>
      </div>
      <section
        className={
          sidebarIsShown
            ? style.sideSectionContainer
            : style.sideSectionContainerClosed
        }
      >
        <div className={style.sideSection}>
          <div className={style.sideSectionBtn1}>
            <button onClick={handleStartNewConversation}>+ New Chat</button>
            <button onClick={changeSideBar}>|</button>
          </div>
          <div className={style.sideSectionContent}>
            {isLoading ? (
              <p>Loading...</p>
            ) : conversations.length === 0 ? (
              <p>No Conversation for this user</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  onClick={() =>
                    navigate(
                      `/chat/${decodeUserToken(userToken)}/${
                        conversation.conversationId
                      }`
                    )
                  }
                  key={conversation._id}
                  className={style.sideSectionConversation}
                >
                  {conversation.messages.length > 0 ? (
                    <>
                      <img
                        className={style.sideSectionConversationChat}
                        src={chatIcon}
                        alt="chat"
                      />
                      <p>{conversation.messages[0]?.content?.slice(0, 15)}</p>
                      <img
                        className={style.sideSectionConversationDelete}
                        src={deleteIcon}
                        alt="delete"
                      />
                    </>
                  ) : (
                    <div className={style.newChat}>
                      <p>New Chat.....</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div
            onClick={() => setPopUpIsShown(!popUpIsShown)}
            className={style.sideSectionBtn2Container}
          >
            <div className={style.sideSectionBtn2}>
              <div>
                <h4>
                  {userDetails && userDetails.userEmail
                    ? userProfileText(userDetails.userEmail)
                    : "Loading..."}
                </h4>
              </div>
              <button className={style.sideSectionBtn2}>
                <h3>{userDetails.userEmail}</h3>
                <p>...</p>
              </button>
              {popUpIsShown && (
                <div className={style.sectionPopUp}>
                  <p onClick={logOutHandler}>Log Out</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div
        className={
          mobileNavIsShown
            ? style.sideSectionContainerMobileActive
            : style.sideSectionContainerMobile
        }
      >
        <div className={style.sideSection}>
          <div className={style.sideSectionBtn1}>
            <button onClick={handleStartNewConversation}>+ New Chat</button>
            <button onClick={toggleMobileNav}>|</button>
          </div>
          <div className={style.sideSectionContent}>
            {isLoading ? (
              <p>Loading...</p>
            ) : conversations.length === 0 ? (
              <p>No Conversation for this user</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  onClick={() =>
                    navigate(
                      `/chat/${decodeUserToken(userToken)}/${
                        conversation.conversationId
                      }`
                    )
                  }
                  key={conversation._id}
                  className={style.sideSectionConversation}
                >
                  {conversation.messages.length > 0 ? (
                    <>
                      <img
                        className={style.sideSectionConversationChat}
                        src={chatIcon}
                        alt="chat"
                      />
                      <p>{conversation.messages[0]?.content?.slice(0, 15)}</p>
                      <img
                        className={style.sideSectionConversationDelete}
                        src={deleteIcon}
                        alt="delete"
                      />
                    </>
                  ) : (
                    <div className={style.newChat}>
                      <p>New Chat.....</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div
            onClick={() => setPopUpIsShown(!popUpIsShown)}
            className={style.sideSectionBtn2Container}
          >
            <div className={style.sideSectionBtn2}>
              <div>
                <h4>
                  {userDetails && userDetails.userEmail
                    ? userProfileText(userDetails.userEmail)
                    : "Loading..."}
                </h4>
              </div>
              <button className={style.sideSectionBtn2}>
                <h3>{userDetails.userEmail}</h3>
                <p>...</p>
              </button>
              {popUpIsShown && (
                <div className={style.sectionPopUp}>
                  <p onClick={logOutHandler}>Log Out</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
