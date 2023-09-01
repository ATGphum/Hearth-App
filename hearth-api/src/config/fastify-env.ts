import dotenv from "dotenv";
dotenv.config();

const fastifyEnv = {
  environment: process.env.NODE_ENV,
  database: {
    uri: process.env.DATABASE_URI,
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_API_SECRET,
  },
  frontendHost: process.env.FRONTEND_HOST,
};

export default fastifyEnv;
