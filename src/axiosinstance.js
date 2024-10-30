import axios from "axios";
export const imgURL = "https://image.tmdb.org/t/p/original";
export const baseURL = "https://api.themoviedb.org/3";
export const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDA1MDU0YTdkMDIyYzdhYjgyYTZlNzYxMWQyMDg1NiIsIm5iZiI6MTcyOTA2OTIyNC4xNzA3MTMsInN1YiI6IjY3MGY3ZjBjMDQzMzFkYjRiMTEyNzgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qKtQjvZa_7Gmvjt3Cqw4GABmYUKJ1acIS2X8QWvXAF0";
const axiosInstance = axios.create({
  baseURL: baseURL,
});
// const accountId = 21574258;

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${apiKey}`;
    config.headers.Accept = `application/json`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      console.log("Не авторизован");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);
// запись для того, чтобы все запросы на сервер использовали токен пользователя

export default axiosInstance;
