import useSWR from "swr";
import { Journey, User } from "./types";

export function useCurrentUserProfile() {
  return useSWR<User>(`/v1/users/current-user`);
}

export function useJourneys() {
  return useSWR<Journey[]>(`/v1/courses/journeys`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
