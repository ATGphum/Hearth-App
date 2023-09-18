import { Flex, Text } from "@chakra-ui/react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCurrentUserProfile } from "../core/apiHooks";
import { formatDate } from "../core/helpers";

const MotionFlex = m(Flex);

function Profile() {
  const { data: user } = useCurrentUserProfile();
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      overflow={"hidden"}
      position={"relative"}
    >
      <LazyMotion features={domAnimation}>
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
          {user && (
            <Flex direction="column" textAlign={"left"}>
              <Text textStyle="heading.h1">
                {user.first_name} & {user.partner_first_name}
              </Text>
              <Text textStyle="heading.h4">
                Joined {formatDate(user.date_joined)}
              </Text>
            </Flex>
          )}
        </MotionFlex>
      </LazyMotion>
    </Flex>
  );
}

export default Profile;
