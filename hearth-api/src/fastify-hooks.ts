import { FastifyRequest } from "fastify";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
//add options as an argument after fastify if necessary
export default async function FastifyHooks(fastify) {
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    const queryClient = postgres("postgres://user:pass@localhost:5432/db");
    const db: PostgresJsDatabase = drizzle(queryClient);
    request.queryClient = queryClient;
    request.db = db;
  });

  // Close Drizzle instance when request is complete
  fastify.addHook("onResponse", async (request) => {
    if (request.queryClient) {
      request.queryClient.end();
    }
  });
}
