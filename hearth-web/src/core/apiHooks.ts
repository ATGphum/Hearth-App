import useSWR from "swr";
import { Category, Journey, Quote, User } from "./types";

export function useCurrentUserProfile() {
  return useSWR<User>(`/v1/users/current-user`);
}

export function useDailyQuote() {
  return useSWR<Quote>(`/v1/quotes/get-daily-quote`);
}

// no automatic revalidation as latest experience hook
// is built off of this call, and finishing an experience
// will make the current viewed experience become the next
// one before the experience completion screen can be appreciated
export function useJourneys() {
  return useSWR<Journey[]>(`/v1/courses/journeys`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}

export function useCategories() {
  return useSWR<Category[]>(`/v1/courses/categories`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
