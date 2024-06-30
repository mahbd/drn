import axios from "axios";
import { getJwt, refreshAccessToken } from "@/store/authService";

if (getJwt()) {
  axios.defaults.headers.common["authorization"] = "Bearer " + getJwt();
}

axios.interceptors.response.use(
  (res) => {
    // Todo: Start loading animation when called
    return res;
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (getJwt() && error.response && error.response.status === 401) {
      refreshAccessToken();
      // ToDo: Retry the request
      return Promise.reject(error);
    }

    if (!expectedError) {
      console.log("Logging the error", error);
      alert("An unexpected error.");
    }
    // Todo: Stop loading animation when called
    return Promise.reject(error);
  },
);

axios.interceptors.request.use((config) => {
  // Todo: Stop loading animation when called
  return config;
});

export default axios;
