/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function UserController(fastify, options) {
  fastify.get("/users", async (request, reply) => {
    return { hello: "world" };
  });
}
