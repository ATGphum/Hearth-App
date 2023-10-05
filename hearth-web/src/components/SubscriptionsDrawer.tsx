import {
  Flex,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import ReactDOM from "react-dom";
import { CancelStripeSubscription } from "../core/api";
import { useCurrentUserProfile } from "../core/apiHooks";
import { SubscriptionType } from "../core/types";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Checkout from "../pages/CheckoutForm";
import BottomPopupDrawer from "./BottomPopupDrawer";
import ImageLogo from "./ImageLogo";
import viteEnv from "../config/vite-env";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const SubscriptionsDrawer = ({ isOpen, onClose }: Props) => {
  const { data: user, mutate: userMutate } = useCurrentUserProfile();
  const yearlySubscriptionId = viteEnv.stripeYearlyKey;
  const monthlySubscriptionid = viteEnv.stripeMonthlyKey;
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | undefined>();

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType>(
      user?.stripe_subscription_frequency === SubscriptionType.month.toString()
        ? SubscriptionType.month
        : SubscriptionType.year
    );

  const {
    isOpen: checkoutIsOpen,
    onOpen: checkoutOnOpen,
    onClose: checkoutOnClose,
  } = useDisclosure();

  const {
    isOpen: cancelDrawerIsOpen,
    onOpen: cancelDrawerOnOpen,
    onClose: cancelDrawerOnClose,
  } = useDisclosure();

  const mounter = document.getElementById("mounter");

  const checkCouponValid = async (enteredCouponCode: string) => {
    // const resp = await CheckCouponCode(coupon);
    // const valid = resp.data.isValid;
    const valid = enteredCouponCode === "EARLYUSER";
    if (valid) {
      setCoupon(true);
      setCouponMessage("6 Month free subscription code applied successfully");
    } else {
      setCoupon(false);
      setCouponMessage("Please enter a valid coupon");
    }
  };
  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        dragDirectionLock
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        drag="x"
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
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
        bg="background.fleshOpaque"
        p={0}
        minHeight={"100vh"}
        textAlign={"left"}
        zIndex={20}
      >
        <AnimatePresence>
          {checkoutIsOpen && (
            <Checkout
              onClose={checkoutOnClose}
              isOpen={checkoutIsOpen}
              priceId={
                selectedSubscription === SubscriptionType.month
                  ? monthlySubscriptionid
                  : yearlySubscriptionId
              }
              couponAdded={coupon}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {cancelDrawerIsOpen && (
            <BottomPopupDrawer
              text="Cancel Subscription"
              onClose={cancelDrawerOnClose}
              isOpen={cancelDrawerIsOpen}
              callback={async () => {
                await CancelStripeSubscription();
                cancelDrawerOnClose();
                userMutate();
              }}
            />
          )}
        </AnimatePresence>
        <Flex
          flex={1}
          direction="column"
          width="100%"
          background={
            "linear-gradient(180deg, #D4F8A8 0%, rgba(255, 249, 100, 0.00) 90.67%), radial-gradient(41.92% 85.12% at 100% 68.31%, rgba(0, 240, 255, 0.20) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(48.49% 83.29% at 0% 100%, rgba(255, 199, 0, 0.50) 0%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.30) 0%, rgba(0, 102, 255, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.32) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.10) 0%, rgba(252, 112, 68, 0.10) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.80) 0%, rgba(255, 223, 192, 0.80) 100%)"
          }
        >
          <Flex
            direction="column"
            alignItems={"center"}
            p="2rem"
            gridRowGap="1rem"
            flex={1}
            justifyContent={"center"}
          >
            <Flex maxH="4rem">
              <ImageLogo />
            </Flex>
            <Text textStyle="heading.h1" textAlign={"center"}>
              {user?.stripe_subscription_id
                ? "You are subscribed to Hearth."
                : "Subscribe to Hearth."}
            </Text>
            <UnorderedList textStyle="body">
              <ListItem>Access all experienes.</ListItem>
              <ListItem>Attend free live events.</ListItem>
              <ListItem>
                Get music & book recommendations, and much more to come...
              </ListItem>
            </UnorderedList>
          </Flex>
          <Flex
            direction="column"
            alignItems={"center"}
            p="2rem"
            pt="0rem"
            gridRowGap="1rem"
            flex={1}
          >
            <Flex width="100%" gap="1rem" flexWrap={"wrap"}>
              <Flex
                flex={1}
                bg="linear-gradient(180deg, #FFF964 0%, rgba(255, 249, 100, 0.00) 100%)"
                border="1px solid #000"
                borderWidth={
                  selectedSubscription === SubscriptionType.year
                    ? "3px"
                    : undefined
                }
                p="1.5rem"
                direction="column"
                borderRadius="0.75rem"
                justifyContent={"center"}
                maxH="10rem"
                onClick={() => setSelectedSubscription(SubscriptionType.year)}
              >
                <Text textStyle="heading.h3">Yearly</Text>
                <Text textStyle="heading.h2">$104.95</Text>
                <Text textStyle="bodySmall">($8.75/month)</Text>
                <Text textStyle="detailText" fontWeight={700} color="#C93A00">
                  Save $74
                </Text>
              </Flex>
              <Flex
                flex={1}
                bg="linear-gradient(180deg, #FFF964 0%, rgba(255, 249, 100, 0.00) 100%)"
                border="1px solid #000"
                borderWidth={
                  selectedSubscription === SubscriptionType.month
                    ? "3px"
                    : undefined
                }
                p="1.5rem"
                direction="column"
                borderRadius="0.75rem"
                justifyContent={"center"}
                maxH="10rem"
                onClick={() => setSelectedSubscription(SubscriptionType.month)}
              >
                <Text textStyle="heading.h3">Monthly</Text>
                <Text textStyle="heading.h2">$14.95</Text>
                <Text textStyle="bodySmall">($179.40/year)</Text>
                <Text textStyle="detailText" fontWeight={700} color="#C93A00">
                  Most flexible
                </Text>
              </Flex>
            </Flex>
            {user?.stripe_subscription_id &&
            user?.stripe_subscription_frequency !==
              selectedSubscription.toString() ? (
              <Flex
                p="1rem"
                width="100%"
                bg="linear-gradient(79deg, #F89587 0%, rgba(248, 149, 135, 0.00) 39.05%), linear-gradient(262deg, #A1E0D5 1.43%, rgba(208, 216, 192, 0.00) 45.77%), #FFC89C"
                justifyContent={"center"}
                borderRadius="0.75rem"
                border="1px solid #000"
                boxShadow={"0px 4px 2px 0px rgba(0, 0, 0, 0.60)"}
                direction="column"
                alignItems={"center"}
              >
                <Text textStyle="heading.h3">
                  Switch to{" "}
                  {selectedSubscription === SubscriptionType.month
                    ? "14.95/month"
                    : "104.95/year"}
                </Text>
              </Flex>
            ) : user?.stripe_subscription_id ? (
              <Flex
                p="1rem"
                width="100%"
                bg="linear-gradient(79deg, #F89587 0%, rgba(248, 149, 135, 0.00) 39.05%), linear-gradient(262deg, #A1E0D5 1.43%, rgba(208, 216, 192, 0.00) 45.77%), #FFC89C"
                justifyContent={"center"}
                borderRadius="0.75rem"
                border="1px solid #000"
                boxShadow={"0px 4px 2px 0px rgba(0, 0, 0, 0.60)"}
                direction="column"
                alignItems={"center"}
              >
                <Text textStyle="heading.h3">Your current plan</Text>
              </Flex>
            ) : (
              <Flex
                p="1rem"
                width="100%"
                bg="linear-gradient(79deg, #F89587 0%, rgba(248, 149, 135, 0.00) 39.05%), linear-gradient(262deg, #A1E0D5 1.43%, rgba(208, 216, 192, 0.00) 45.77%), #FFC89C"
                justifyContent={"center"}
                borderRadius="0.75rem"
                border="1px solid #000"
                boxShadow={"0px 4px 2px 0px rgba(0, 0, 0, 0.60)"}
                onClick={checkoutOnOpen}
                direction="column"
                alignItems={"center"}
              >
                <Text textStyle="action">
                  {user?.trial_completed
                    ? "Subscribe now"
                    : "Start your 7-day free trial"}
                </Text>
                <Text textStyle="fieldLabel">
                  {selectedSubscription === SubscriptionType.month
                    ? "14.95/month"
                    : "104.95/year"}
                  {!user?.trial_completed && "  after 7 days"}
                </Text>
              </Flex>
            )}
            {user?.stripe_subscription_id ? (
              <Text
                textStyle="body"
                color="brand.secondary"
                onClick={cancelDrawerOnOpen}
              >
                Cancel your subscription
              </Text>
            ) : (
              <Flex
                borderBottom={"0.5px solid"}
                borderColor={"accent.navy"}
                px="0.5rem"
                width="100%"
                mt="1rem"
              >
                <Input
                  className="ios-disable-highlight"
                  onChange={(e) => setCouponCode(e.target.value)}
                  width="100%"
                  background="none"
                  textStyle="fieldInput"
                  placeholder="Enter coupon code"
                />
                <Flex onClick={async () => checkCouponValid(couponCode)}>
                  <ArrowRightIcon />
                </Flex>
              </Flex>
            )}
            {couponMessage && <Text textStyle={"body"}>{couponMessage}</Text>}
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default SubscriptionsDrawer;
