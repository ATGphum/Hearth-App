/* eslint-disable */
import fastify from "fastify";
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  }
}
