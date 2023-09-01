import dotenv from "dotenv";
dotenv.config();

const fastifyEnv = {
  environment: process.env.NODE_ENV,
  database: {
    uri: process.env.DATABASE_URI,
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    hearthApi: {
      domain: process.env.AUTH0_DOMAIN,
      secret: process.env.AUTH0_SERVER_API_SECRET,
    },
    api: {
      audience: process.env.AUTH0_API_AUDIENCE,
    },
  },
  frontendHost: process.env.FRONTEND_HOST,
};

export default fastifyEnv;
