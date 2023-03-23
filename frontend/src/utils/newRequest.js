import axios from "axios";

export const newRequest = axios.create({
  baseURL: "https://showcazzz.onrender.com/",
  withCredentials: true,
});
