import { Flex, useOutsideClick, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useRef } from "react";
import ReactDOM from "react-dom";
import BottomPopupDrawer from "./BottomPopupDrawer";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const SettingsDrawer = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth0();
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });
  const {
    isOpen: closeDrawerIsOpen,
    onOpen: closeDrawerOnOpen,
    onClose: closeDrawerOnClose,
  } = useDisclosure();
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
              logout({
                logoutParams: { returnTo: window.location.origin },
              }).then(() => window.location.reload());
            }}
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
        overflowY={"auto"}
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
            >
              Terms and conditions
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
