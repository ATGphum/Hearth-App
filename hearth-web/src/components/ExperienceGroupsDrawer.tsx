import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ExperienceGroupDrawer from "./ExperienceGroupDrawer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = motion(Flex);

const ExperienceGroupsDrawer = ({ isOpen, onClose }: Props) => {
  const {
    isOpen: experienceGroupDrawerIsOpen,
    onOpen: experienceGroupDrawerOnOpen,
    onClose: experienceGroupDrawerOnClose,
  } = useDisclosure();
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      overflow={"hidden"}
      position={"relative"}
      zIndex={5}
    >
      <AnimatePresence>
        {experienceGroupDrawerIsOpen && (
          <ExperienceGroupDrawer
            onClose={experienceGroupDrawerOnClose}
            isOpen={experienceGroupDrawerIsOpen}
          />
        )}
      </AnimatePresence>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{
          x: experienceGroupDrawerIsOpen ? "-50%" : isOpen ? "0%" : "100%",
        }}
        exit={{ x: "100%" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
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
      >
        <Flex
          direction="column"
          width="100%"
          display="flex"
          flexDirection="column"
          background="linear-gradient(175deg, #B694F7 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          p={"1rem"}
        >
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
            <Text textStyle="heading.h1">Connection Journeys</Text>
            <Text textStyle="body">
              Make connection time a meaningful habit.
            </Text>
            <Flex direction="column" gridRowGap="0.5rem" mt="0.5rem">
              <Flex
                justifyContent={"space-between"}
                p="1rem"
                bg="#F5E099"
                borderBottom="1px solid rgba(0, 0, 0, 0.60)"
                borderRadius="2.75rem"
                onClick={experienceGroupDrawerOnOpen}
              >
                <Text>3-Day Connection</Text> <ArrowRightIcon />
              </Flex>
              <Flex
                justifyContent={"space-between"}
                p="1rem"
                bg="#F5E099"
                borderBottom="1px solid rgba(0, 0, 0, 0.60)"
                borderRadius="2.75rem"
                onClick={experienceGroupDrawerOnOpen}
              >
                <Text>3-Day Connection</Text> <ArrowRightIcon />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default ExperienceGroupsDrawer;
