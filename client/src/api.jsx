import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const getHabits = () => API.get("/api/habits");
export const createHabit = (habitData) => API.post("/api/habits", habitData);
export const deleteHabit = (id) => API.delete(`/api/habits/${id}`);
