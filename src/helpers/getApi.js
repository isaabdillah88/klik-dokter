import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = process.env.REACT_APP_BACKEND_URL;
const baseURL = "https://hoodwink.medkomtek.net/api";

let headers = {};
const token = Cookies.get("x-klikdokter-token");

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const getApi = axios.create({
  baseURL: baseURL,
  headers,
});

export default getApi;
