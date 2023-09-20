import * as amplitude from "@amplitude/analytics-browser";
import viteEnv from "../config/vite-env";

export const initialiseAnalytics = () => {
  amplitude.init(viteEnv.amplitude_key);
};

//----------------------------------------------
// Types of events captured
//----------------------------------------------

export interface SignedUp {
  type: "Sign Up";
}

// Page view events
export interface ViewToday {
  type: "View Today Page";
}

export interface ViewLibrary {
  type: "View Library Page";
}

export interface ViewProfile {
  type: "View Profile Page";
}

export type AnalyticsEvent = SignedUp;

// Function to track the event to use across the app
export const trackEvent = (event: AnalyticsEvent) => {
  const { type, ...otherProperties } = event;
  amplitude.track(type, otherProperties);
};
