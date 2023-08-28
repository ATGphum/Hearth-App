import { FastifyRequest } from "fastify";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzleConnecter = async (request: FastifyRequest) => {
  const queryClient = postgres("postgres://user:pass@localhost:5432/db");
  const db: PostgresJsDatabase = drizzle(queryClient);
  request.queryClient = queryClient;
  request.db = db;
};

// Close Drizzle instance when request is complete
export const drizzleDestroyer = async (request: FastifyRequest) => {
  if (request.queryClient) {
    request.queryClient.end();
  }
};
