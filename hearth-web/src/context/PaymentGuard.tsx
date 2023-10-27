import { ReactNode, useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import viteEnv from "../config/vite-env";
import {
  LinkStripeSubscriptionToUser,
  UpdateStripeSubscription,
} from "../core/api";
import { useCurrentUserProfile } from "../core/apiHooks";
import { trackEvent } from "../core/analytics";

type Props = {
  children: ReactNode;
};

const PaymentGuard = ({ children }: Props) => {
  // Initialize Stripe.js using your publishable key
  const [stripe, setStripe] = useState<Stripe | null>(null);
  useEffect(() => {
    awaitStripe();
  }, []);
  const awaitStripe = async () => {
    const stripeObj = await loadStripe(viteEnv.stripePublishableKey);
    setStripe(stripeObj);
  };

  const { data: user, mutate: userMutate } = useCurrentUserProfile();

  // Retrieve the "payment_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const paymentIntentClientSecret = new URLSearchParams(
    window.location.search
  ).get("payment_intent_client_secret");
  const setupIntentClientSecret = new URLSearchParams(
    window.location.search
  ).get("setup_intent_client_secret");

  const subscriptionId = new URLSearchParams(window.location.search).get(
    "subscription_id"
  );
  const frequency = new URLSearchParams(window.location.search).get(
    "frequency"
  );

  const [message, setMessage] = useState<string | undefined>();
  const [showMessage, setShowMessage] = useState(false);

  const linkStripeSubscription = async (
    stripeSubscriptionId: string,
    frequency: string
  ) => {
    await LinkStripeSubscriptionToUser(stripeSubscriptionId, frequency);
    await userMutate();
  };

  const handleUpdatePaymentMethod = async () => {
    if (stripe) {
      // The setup was confirmed successfully, retrieve the setup intent
      const { setupIntent } = await stripe.retrieveSetupIntent(
        setupIntentClientSecret ?? ""
      );
      const paymentMethodId = setupIntent?.payment_method;

      await UpdateStripeSubscription(
        subscriptionId ?? "",
        typeof paymentMethodId === "string"
          ? paymentMethodId
          : paymentMethodId?.id ?? ""
      );
    }
  };

  useEffect(() => {
    if (
      stripe &&
      (paymentIntentClientSecret || setupIntentClientSecret) &&
      subscriptionId &&
      frequency
    ) {
      if (paymentIntentClientSecret) {
        // Retrieve the PaymentIntent
        stripe
          .retrievePaymentIntent(paymentIntentClientSecret)
          .then(({ paymentIntent }) => {
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
                  setMessage(
                    "Success! You now have full access to Hearth Experiences."
                  );
                  linkStripeSubscription(subscriptionId, frequency);
                  break;
                case "processing":
                  setMessage(
                    "Payment processing. Please check back in soon, and contact us if you have any queries"
                  );
                  break;

                case "requires_payment_method":
                  setMessage(
                    "Payment failed. Please try another payment method."
                  );
                  break;

                default:
                  setMessage("Something went wrong.");
                  break;
              }
              setShowMessage(true);
            }
          });
      } else if (setupIntentClientSecret) {
        stripe
          .retrieveSetupIntent(setupIntentClientSecret)
          .then(({ setupIntent }) => {
            // Inspect the PaymentIntent `status` to indicate the status of the payment
            // to your customer.
            //
            // Some payment methods will [immediately succeed or fail][0] upon
            // confirmation, while others will first enter a `processing` state.
            //
            // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
            if (setupIntent) {
              switch (setupIntent.status) {
                case "succeeded":
                  setMessage(
                    "Success! You now have full access to Hearth Experiences."
                  );
                  linkStripeSubscription(subscriptionId, frequency);
                  break;
                case "processing":
                  setMessage(
                    "Payment processing. Please check back in soon, and contact us if you have any queries"
                  );
                  break;

                case "requires_payment_method":
                  setMessage(
                    "Payment failed. Please try another payment method."
                  );
                  break;

                default:
                  setMessage("Something went wrong.");
                  break;
              }
              setShowMessage(true);
            }

            handleUpdatePaymentMethod();
          });
      }
      if (user)
        trackEvent({
          type: "Subscribe to hearth",
          plan: frequency,
          user_id: user.id,
          email: user.email,
          name: user.first_name ?? "" + user.last_name ?? "",
          partner_name:
            user.partner_first_name ?? "" + user.partner_last_name ?? "",
        });
    }
  }, [stripe]);

  return (
    <>
      {message && showMessage && (
        <Flex
          position="absolute"
          zIndex="30"
          top={0}
          bottom={0}
          right={0}
          left={0}
          onClick={() => setShowMessage(false)}
        >
          <Flex
            position="absolute"
            zIndex="30"
            top={"25%"}
            left={"50%"}
            transform="translate(-50%, -50%)"
            bg="neutral.white"
            p="1rem"
            direction="column"
            onClick={(e) => e.stopPropagation()}
          >
            {message}
          </Flex>
        </Flex>
      )}
      {children}
    </>
  );
};

export default PaymentGuard;
