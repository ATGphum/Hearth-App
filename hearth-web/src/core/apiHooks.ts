import useSWR from "swr";
import { User } from "./types";

export function useCurrentUserProfile() {
  return useSWR<User>(`/v1/users/current-user`);
}
