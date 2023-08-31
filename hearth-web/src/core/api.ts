import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import reactEnv from "../config/react-env";

axios.defaults.baseURL = reactEnv.api_host;
axios.defaults.headers.post["Content-Type"] = "application/json";

const client = axios.create();
// client.interceptors.response.use((originalResponse) => {
//   handleDates(originalResponse.data);
//   return originalResponse;
// });

// A wrapper for axios.requests, which adds auth

export const request = <T>(
  url: string,
  method: Method,
  config?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  // const accessToken = window.localStorage.getItem("acAccessToken");
  const accessToken = "asdf";

  if (accessToken == null) {
    const error = Error("No access token available");

    // Attach extra info to the error object.
    // eslint-disable-next-line
    // @ts-ignore
    error.code = 403;
    throw error;
  }

  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };

  const result = client.request<T>({
    url,
    method,
    headers,
    ...config,
  });

  // // log user out if 401
  // result.catch(
  //   (e) =>
  //     e.response.status === 401 &&
  //     (window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}`)
  // );

  return result;
};

export const getUser = () => {
  return request<object>(`/v1/users/`, "GET");
};
