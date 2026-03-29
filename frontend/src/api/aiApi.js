import axios from "axios";

const API = axios.create({
  baseURL: "https://flow-ai-backend-qmu8.onrender.com/api",
  timeout: 10000,
});

// Ask AI
export const askAI = (data) => API.post("/ask-ai", data);

// Save Data
export const saveAIData = (data) => API.post("/save", data);