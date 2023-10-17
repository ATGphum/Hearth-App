import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import TextLogo from "../components/TextLogo";
import { trackEvent } from "../core/analytics";

function DesktopPage() {
  useEffect(() => {
    trackEvent({
      type: "Land on Desktop browser",
    });
  }, []);
  return (
    <Flex
      direction="column"
      alignItems="center"
      // minHeight="100vh"
      position="relative"
      overflow={"hidden"}
      justifyContent={"center"}
      p="1rem"
    >
      <Flex direction="column" gridRowGap="4rem">
        <Flex direction="column" alignItems={"center"} gridRowGap="2rem">
          <Box>
            <TextLogo />
          </Box>
        </Flex>
        <Flex direction="column" gridRowGap="1rem" textAlign="left">
          <Text textStyle="heading.h1" textAlign={"center"}>
            Use your mobile phone to install Hearth.
          </Text>
          <Text textStyle="heading.h2" textAlign={"center"}>
            Feel free to keep enjoying the full experience on desktop!
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DesktopPage;
