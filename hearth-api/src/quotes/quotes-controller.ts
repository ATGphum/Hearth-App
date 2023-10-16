import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Quote } from "@prisma/client";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function QuotesController(fastify: FastifyInstance) {
  fastify.get(
    "/quotes/get-daily-quote",
    async (
      request: FastifyRequest<{
        Querystring: { priceId: string; couponAdded: string };
      }>,
      Reply: FastifyReply
    ) => {
      try {
        const quote: Quote = await fastify.prisma.quote.findFirst({
          where: { todays_quote: true },
        });
        return quote;
      } catch (error) {
        Reply.code(400).send({ error: { message: error.message } });
        return;
      }
    }
  );
}
