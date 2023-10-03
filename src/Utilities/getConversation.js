// getConversation.js
import axios from "axios";
import { decodeUserToken } from "./decodeToken";

const userToken = localStorage.getItem("user Token");
const userId = decodeUserToken(userToken);

const getConversation = async (setConversations) => { // Accept setConversations as a parameter
    try {
        const response = await axios.get(`https://samixx-github-clone-backend.onrender.com/conversations/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        const data = response.data;
        setConversations(data); // Update conversations state
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

export default getConversation;
