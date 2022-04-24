import axios from "axios";
import config from "config/config";

const notesApi = axios.create({
  baseURL: config.prod.apiEndpoint,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default notesApi;
