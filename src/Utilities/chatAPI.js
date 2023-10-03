// chatApi.js
import axios from "axios";

export async function fetchConversationData(userId, conversationId, userToken) {
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

      return { prompts, responses };
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
}

export async function sendMessage(userPrompt, conversationId, userToken) {
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
    return response.message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}