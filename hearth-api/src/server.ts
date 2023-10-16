import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import UserController from "./users/users-controller.js";
import fastifyAuth0Verify from "fastify-auth0-verify";
import cors from "@fastify/cors";
import corsObj from "./config/fastify-cors.js";
import fastifyEnv from "./config/fastify-env.js";
import CoursesController from "./courses/courses-controller.js";
import PaymentsController from "./payments/payments-controller.js";
import WebhooksController from "./webhooks/webhooks-controller.js";
import QuotesController from "./quotes/quotes-controller.js";
import prisma from "./prisma.js";
import "./quotes/quotes-cron.js";

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify: FastifyInstance = Fastify({
  logger: true,
});

// attach prisma object to fastify
fastify.decorate("prisma", prisma);

// register cors
fastify.register(cors, corsObj);

// Set up the fastify-auth0-verify plugin
fastify.register(fastifyAuth0Verify, {
  domain: fastifyEnv.auth0.domain,
  audience: fastifyEnv.auth0.api.audience,
});

// verify auth0 token
fastify.addHook(
  "onRequest",
  async (request: FastifyRequest, reply: FastifyReply) => {
    // ignore validation if webhook is hit
    if (request.url.startsWith("/v1/webhook")) {
      return;
    }
    try {
      // Verify the JWT token using the decorator
      await request.jwtVerify();
    } catch (error) {
      fastify.log.error(error);
      reply.code(401).send({ message: error.message });
    }
  }
);

const globalRequestObject = { prefix: "/v1" };

fastify.register(WebhooksController, globalRequestObject);
fastify.register(UserController, globalRequestObject);
fastify.register(CoursesController, globalRequestObject);
fastify.register(PaymentsController, globalRequestObject);
fastify.register(QuotesController, globalRequestObject);

fastify.listen(
  { port: fastifyEnv.port, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  }
);
