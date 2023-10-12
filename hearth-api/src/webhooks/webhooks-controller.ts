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
export default async function WebhooksController(fastify: FastifyInstance) {
  // fastify.addHook('preParsing', async (request, reply, payload) => {
  //   if (request.headers['content-type'] === 'application/json') {
  //     let body: any[] = [];
  //     for await (const chunk of payload) {
  //       body.push(chunk);
  //     }
  //     const bodyBuffer = Buffer.concat(body);
  //     request.rawBody = bodyBuffer;
  //   }
  //   return payload;
  // });
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    function (req, body, done) {
      try {
        const newBody = {
          raw: body,
        };
        done(null, newBody);
      } catch (error) {
        error.statusCode = 400;
        done(error, undefined);
      }
    }
  );
  fastify.post(
    "/webhook/stripe-payments",
    async (
      request: FastifyRequest<{
        Body: { raw: Buffer };
      }>,
      reply: FastifyReply
    ) => {
      const webhookSecret = fastifyEnv.stripeWebhookSecret;
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event: Stripe.Event;
      const signature = request.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          request.body.raw,
          signature,
          webhookSecret
        );
      } catch (err) {
        fastify.log.error(`⚠️  Webhook signature verification failed.`);
        return reply.send({ success: false });
      }
      // Extract the object from the event.
      const dataObject = event.data.object;
      const eventType = event.type;

      switch (eventType) {
        case "checkout.session.completed":
          // Payment is successful and the subscription is created.
          // You should provision the subscription and save the customer ID to your database.
          console.log("don't hit");
          break;
        case "invoice.paid":
          // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case "invoice.payment_failed": {
          const obj = dataObject as Stripe.Invoice;
          // The payment failed or the customer does not have a valid payment method.
          // The subscription becomes past_due. Notify your customer and send them to the
          // customer portal to update their payment information.
          // We simply unlink their subscription object from their account, forcing them to create a new subscription

          //find customer and remove their subscription
          try {
            await fastify.prisma.user.update({
              where: { stripe_customer_id: obj.customer },
              data: { stripe_subscription_id: undefined },
            });
          } catch (error) {
            fastify.log.error(error);
            console.log(error);
          }
          break;
        }
        default:
        // Unhandled event type
      }

      return reply.send({ success: true });
    }
  );
}
