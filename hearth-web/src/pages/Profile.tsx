import { Flex, Text, Image, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useCurrentUserProfile } from "../core/apiHooks";
import { formatDate } from "../core/helpers";
import SettingsDrawer from "../components/SettingsDrawer";

const MotionFlex = m(Flex);

function Profile() {
  const {
    isOpen: settingsDrawerIsOpen,
    onOpen: settingsDrawerOnOpen,
    onClose: settingsDrawerOnClose,
  } = useDisclosure();
  const { data: user } = useCurrentUserProfile();
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      overflow={"hidden"}
      position={"relative"}
    >
      <AnimatePresence>
        {settingsDrawerIsOpen && (
          <SettingsDrawer
            onClose={settingsDrawerOnClose}
            isOpen={settingsDrawerIsOpen}
          />
        )}
      </AnimatePresence>
      <LazyMotion features={domMax}>
        <MotionFlex
          drag={"y"}
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 0 }}
          transition={{ damping: 300 }}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          overflowY={"auto"}
          direction="column"
          width="100%"
          flex="1"
          p="1rem"
          pt="0rem"
          gridRowGap="1rem"
        >
          <Flex justifyContent={"space-between"} alignItems={"flex-start"}>
            {user && (
              <Flex direction="column" textAlign={"left"} gridRowGap="0.5rem">
                <Text textStyle="heading.h1">
                  {user.first_name} & {user.partner_first_name}
                </Text>
                <Text textStyle="heading.h4">
                  Joined {formatDate(user.date_joined)}
                </Text>
              </Flex>
            )}
            <Flex
              onClick={settingsDrawerOnOpen}
              justifyContent={"center"}
              className="ios-disable-highlight"
            >
              <Image
                src={
                  "https://res.cloudinary.com/ddh1fblle/image/upload/v1694938037/Untitled_Artwork_43_2_ng62of.svg"
                }
                maxHeight={"2rem"}
              />
            </Flex>
          </Flex>
        </MotionFlex>
      </LazyMotion>
    </Flex>
  );
}

export default Profile;
