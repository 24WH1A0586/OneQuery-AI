import axios from "axios";

const API = axios.create({
  baseURL: "https://onequery-ai.vercel.app/"
});

export const askQuestion = (question) =>
  API.post("/ask", { question });
