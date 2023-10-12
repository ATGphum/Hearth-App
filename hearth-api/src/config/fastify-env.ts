import dotenv from "dotenv";
dotenv.config();

const fastifyEnv = {
  port: isNaN(parseInt(process.env.PORT)) ? 8000 : parseInt(process.env.PORT),
  environment: process.env.NODE_ENV,
  database: {
    url: process.env.DATABASE_URL,
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
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeCouponCode: process.env.STRIPE_COUPON_CODE,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export default fastifyEnv;
