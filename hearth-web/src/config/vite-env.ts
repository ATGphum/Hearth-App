const viteEnv = {
  environment: import.meta.env.VITE_ENV,
  apiHost: import.meta.env.VITE_API_HOST,
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN ?? "",
    scope: import.meta.env.VITE_AUTH0_SCOPE ?? "",
    hearthWeb: {
      id: import.meta.env.VITE_AUTH0_WEB_ID ?? "",
    },
    api: {
      audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
    },
  },
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
};

export default viteEnv;
