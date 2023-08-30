import dotenv from "dotenv";
dotenv.config();

const fastifyEnv = {
  environment: process.env.NODE_ENV,
  database: {
    uri: process.env.DATABASE_URI,
  },
};

export default fastifyEnv;
