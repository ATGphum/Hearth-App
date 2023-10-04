import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import SettingsDrawer from "../components/SettingsDrawer";
import { useCurrentUserProfile } from "../core/apiHooks";
import { formatDate } from "../core/helpers";
import SubscriptionsDrawer from "../components/SubscriptionsDrawer";
import { trackEvent } from "../core/analytics";

const MotionFlex = m(Flex);

function Profile() {
  const {
    isOpen: settingsDrawerIsOpen,
    onOpen: settingsDrawerOnOpen,
    onClose: settingsDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: subscriptionsIsOpen,
    onOpen: subscriptionsOnOpen,
    onClose: subscriptionsOnClose,
  } = useDisclosure();
  const { data: user } = useCurrentUserProfile();
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      overflow={"hidden"}
      position={"relative"}
    >
      <AnimatePresence>
        {subscriptionsIsOpen && (
          <SubscriptionsDrawer
            onClose={subscriptionsOnClose}
            isOpen={subscriptionsIsOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {settingsDrawerIsOpen && (
          <SettingsDrawer
            onClose={settingsDrawerOnClose}
            isOpen={settingsDrawerIsOpen}
            subscriptionsOnOpen={subscriptionsOnOpen}
          />
        )}
      </AnimatePresence>
      <LazyMotion features={domMax}>
        <MotionFlex
          drag={"y"}
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 0 }}
          transition={{ damping: 300 }}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          overflowY={"auto"}
          direction="column"
          width="100%"
          flex="1"
          p="1rem"
          pt="0rem"
          gridRowGap="1rem"
          justifyContent={"center"}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gridRowGap="2rem"
          >
            {user && (
              <Flex direction="column" gridRowGap="0.5rem">
                <Text
                  textStyle="heading.h1XL"
                  px="3rem"
                  lineHeight={"3rem"}
                  fontWeight={300}
                >
                  {user.first_name}{" "}
                  <Text as="span" textStyle="heading.h2XL">
                    and
                  </Text>{" "}
                  {user.partner_first_name}
                </Text>
                <Text textStyle="heading.h4">
                  Joined {formatDate(user.date_joined)}
                </Text>
              </Flex>
            )}
            <Flex
              onClick={() => {
                settingsDrawerOnOpen();

                // Amplitude track event
                trackEvent({ type: "Click Menu Bar" });
              }}
              justifyContent={"center"}
              className="ios-disable-highlight"
              flexDirection={"column"}
              gridRowGap="0.3rem"
            >
              <Flex bg="neutral.black" h="0.2rem" w="1.5rem" />
              <Flex bg="neutral.black" h="0.2rem" w="1.5rem" />
              <Flex bg="neutral.black" h="0.2rem" w="1.5rem" />
            </Flex>
          </Flex>
        </MotionFlex>
      </LazyMotion>
    </Flex>
  );
}

export default Profile;
