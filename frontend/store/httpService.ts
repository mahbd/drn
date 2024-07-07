import axios from "axios";
import { getJwt, refreshAccessToken } from "@/store/authService";

if (getJwt()) {
  axios.defaults.headers.common["authorization"] = "Bearer " + getJwt();
}

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (getJwt() && error.response && error.response.status === 401) {
      refreshAccessToken();
      return Promise.reject(error);
    }

    if (!expectedError) {
      console.log("Logging the error", error);
      alert("An unexpected error.");
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use((config) => {
  return config;
});

export default axios;
