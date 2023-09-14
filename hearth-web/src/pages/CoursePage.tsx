import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  motion,
} from "framer-motion";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import MusicDrawer from "../components/MusicDrawer";
import ReactDOM from "react-dom";
import { Journey } from "../core/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openedJourney: Journey;
}

const MotionFlex = motion(Flex);
const CoursePage = ({ isOpen, onClose, openedJourney }: Props) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const mounter = document.getElementById("mounter");
  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 0) {
            onClose();
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex={10}
        background={` linear-gradient(175deg, ${openedJourney.color} 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)`}
        p="1rem"
        display={"flex"}
        direction={"column"}
      >
        <AnimatePresence>
          {drawerIsOpen && (
            <MusicDrawer onClose={drawerOnClose} isOpen={drawerIsOpen} />
          )}
        </AnimatePresence>
        <Flex onClick={onClose}>
          <ArrowLeftIcon />
        </Flex>
        <Flex direction="column" textAlign={"center"} gridRowGap="1rem">
          <Image
            m="1rem"
            height="8rem"
            src={
              "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
            }
            objectFit={"contain"}
          />
          <Text textStyle="heading.h1">{openedJourney.name}</Text>
          <Text textStyle="body" textAlign="center">
            {openedJourney.description}
          </Text>
          <Flex direction="column" gridRowGap="0.5rem" mt="0.5rem">
            <Flex
              justifyContent={"space-between"}
              p="1rem"
              bg="#F5E099"
              borderBottom="1px solid rgba(0, 0, 0, 0.60)"
              borderRadius="2.75rem"
              onClick={drawerOnOpen}
            >
              <Text>Introduction</Text> <ArrowRightIcon />
            </Flex>
            <Flex
              justifyContent={"space-between"}
              p="1rem"
              bg="#F5E099"
              borderBottom="1px solid rgba(0, 0, 0, 0.60)"
              borderRadius="2.75rem"
              onClick={drawerOnOpen}
            >
              <Text>3-Day Connection</Text> <ArrowRightIcon />
            </Flex>
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default CoursePage;
