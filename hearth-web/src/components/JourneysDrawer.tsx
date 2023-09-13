import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useSwipeable } from "react-swipeable";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const JourneyDrawer = ({ isOpen, onClose }: Props) => {
  const swipeClose = useSwipeable({
    onSwipedRight: () => onClose(),
  });
  return (
    <Drawer placement={"right"} isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent maxHeight={"100vh"} {...swipeClose}>
        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent={"space-between"}
          background="linear-gradient(175deg, #B694F7 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          p={0}
        >
          <Flex onClick={onClose} p="1rem">
            <ArrowLeftIcon />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default JourneyDrawer;
