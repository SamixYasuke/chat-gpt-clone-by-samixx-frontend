// getUserDetails.js
import axios from "axios";

const userToken = localStorage.getItem("user Token");

const getUserDetails = async (setUserDetails) => { // Accept setUserDetails as a parameter
    try {
        const response = await axios.get("https://samixx-github-clone-backend.onrender.com/getuserdetail", {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        const details = response.data;
        setUserDetails(details); // Update user details state
        console.log({
            user: details
        });
    } catch (error) {
        console.log(error);
    }
};

export default getUserDetails;
