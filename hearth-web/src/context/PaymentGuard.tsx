import { ReactNode, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import viteEnv from "../config/vite-env";

type Props = {
  children: ReactNode;
};

// Initialize Stripe.js using your publishable key
const stripe = await loadStripe(viteEnv.stripePublishableKey);

const PaymentGuard = ({ children }: Props) => {
  // Retrieve the "payment_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  useEffect(() => {
    if (stripe && clientSecret) {
      // Retrieve the PaymentIntent
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case "succeeded":
              // message.innerText = "Success! Payment received.";
              break;

            case "processing":
              // message.innerText =
              "Payment processing. We'll update you when payment is received.";
              break;

            case "requires_payment_method":
              //  message.innerText =
              "Payment failed. Please try another payment method.";
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              break;

            default:
              // message.innerText = "Something went wrong.";
              break;
          }
        }
      });
    }
  }, []);

  return <>{children}</>;
};

export default PaymentGuard;
