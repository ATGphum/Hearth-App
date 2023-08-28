import Fastify from "fastify";
import UserController from "./users/users_controller.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

fastify.register(UserController);

fastify.listen({ port: 8000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
