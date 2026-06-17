import axios from "axios";

const API = axios.create({
  baseURL: "https://aliha-backend.vercel.app/",
});

// SIGNUP
export const signupUser = (data) => API.post("/signup", data);

// LOGIN
export const loginUser = (data) => API.post("/login", data);