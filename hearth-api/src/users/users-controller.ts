import { FastifyRequest, FastifyReply } from "fastify";
import fastifyEnv from "../config/fastify-env.js";
import { userResponseSchema } from "./users-serializers.js";
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
      return null;
    }
  );
  fastify.get(
    "/users/current-user",
    {
      schema: {
        response: {
          200: userResponseSchema,
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const sub: string = request["user"]["sub"];
      let user = await fastify.prisma.user.findUnique({
        where: { username: sub },
      });
      if (!user) {
        fastify.log.info(`creating new user for user ${sub}`);
        user = await fastify.prisma.user.create({ data: { username: sub } });
      }
      return user;
    }
  );
}
