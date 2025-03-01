import * as amplitude from "@amplitude/analytics-browser";
import viteEnv from "../config/vite-env";

export const initialiseAnalytics = () => {
  amplitude.init(viteEnv.amplitude_key, {
    defaultTracking: {
      attribution: false,
      pageViews: false,
      sessions: true,
      formInteractions: false,
      fileDownloads: false,
    },
  });
};

//----------------------------------------------
// Types of events captured
//----------------------------------------------

interface JourneyExperience {
  journey_name: string;
  experience_name: string;
}

export interface SignedUp {
  type: "Sign Up";
}

// // Page view events
// export interface ViewToday {
//   type: "View Today Page";
// }

// export interface ViewLibrary {
//   type: "View Library Page";
// }

// export interface ViewProfile {
//   type: "View Profile Page";
// }

// Click Events
// export interface ClickUpNext extends JourneyExperience {
//   type: "Click Up Next";
//   from: string;
// }

// export interface CloseMusicDrawer extends JourneyExperience {
//   type: "Close Music Drawer";
// }

// export interface ClickPlayButton extends JourneyExperience {
//   type: "Click Play Button";
//   play: boolean;
// }

// export interface ClickRewindButton extends JourneyExperience {
//   type: "Click Rewind Button";
//   forward: boolean;
// }

// export interface ClickConnectionJourneys {
//   type: "Click Connection Journeys";
// }

// export interface ClickJourney {
//   type: "Click Journey";
//   journey_name: string;
// }

// export interface ClickExperience {
//   type: "Click Experience";
//   experience_name: string;
// }

// export interface ClosePage {
//   type: "Close Page";
//   page_type: string;
// }

// export interface ClickMenuBar {
//   type: "Click Menu Bar";
// }

// export interface Logout {
//   type: "Logout";
// }

export interface LandOnIOSPopupBrowser {
  type: "Land on IOS popup browser";
}

export interface LandOnAndroidPopupBrowser {
  type: "Land on Android popup browser";
}

export interface LandOnSafariBrowser {
  type: "Land on IOS Safari Browser";
}

export interface LandOnChromeBrowser {
  type: "Land on Android Chrome Browser";
}

export interface LandOnDesktopBrowser {
  type: "Land on Desktop browser";
}

export interface SubmittedUserInformationForm {
  type: "Submitted user information form";
  user_id: number;
  email: string;
  name: string;
  partner_name: string;
}

export interface StartExperience extends JourneyExperience {
  type: "Start Experience";
  user_id: number;
  email: string;
  name: string;
  partner_name: string;
}

export interface CompleteExperience extends JourneyExperience {
  type: "Complete Experience";
  user_id: number;
  email: string;
  name: string;
  partner_name: string;
}

export interface Subscribe {
  type: "Subscribe to hearth";
  plan: string;
  user_id: number;
  email: string;
  name: string;
  partner_name: string;
}

export type AnalyticsEvent =
  | StartExperience
  | CompleteExperience
  | LandOnIOSPopupBrowser
  | LandOnAndroidPopupBrowser
  | LandOnSafariBrowser
  | LandOnChromeBrowser
  | LandOnDesktopBrowser
  | SubmittedUserInformationForm
  | Subscribe;
// | ViewToday
// | ViewLibrary
// | ViewProfile
// | ClickUpNext
// | CloseMusicDrawer
// | ClickPlayButton
// | ClickRewindButton
// | ClickConnectionJourneys
// | ClickJourney
// | ClosePage
// | ClickExperience
// | ClickMenuBar
// | Logout;

// Function to track the event to use across the app
export const trackEvent = (event: AnalyticsEvent) => {
  const { type, ...otherProperties } = event;
  amplitude.track(type, otherProperties);
};
