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
import MusicDrawer from "./MusicDrawer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceGroupDrawer = ({ isOpen, onClose }: Props) => {
  const swipeClose = useSwipeable({
    onSwipedRight: () => onClose(),
  });
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  return (
    <Drawer placement={"right"} isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent maxHeight={"100vh"} {...swipeClose}>
        <DrawerBody
          display="flex"
          flexDirection="column"
          background=" linear-gradient(175deg, #FAFE0A 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          p={"1rem"}
        >
          <MusicDrawer onClose={drawerOnClose} isOpen={drawerIsOpen} />
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
            <Text textStyle="heading.h1">3-Day Connection Challenge</Text>
            <Text textStyle="body" textAlign="center">
              Set aside 10 minutes for each of these experiences. We recommend
              completing them over the next three days but if that’s not
              possible for you right now, that’s okay. Take as long as you need.
              What matters most is your intention to share these three
              experiences together.
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ExperienceGroupDrawer;
