import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import viteEnv from "../config/vite-env";
import { User, UserExperience } from "./types";

axios.defaults.baseURL = viteEnv.api_host;
axios.defaults.headers.post["Content-Type"] = "application/json";

const client = axios.create();
// client.interceptors.response.use((originalResponse) => {
//   handleDates(originalResponse.data);
//   return originalResponse;
// });

// A wrapper for axios.requests, which adds auth

export const request = async <T>(
  url: string,
  method: Method,
  token?: string,
  config?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  const accessToken = token
    ? token
    : window.localStorage.getItem("acAccessToken") ?? "";

  if (accessToken == null || accessToken === "") {
    const error = Error("No access token available");

    // Attach extra info to the error object.
    // eslint-disable-next-line
    // @ts-ignore
    error.code = 403;
    throw error;
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

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
  //     (window.location.href = `https://${viteEnv.auth0.domain}/v2/logout?client_id=${viteEnv.auth0.hearthWeb.id}`)
  // );

  return result;
};

export const getUser = () => {
  return request<User>(`/v1/users`, "GET");
};

export const patchUser = (id: number, user: Partial<User>) => {
  return request<User>(`/v1/users/${id}`, "PATCH", { data: user });
};

export const createUserExperience = (
  userExperience: Partial<UserExperience>,
  last_in_course?: boolean,
  parent_course_id?: number
) => {
  let urlSuffix = "";
  if (last_in_course && parent_course_id)
    urlSuffix = `?last_in_course=true&parent_course_id=${parent_course_id}`;
  return request<User>(`/v1/courses/experiences${urlSuffix}`, "POST", {
    data: userExperience,
  });
};
