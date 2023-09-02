import Fastify from "fastify";
import UserController from "./users/users-controller.js";
import * as fastifyHooks from "./config/fastify-hooks.js";
import fastifyAuth0Verify from "fastify-auth0-verify";
import cors from "@fastify/cors";
import corsObj from "./config/castify-cors.js";
import fastifyEnv from "./config/fastify-env.js";

// dotenv.config(); not needed for now as env variables are mapped to exported object

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

// register cors
fastify.register(cors, corsObj);

// Set up the fastify-auth0-verify plugin
fastify.register(fastifyAuth0Verify, {
  domain: fastifyEnv.auth0.domain,
  audience: fastifyEnv.auth0.api.audience,
});

fastify.addHook("onRequest", fastifyHooks.auth0Verify);

// add db lifecycle objects to request objects
fastify.decorateRequest("queryClient", null);
fastify.decorateRequest("db", null);
fastify.addHook("preHandler", fastifyHooks.drizzleConnecter);
fastify.addHook("onResponse", fastifyHooks.drizzleDestroyer);

fastify.register(UserController, { prefix: "/v1" });

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
