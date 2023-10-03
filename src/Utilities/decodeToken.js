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