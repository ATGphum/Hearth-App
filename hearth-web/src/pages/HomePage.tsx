import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import Library from "./Library";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Today from "./Today";
import { loadStripe } from "@stripe/stripe-js";
import viteEnv from "../config/vite-env";

const stripe = await loadStripe(viteEnv.stripePublishableKey);

function HomePage() {
  const [page, setPage] = useState(0);

  // Initialize Stripe.js using your publishable key

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

  return (
    <LayoutNoRedirect
      hidePadding
      bg={
        page === 1
          ? "linear-gradient(175deg, #FFBE7E 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          : undefined
      }
    >
      <Flex direction="column" flex="1" width="100%">
        {page === 0 && (
          <Flex direction="column" flex="1" width="100%">
            <Today />
          </Flex>
        )}
        {page === 1 && (
          <Flex direction="column" flex="1" width="100%">
            <Library />
          </Flex>
        )}
        {page === 2 && (
          <Flex direction="column" flex="1" width="100%">
            <Profile />
          </Flex>
        )}
      </Flex>
      <NavBar
        selectedPage={page}
        tabChange={(pageNumber: number) => {
          setPage(pageNumber);
        }}
      />
    </LayoutNoRedirect>
  );
}

export default HomePage;
