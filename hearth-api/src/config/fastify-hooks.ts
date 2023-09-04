import { FastifyReply, FastifyRequest } from "fastify";

export const auth0Verify = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // Verify the JWT token using the decorator
    await request.jwtVerify();
  } catch (error) {
    console.log(error);
    reply.code(401).send({ message: error.message });
  }
};

export const drizzleConnecter = async (request: FastifyRequest) => {};

// Close Drizzle instance when request is complete
export const drizzleDestroyer = async (request: FastifyRequest) => {
  if (request.queryClient) {
    request.queryClient.end();
  }
};
