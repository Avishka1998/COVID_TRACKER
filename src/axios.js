import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://covid19.mathdro.id/api",
});

export default axiosInstance;
