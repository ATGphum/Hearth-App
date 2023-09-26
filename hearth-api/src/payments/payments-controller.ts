import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import Stripe from "stripe";
import fastifyEnv from "../config/fastify-env.js";

const stripe = new Stripe(fastifyEnv.stripeSecretKey, { apiVersion: null });
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function PaymentsController(fastify: FastifyInstance) {
  fastify.get(
    "/payments/create-subscription",
    async (
      request: FastifyRequest<{
        Querystring: { priceId: string };
      }>,
      Reply: FastifyReply
    ) => {
      const { priceId } = request.query;

      // if no customer id on user entry, create a new customer
      const customer = await stripe.customers.create({
        email: "jeremyvuong.dshs@gmail.com",
        name: "Jeremy Vuong",
      });

      const customerId = customer.id;

      try {
        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [
            {
              price: priceId,
            },
          ],
          payment_behavior: "default_incomplete",
          payment_settings: { save_default_payment_method: "on_subscription" },
          expand: ["latest_invoice.payment_intent"],
        });
        const invoice = subscription.latest_invoice as Stripe.Invoice;
        const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

        return {
          subscription_id: subscription.id,
          client_secret: paymentIntent.client_secret,
        };
      } catch (error) {
        Reply.code(400).send({ error: { message: error.message } });
        return;
      }
    }
  );
}
