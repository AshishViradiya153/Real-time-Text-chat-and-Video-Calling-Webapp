import axios from "axios";
// import { logoutUser } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 5000,
});

customFetch.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log("🚀 ~ file: axios.js:19 ~ err", err);
    Promise.reject(err);
  }
);

export default customFetch;

// export const checkResponceCode = (exception) => {
//   const responceCode = exception?.responce?.status;
//   if (responceCode) {
//     (responceCode === 401 || responceCode === 403) &&
//       logoutUser("something wrong here");
//   }
//   console.log(
//     "🚀 ~ file: axios.js:26 ~ checkResponceCode ~ responceCode",
//     responceCode
//   );
// };
