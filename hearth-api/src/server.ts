import Fastify from "fastify";
import UserController from "./users/users-controller.js";
import * as fastifyHooks from "./config/fastify-hooks.js";

// dotenv.config(); not needed for now as env variables are mapped to exported object

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

fastify.addHook("preHandler", fastifyHooks.drizzleConnecter);
fastify.addHook("onResponse", fastifyHooks.drizzleDestroyer);
fastify.register(UserController);

fastify.listen({ port: 8000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
