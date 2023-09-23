import { FastifyInstance, FastifyRequest } from "fastify";

import Stripe from "stripe";
import fastifyEnv from "../config/fastify-env";

const stripe = new Stripe(fastifyEnv.stripeSecretKey, { apiVersion: null });
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function PaymentsController(fastify: FastifyInstance) {
  fastify.post(
    "/payments/create-subscription",
    async (request: FastifyRequest) => {
      console.log(request);
      return stripe;
    }
  );
}
