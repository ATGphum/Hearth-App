import fastifyEnv from "./fastify-env.js";

const corsObj = {
  origin: [fastifyEnv.frontendHost], // Adjust to your React app's URL
  methods: ["GET", "POST", "DELETE", "PATCH"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Enable sending cookies and other credentials
};

export default corsObj;
