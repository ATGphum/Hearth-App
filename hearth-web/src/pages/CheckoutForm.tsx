import { Flex, Text } from "@chakra-ui/react";
import {
  AddressElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { LazyMotion, domMax, m } from "framer-motion";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import viteEnv from "../config/vite-env";
import { CreatePaymentSubscription, UpdateCustomerAddress } from "../core/api";
import { SubscriptionDetail, paymentMode } from "../core/types";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import LoadingPage from "./LoadingPage";

const stripePromise = loadStripe(viteEnv.stripePublishableKey);

const MotionFlex = m(Flex);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  priceId: string;
  couponAdded: boolean;
}

const Checkout = ({ isOpen, onClose, priceId, couponAdded }: Props) => {
  const bg =
    "linear-gradient(180deg, #FFF964 0%, rgba(255, 249, 100, 0) 90.67%), radial-gradient(41.92% 85.12% at 100% 68.31%, rgba(0, 240, 255, 0.20) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(48.49% 83.29% at 0% 100%, rgba(255, 199, 0, 0.50) 0%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.30) 0%, rgba(0, 102, 255, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.32) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.10) 0%, rgba(252, 112, 68, 0.10) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.80) 0%, rgb(249, 225, 193) 100%)";
  const [subscriptionDetail, setSubscriptionDetail] = useState<
    SubscriptionDetail | undefined
  >();

  useEffect(() => {
    if (!subscriptionDetail) {
      const createSubscription = async () => {
        const { data: subscriptionDetail } = await CreatePaymentSubscription(
          priceId,
          couponAdded
        );
        setSubscriptionDetail(subscriptionDetail);
      };
      createSubscription();
    }
  }, []);

  return (
    <LazyMotion features={domMax}>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{
          x: isOpen ? "0%" : "100%",
        }}
        exit={{ x: "100%" }}
        drag={"x"}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 20 && info.offset.x > 50) {
            onClose();
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        overflowY={"auto"}
        direction="column"
        width="100%"
        display="flex"
        flexDirection="column"
        // background={"background.fleshOpaque"}
        zIndex={25}
        bg={bg}
      >
        {subscriptionDetail ? (
          <Flex
            height="fit-content"
            w="100%"
            p="1rem"
            // bg={bg}
            direction="column"
            gridRowGap="2rem"
          >
            <Flex onClick={onClose}>
              <ArrowLeftIcon />
            </Flex>
            <Flex direction="column">
              <Text textStyle="heading.h1XL">Today's amount</Text>
              <Text textStyle="heading.h2XL">
                ${subscriptionDetail.amount_in_cents / 100}{" "}
                {subscriptionDetail.currency.toUpperCase()}
              </Text>
            </Flex>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: subscriptionDetail?.client_secret,
                appearance: { theme: "stripe" },
              }}
            >
              <CheckoutForm subscription={subscriptionDetail} />
            </Elements>
          </Flex>
        ) : (
          <LoadingPage bg={bg} />
        )}
      </MotionFlex>
    </LazyMotion>
  );
};

export default Checkout;

const CheckoutForm = ({
  subscription,
}: {
  subscription: SubscriptionDetail;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsSubmitted(true);

    // Submit the payment details entered by the customer
    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.error(
        "An error occurred when validating card details",
        submitError
      );
      setIsSubmitted(false);
      return;
    }

    const addressElement = elements.getElement("address");

    addressElement?.getValue().then(async (response1) => {
      // Add the address to the customer first before paying
      await UpdateCustomerAddress(
        response1.value.address,
        subscription.subscription_id
      ).then(async (response2) => {
        if (response2.status === 200) {
          // it may be a setupIntent, not paymentIntent, try that
          if (subscription.mode === paymentMode.payment) {
            const { error } = await stripe.confirmPayment({
              //`Elements` instance that was used to create the Payment Element
              elements,
              clientSecret: subscription.client_secret ?? "",
              confirmParams: {
                return_url:
                  viteEnv.host +
                  "/?subscription_id=" +
                  subscription.subscription_id +
                  "&frequency=" +
                  subscription.frequency,
              },
            });
            if (error) setIsSubmitted(false);
          } else {
            const { error } = await stripe.confirmSetup({
              //`Elements` instance that was used to create the Payment Element
              elements,
              clientSecret: subscription.client_secret ?? "",
              confirmParams: {
                return_url:
                  viteEnv.host +
                  "/?subscription_id=" +
                  subscription.subscription_id +
                  "&frequency=" +
                  subscription.frequency,
              },
            });

            if (error) {
              console.error(error);
              setIsSubmitted(false);
            }
          }
        } else {
          console.error("Error updating address", response2.status);
          setIsSubmitted(false);
        }
      });
    });
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Flex direction="column" gridRowGap="1rem">
      <PaymentElement />
      <AddressElement options={{ mode: "billing" }} />
      <Flex
        mt="1rem"
        p="0.5rem"
        width="100%"
        bg="linear-gradient(79deg, #F89587 0%, rgba(248, 149, 135, 0.00) 39.05%), linear-gradient(262deg, #A1E0D5 1.43%, rgba(208, 216, 192, 0.00) 45.77%), #FFC89C"
        justifyContent={"center"}
        borderRadius="0.75rem"
        border="1px solid #000"
        boxShadow={"0px 4px 2px 0px rgba(0, 0, 0, 0.60)"}
        onClick={handleSubmit}
      >
        {stripe && elements && !isSubmitted && (
          <Text textStyle="action">Submit</Text>
        )}
        {isSubmitted && <Spinner />}
      </Flex>
    </Flex>
  );
};
