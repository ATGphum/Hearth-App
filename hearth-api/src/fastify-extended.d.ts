/* eslint-disable */
import fastify from "fastify";
declare module "fastify" {
  interface FastifyRequest {
    queryClient: postgres.Sql;
    db: PostgresJsDatabase;
  }
}
