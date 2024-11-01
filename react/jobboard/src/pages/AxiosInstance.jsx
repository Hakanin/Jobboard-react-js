import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // If you're using jwtDecode for token management

// Create an instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800',  // Set your base API URL
});

//Instance that handles the request that needs an authorization/authentification 
//And handles the refresh of the invalid accessToken
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let currentDate = new Date();

    console.log("Checking token expiry...");
    
    if (user && user.accessToken) {
      const decodedToken = jwtDecode(user.accessToken);

      console.log("Token expiration:", decodedToken.exp * 1000);
      
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          console.log("Token expired. Refreshing...");
        // Refresh token
          const res = await axios.post("http://localhost:8800/refresh", { token: user.refreshToken });

          const newTokens = {
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,  // Ensure refreshToken is updated too
          };

          localStorage.setItem("user", JSON.stringify(newTokens)); // Update localStorage
          config.headers["authorization"] = "Bearer " + res.data.accessToken;

        } catch (refreshError) {
          console.error("Refresh token expired or invalid")
          localStorage.removeItem("user")
          window.location.href = "/Login"
          return Promise.reject(refreshError)
        }   
      } else {
        config.headers["authorization"] = "Bearer " + user.accessToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
