import { Flex, useOutsideClick } from "@chakra-ui/react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRef } from "react";
import ReactDOM from "react-dom";
import FormButton from "./FormButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
  buttonOneText?: string;
  callback: () => void;
}

const MotionFlex = m(Flex);

const BottomPopupDrawer = ({ isOpen, onClose, callback }: Props) => {
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
        onDragEnd={(_, info) => {
          if (info.velocity.y > 0) {
            onClose();
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        right="0"
        bottom="0rem"
        left="0"
        overflowY={"auto"}
        display="flex"
        flexDirection="column"
        background="linear-gradient(180deg, hsla(17, 99%, 48%, 1) 0%, rgba(190, 230, 255, 0.00) 100%);"
        p={"2rem"}
        textAlign={"left"}
        zIndex={15}
        borderTopRadius="3rem"
        alignItems="center"
      >
        <Flex width="100%" direction={"column"} textAlign="center">
          <FormButton text="Log out" callback={callback} />
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default BottomPopupDrawer;
