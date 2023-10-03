import axios from "axios";

// Function to get user details
export async function getUserDetails(userToken) {
  try {
    const response = await axios.get("http://localhost:3000/getuserdetail", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

// Function to get conversations for the user
export async function getConversationsForUser(userId, userToken) {
  try {
    const response = await axios.get(`http://localhost:3000/conversations/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const updatedConversations = response.data;

    updatedConversations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return updatedConversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}

// Function to start a new conversation
export async function startNewConversation(userToken) {
  try {
    const response = await axios.post(
      "http://localhost:3000/startConversation",
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data.conversationId;
  } catch (error) {
    console.error("Error starting a new conversation:", error.message);
    throw error;
  }
}

// utils.js
export function decodeUserToken(userToken) {
    try {
      const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
      return tokenPayload.userId;
    } catch (error) {
      console.error("Error decoding user token:", error);
      return null;
    }
} 

// utils.js
export function logOut(navigate) {
  localStorage.removeItem("user Token"); // Corrected key
  navigate("/login");
}
