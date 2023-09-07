import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import UserController from "./users/users-controller.js";
import fastifyAuth0Verify from "fastify-auth0-verify";
import cors from "@fastify/cors";
import corsObj from "./config/fastify-cors.js";
import fastifyEnv from "./config/fastify-env.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
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
    try {
      // Verify the JWT token using the decorator
      await request.jwtVerify();
    } catch (error) {
      fastify.log.error(error);
      reply.code(401).send({ message: error.message });
    }
  }
);

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
