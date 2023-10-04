import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { trackEvent } from "../core/analytics";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import BottomPopupDrawer from "./BottomPopupDrawer";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const SettingsDrawer = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth0();
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    isOpen: closeDrawerIsOpen,
    onOpen: closeDrawerOnOpen,
    onClose: closeDrawerOnClose,
  } = useDisclosure();

  const {
    isOpen: termsDrawerIsOpen,
    onOpen: termsDrawerOnOpen,
    onClose: termsDrawerOnClose,
  } = useDisclosure();

  const {
    isOpen: policyDrawerIsOpen,
    onOpen: policyDrawerOnOpen,
    onClose: policyDrawerOnClose,
  } = useDisclosure();

  useOutsideClick({
    ref: ref,
    handler: !termsDrawerIsOpen && !policyDrawerIsOpen ? onClose : undefined,
  });

  const mounter = document.getElementById("appContainer");

  if (!mounter) return null;

  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <AnimatePresence>
        {closeDrawerIsOpen && (
          <BottomPopupDrawer
            onClose={closeDrawerOnClose}
            isOpen={closeDrawerIsOpen}
            callback={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });

              // Amplitude track event
              trackEvent({ type: "Logout" });
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {termsDrawerIsOpen && (
          <TermsAndConditionsPage
            onClose={termsDrawerOnClose}
            isOpen={termsDrawerIsOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {policyDrawerIsOpen && (
          <PrivacyPolicyPage
            isOpen={policyDrawerIsOpen}
            onClose={policyDrawerOnClose}
          />
        )}
      </AnimatePresence>
      <MotionFlex
        ref={ref}
        initial={{ y: "100%" }}
        animate={{
          y: isOpen ? "0%" : "100%",
        }}
        exit={{ y: "100%" }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 1 }}
        onDragEnd={(_, info) => {
          if (info.velocity.y > 0) {
            console.log("closing");
            onClose();
          }
        }}
        drag="y"
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="-20rem"
        left="0"
        overflowY={termsDrawerIsOpen ? "hidden" : "auto"}
        display="flex"
        background="background.fleshOpaque"
        p={0}
        textAlign={"left"}
        zIndex={10}
        borderTopRadius="2rem"
        alignItems="center"
      >
        <Flex
          h="100%"
          w="100%"
          bg="radial-gradient(41.92% 85.12% at 100% 68.31%, rgba(0, 240, 255, 0.20) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(48.49% 83.29% at 0% 100%, rgba(255, 199, 0, 0.50) 0%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.30) 0%, rgba(0, 102, 255, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.32) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.10) 0%, rgba(252, 112, 68, 0.10) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.80) 0%, rgba(255, 223, 192, 0.80) 100%)"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            mt="0.5rem"
            mb="1rem"
            h="0.3rem"
            w="2rem"
            bg="accent.brown"
            borderRadius="10px"
          />
          <Flex direction="column" textAlign={"left"} width="100%">
            <Text
              textStyle="action"
              p="0.75rem 1rem"
              borderBottom="1px solid"
              borderColor="divider.flesh"
            >
              Manage Subscriptions
            </Text>
            <Text
              textStyle="action"
              p="0.75rem 1rem"
              borderBottom="1px solid"
              borderColor="divider.flesh"
              onClick={termsDrawerOnOpen}
            >
              Terms and conditions
            </Text>
            <Text
              textStyle="action"
              p="0.75rem 1rem"
              borderBottom="1px solid"
              borderColor="divider.flesh"
              onClick={policyDrawerOnOpen}
            >
              Privacy Policy
            </Text>
            <Text
              textStyle="action"
              p="0.75rem 1rem"
              borderBottom="1px solid"
              borderColor="divider.flesh"
              onClick={closeDrawerOnOpen}
            >
              Log out
            </Text>
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default SettingsDrawer;
