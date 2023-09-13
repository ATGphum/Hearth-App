import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useSwipeable } from "react-swipeable";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ExperienceGroupDrawer from "./ExperienceGroupDrawer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceGroupsDrawer = ({ isOpen, onClose }: Props) => {
  const swipeClose = useSwipeable({
    onSwipedRight: () => onClose(),
  });

  const {
    isOpen: experienceGroupDrawerIsOpen,
    onOpen: experienceGroupDrawerOnOpen,
    onClose: experienceGroupDrawerOnClose,
  } = useDisclosure();
  return (
    <Drawer placement={"right"} isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent maxHeight={"100vh"} {...swipeClose}>
        <DrawerBody
          display="flex"
          flexDirection="column"
          background="linear-gradient(175deg, #B694F7 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          p={"1rem"}
        >
          <ExperienceGroupDrawer
            onClose={experienceGroupDrawerOnClose}
            isOpen={experienceGroupDrawerIsOpen}
          />
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ExperienceGroupsDrawer;
