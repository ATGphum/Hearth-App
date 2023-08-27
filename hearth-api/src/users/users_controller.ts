import { FastifyRequest, FastifyReply } from "fastify";
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function UserController(fastify, options) {
  fastify.get(
    "/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).send({ success: true });
      // but this gives a type error
      reply.code(200).send("uh-oh");
      // it even works for wildcards
      reply.code(404).send({ error: "Not found" });
      return `logged in!`;
    }
  );
}
