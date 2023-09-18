import { Flex, useOutsideClick } from "@chakra-ui/react";
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
  const mounter = document.getElementById("mounter");
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
        top="17%"
        right="0"
        bottom="-10rem"
        left="0"
        overflowY={"auto"}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
        background="background.fleshOpaque"
        p={0}
        maxHeight={"100vh"}
        textAlign={"left"}
        zIndex={15}
      ></MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default SettingsDrawer;
