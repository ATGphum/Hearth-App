// converts seconds into MM:SS or M:SS if minutes is in single digits
export function formatTime(inputSeconds: number) {
  const seconds = Math.round(inputSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// eg converts "2023-09-18T05:05:29.470Z" into "September 18, 2023"
export function formatDate(inputDateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(inputDateString);

  // Define options for formatting the output date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the Date object into the desired output format
  const formattedDate = inputDate.toLocaleDateString(undefined, options);

  return formattedDate;
}

// returns whether its installable on iphone, or whether its accessed on browser
export function getInstallableStatus():
  | "desktop"
  | "installable"
  | "non-installable" {
  const userAgent = window.navigator.userAgent;

  // Check if the user agent contains "iPhone" but not "Safari" (non-Safari iOS browsers)
  const isIOSNonSafari =
    /(iPhone|iPod|iPad)/i.test(userAgent) && !/Safari/.test(userAgent);
  if (isIOSNonSafari) return "non-installable";

  // Check if the user agent contains "Safari" (Safari browser on iOS)
  const isSafariIOS =
    /Safari/.test(userAgent) && /(iPhone|iPod|iPad)/i.test(userAgent);
  if (isSafariIOS) {
    if (isIOSWebView()) {
      return "non-installable";
    } else {
      return "installable";
    }
  }

  // Check if it's an Android device
  const isAndroid = /Android/.test(userAgent);
  if (isAndroid) {
    if (isAndroidBrowser()) {
      return "installable";
    } else {
      return "non-installable";
    }
  }

  return "desktop";
}

function isIOSWebView() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  // Check if it's an iOS device
  if (/iphone|ipad|ipod/.test(userAgent)) {
    // Check for specific WebView keywords
    if (
      /applewebkit/.test(userAgent) && // Check for WebKit engine
      !/safari/.test(userAgent) && // Check for absence of "safari"
      !/fxios/.test(userAgent) && // Check for absence of "fxios" (Firefox on iOS)
      !/crios/.test(userAgent) // Check for absence of "crios" (Chrome on iOS)
    ) {
      return true; // It's likely a WebView on iOS
    }
  }

  return false; // It's not a WebView on iOS
}

function isAndroidBrowser() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  // Check if it's an Android device
  if (/android/.test(userAgent)) {
    // Check if it's not a WebView or known popup browsers
    if (
      !/wv|webview|gsa|yabrowser|puffin|ucbrowser|opr|fxios|edgios|vivaldi|brave|focus|konqueror/.test(
        userAgent
      )
    ) {
      return true; // It's an Android device in a standard mobile browser
    }
  }

  return false; // It's not an Android device in a standard mobile browser
}

export function IsStandalone(): boolean {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  } else {
    return false;
  }
}
