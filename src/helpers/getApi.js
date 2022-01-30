import axios from "axios";

// const baseURL = process.env.REACT_APP_BACKEND_URL;
const baseURL = "https://hoodwink.medkomtek.net/api";

const getApi = axios.create({
  baseURL: baseURL,
});

export default getApi;
