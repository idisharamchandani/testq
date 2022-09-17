import axios from "axios";

// const API_URL = "/";



const login = (Email, Password) => {
  return axios
    .post("http://localhost:8000/login", {
      Email,
      Password,
    })
    .then((response) => {
      if (response.data.jwtoken && response.data.isAdmin) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;