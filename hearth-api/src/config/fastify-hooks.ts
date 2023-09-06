import { FastifyReply, FastifyRequest } from "fastify";

export default async function FastifyHooks(fastify) {
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
}
