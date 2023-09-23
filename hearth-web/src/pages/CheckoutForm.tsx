import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import viteEnv from "../config/vite-env";
import { Flex } from "@chakra-ui/react";
const stripePromise = loadStripe(viteEnv.stripePublishableKey);

function Checkout() {
  const [clientSecretSettings, setClientSecretSettings] = useState(
    "sk_test_51NtO7aGFPsayibi6rk1qDoyr3hV3uBiWIznNECpLtp6Z3oWonceGA8hOsEF1vS11vQ07jfveb4PGG143dQ6v3QfJ00MmlPg0QR"
  );

  //   useEffect(() => {
  //     setClientSecretSettings({
  //       clientSecret:
  //         ,
  //       loading: false,
  //     });
  //   }, []);

  return (
    <Flex height="100%" w="100%">
      asdf
      <div>
        <Elements
          stripe={stripePromise}
          //   options={{
          //     clientSecret: clientSecretSettings,
          //     appearance: { theme: "stripe" },
          //   }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </Flex>
  );
}

export default Checkout;

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};
