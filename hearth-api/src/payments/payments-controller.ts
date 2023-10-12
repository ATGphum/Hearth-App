import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import Stripe from "stripe";
import fastifyEnv from "../config/fastify-env.js";
import { User } from "@prisma/client";

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
        Querystring: { priceId: string; couponAdded: string };
      }>,
      Reply: FastifyReply
    ) => {
      const { priceId, couponAdded } = request.query;
      const sub: string = request["user"]["sub"];

      let user: User = await fastify.prisma.user.findUnique({
        where: { username: sub },
      });

      if (!user.stripe_customer_id) {
        // if no strip customer id on user entry, create a new customer
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.first_name + " " + user.last_name,
        });
        user = await fastify.prisma.user.update({
          where: { id: user.id },
          data: { stripe_customer_id: customer.id },
        });
      }

      const customerId = user.stripe_customer_id;

      try {
        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment

        //if free trial has not been done before, provide it
        const coupon =
          couponAdded === "true" ? fastifyEnv.stripeCouponCode : undefined;

        let trialDays = 0;
        if (!user.trial_completed) trialDays = 7;
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
          trial_period_days: trialDays,
          coupon: coupon,
        });
        const invoice = subscription.latest_invoice as Stripe.Invoice;
        const paymentIntent =
          invoice.payment_intent as Stripe.PaymentIntent | null;
        let paymentIntentSecret = "";
        let mode = "payment";
        if (!paymentIntent) {
          // create setup intent
          const setupIntent = await stripe.setupIntents.create();
          paymentIntentSecret = setupIntent.client_secret;
          mode = "setup";
        } else {
          paymentIntentSecret = paymentIntent.client_secret;
        }
        const resp = {
          subscription_id: subscription.id,
          client_secret: paymentIntentSecret,
          frequency: subscription["plan"]["interval"],
          mode: mode,
        };
        return resp;
      } catch (error) {
        Reply.code(400).send({ error: { message: error.message } });
        return;
      }
    }
  );
  fastify.post(
    "/payments/link-subscription-to-user",
    async (
      request: FastifyRequest<{
        Querystring: { subscriptionId: string; frequency: string };
      }>,
      reply: FastifyReply
    ) => {
      const sub: string = request["user"]["sub"];
      const { subscriptionId, frequency } = request.query;

      //always set trial_completed to true upon first subscription creation or any subsequent subscription creation
      await fastify.prisma.user.update({
        where: { username: sub },
        data: {
          stripe_subscription_id: subscriptionId,
          stripe_subscription_frequency: frequency,
          trial_completed: true,
        },
      });
      return reply.send({ success: true });
    }
  );
  fastify.post(
    "/payments/cancel-stripe-subscription",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const sub: string = request["user"]["sub"];

      const user: User = await fastify.prisma.user.findUnique({
        where: { username: sub },
      });

      if (user.stripe_subscription_id) {
        try {
          await stripe.subscriptions.cancel(user.stripe_subscription_id);
        } catch (err) {
          fastify.log.error(err);
        }
        await fastify.prisma.user.update({
          where: { username: sub },
          data: {
            stripe_subscription_id: null,
          },
        });
        return reply.send({ success: true });
      }
      return reply.send({
        sucesss: false,
        message: `User with id ${user.username} does not have subscription`,
      });
    }
  );
  // fastify.get(
  //   "/payments/check-coupon-code",
  //   async (
  //     request: FastifyRequest<{ Querystring: { code: string } }>,
  //     reply: FastifyReply
  //   ) => {
  //     const code = request.query.code;

  //     try {
  //       const coupon = await stripe.coupons.retrieve(code);
  //       console.log(coupon);

  //       if (coupon.valid) {
  //         reply.send({ isValid: true, coupon });
  //       } else {
  //         reply.send({ isValid: false });
  //       }
  //     } catch (error) {
  //       // Stripe throws an error if the coupon doesn't exist
  //       if (error.type === "StripeInvalidRequestError") {
  //         reply.send({ isValid: false });
  //       } else {
  //         reply.code(500).send({ error: "Internal Server Error" });
  //       }
  //     }
  //   }
  // );
}
