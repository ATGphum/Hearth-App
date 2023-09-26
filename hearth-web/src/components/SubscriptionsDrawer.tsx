import {
  Flex,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import ReactDOM from "react-dom";
import ImageLogo from "./ImageLogo";
import { useState } from "react";
import { SubscriptionType } from "../core/types";
import Checkout from "../pages/CheckoutForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const SubscriptionsDrawer = ({ isOpen, onClose }: Props) => {
  const yearlySubscriptionId = "price_1NtP9JGFPsayibi6odqpOHIl";
  const monthlySubscriptionid = "price_1NtP9JGFPsayibi6WqZ95p8u";
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType>(SubscriptionType.monthly);

  const {
    isOpen: checkoutIsOpen,
    onOpen: checkoutOnOpen,
    onClose: checkoutOnClose,
  } = useDisclosure();

  const mounter = document.getElementById("mounter");
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
                selectedSubscription === SubscriptionType.monthly
                  ? monthlySubscriptionid
                  : yearlySubscriptionId
              }
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
              Subscribe to Hearth.
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
                  selectedSubscription === SubscriptionType.yearly
                    ? "3px"
                    : undefined
                }
                p="1.5rem"
                direction="column"
                borderRadius="0.75rem"
                justifyContent={"center"}
                maxH="10rem"
                onClick={() => setSelectedSubscription(SubscriptionType.yearly)}
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
                  selectedSubscription === SubscriptionType.monthly
                    ? "3px"
                    : undefined
                }
                p="1.5rem"
                direction="column"
                borderRadius="0.75rem"
                justifyContent={"center"}
                maxH="10rem"
                onClick={() =>
                  setSelectedSubscription(SubscriptionType.monthly)
                }
              >
                <Text textStyle="heading.h3">Monthly</Text>
                <Text textStyle="heading.h2">$14.95</Text>
                <Text textStyle="bodySmall">($179.40/year)</Text>
                <Text textStyle="detailText" fontWeight={700} color="#C93A00">
                  Most flexible
                </Text>
              </Flex>
            </Flex>
            <Flex
              p="1rem"
              width="100%"
              bg="linear-gradient(79deg, #F89587 0%, rgba(248, 149, 135, 0.00) 39.05%), linear-gradient(262deg, #A1E0D5 1.43%, rgba(208, 216, 192, 0.00) 45.77%), #FFC89C"
              justifyContent={"center"}
              borderRadius="0.75rem"
              border="1px solid #000"
              boxShadow={"0px 4px 2px 0px rgba(0, 0, 0, 0.60)"}
              onClick={checkoutOnOpen}
            >
              <Text textStyle="action">Confirm</Text>
            </Flex>
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default SubscriptionsDrawer;
