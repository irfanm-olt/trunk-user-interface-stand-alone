import axios from "axios";

export default axios.create({
  baseURL: "http://139.59.74.104:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});