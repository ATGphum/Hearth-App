const viteEnv = {
  environment: import.meta.env.VITE_ENV,
  api_host: import.meta.env.VITE_API_HOST,
  auth0: {
    domain: process.env.VOTE_AUTH0_DOMAIN,
    hearthWeb: {
      id: process.env.VITE_AUTH0_WEB_ID,
    },
  },
};

export default viteEnv;
