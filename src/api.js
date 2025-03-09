import axios from "axios";

const API = axios.create({
  baseURL:"https://invoice-portal-backend-5v8h.onrender.com"// "http://localhost:5000", // Backend URL
  //baseURL:"http://localhost:5000",
});

export default API;
