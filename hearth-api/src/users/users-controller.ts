import { FastifyInstance, FastifyRequest } from "fastify";
import { userPatchSchema, userResponseSchema } from "./users-serializers.js";
import { User } from "@prisma/client";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function UserController(fastify: FastifyInstance) {
  fastify.get(
    "/users/current-user",
    {
      schema: {
        response: {
          200: userResponseSchema,
        },
      },
    },
    async (request: FastifyRequest) => {
      const sub: string = request["user"]["sub"];
      const email: string =
        request["user"]["https://app.hearthtogether.com/email"];
      let user: User = await fastify.prisma.user.findUnique({
        where: { username: sub },
      });
      if (!user) {
        fastify.log.info(`creating new user for user ${sub}`);
        user = await fastify.prisma.user.create({
          data: { username: sub, email: email },
        });
      }
      //temporary code, remove a week after initial release
      if (!user.email) {
        await fastify.prisma.user.update({
          where: { id: user.id },
          data: { email: email },
        });
      }
      return user;
    }
  );
  fastify.patch(
    "/users/:userId",
    {
      schema: {
        body: userPatchSchema,
        response: {
          200: userResponseSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{
        Params: { userId: string };
        Body: Partial<User>;
      }>
    ) => {
      const { userId } = request.params;
      const body = request.body;
      request.getValidationFunction("body")(body);
      const user = await fastify.prisma.user.update({
        where: { id: parseInt(userId) },
        data: body,
      });
      return user;
    }
  );
}
