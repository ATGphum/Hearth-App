import { Flex, useOutsideClick, Text } from "@chakra-ui/react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const SettingsDrawer = ({ isOpen, onClose }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });
  const mounter = document.getElementById("appContainer");
  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <MotionFlex
        ref={ref}
        initial={{ y: "100%" }}
        animate={{
          y: isOpen ? "0%" : "100%",
        }}
        exit={{ y: "100%" }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 0.9 }}
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
        bottom="0rem"
        left="0"
        pb="10rem"
        overflowY={"auto"}
        display="flex"
        flexDirection="column"
        background="background.fleshOpaque"
        p={0}
        maxHeight={"100vh"}
        textAlign={"left"}
        zIndex={15}
        borderTopRadius="2rem"
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
            textStyle="body"
            p="0.75rem 1rem"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor="divider.flesh"
          >
            Manage Subscriptions
          </Text>
          <Text
            textStyle="body"
            p="0.75rem 1rem"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor="divider.flesh"
          >
            Terms and conditions
          </Text>
          <Text
            textStyle="body"
            p="0.75rem 1rem"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor="divider.flesh"
          >
            Log out
          </Text>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default SettingsDrawer;
