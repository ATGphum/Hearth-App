import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import viteEnv from "../config/vite-env";
import { SubscriptionDetail, User, UserExperience } from "./types";

axios.defaults.baseURL = viteEnv.apiHost;
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
  config?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  const accessToken = window.localStorage.getItem("acAccessToken") ?? "";

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

export const CreatePaymentSubscription = (priceId: string) => {
  return request<SubscriptionDetail>(
    `/v1/payments/create-subscription?priceId=${priceId}`,
    "GET"
  );
};

export const LinkStripeSubscriptionToUser = (
  subscriptionId: string,
  frequency: string
) => {
  return request(
    `/v1/payments/link-subscription-to-user?subscriptionId=${subscriptionId}&frequency=${frequency}`,
    "POST"
  );
};

export const CancelStripeSubscription = () => {
  return request(`/v1/payments/cancel-stripe-subscription`, "POST");
};
