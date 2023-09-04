import { FastifyRequest, FastifyReply } from "fastify";
import fastifyEnv from "../config/fastify-env.js";
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function UserController(fastify) {
  fastify.get(
    "/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request);
      return fastifyEnv.database.uri;
    }
  );
}
