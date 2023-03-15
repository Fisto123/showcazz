import axios from "axios";

export const newRequest = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});
