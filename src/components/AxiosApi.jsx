import axios from "axios";

// .env REACT_APP_API_BASE_URL=http://localhost:5000

const AxiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default AxiosApi;
