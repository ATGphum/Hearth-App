import { Box, ChakraBaseProvider, Flex, Image, Text } from "@chakra-ui/react";
import theme from "../theme/chakra-theme";
import { useEffect } from "react";
import { trackEvent } from "../core/analytics";

function DesktopPage() {
  useEffect(() => {
    trackEvent({
      type: "Land on Desktop browser",
    });
  }, []);
  return (
    <ChakraBaseProvider theme={theme}>
      <Flex
        direction="column"
        alignItems="center"
        background="radial-gradient(45.76% 56.1% at 50% 50%, rgba(255, 194, 144, 0.10) 38.35%, rgba(255, 194, 144, 0.10) 100%), radial-gradient(17.88% 32.85% at 100% 68.31%, rgba(0, 240, 255, 0.10) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(53.91% 90.31% at 0% 100%, rgba(255, 199, 0, 0.30) 17.13%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.15) 0%, rgba(0, 102, 255, 0.00) 73.6%), radial-gradient(43.47% 88.34% at 40.78% 51.67%, rgba(255, 0, 0, 0.15) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.05) 0%, rgba(252, 112, 68, 0.05) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.50) 0%, rgba(255, 223, 192, 0.50) 100%)"
        // minHeight="100vh"
        minHeight="100%"
        position="relative"
        overflow={"hidden"}
        justifyContent={"center"}
        p="1rem"
      >
        <Flex direction="column" gridRowGap="4rem">
          <Flex direction="column" alignItems={"center"} gridRowGap="2rem">
            <Box>
              <Image
                sizes="xl"
                src={
                  "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
                }
                alt="Hearth"
                style={{ fontSize: "3rem" }}
              />
            </Box>
          </Flex>
          <Flex direction="column" gridRowGap="1rem" textAlign="left">
            <Text textStyle="heading.h1">
              Use your mobile phone to access Hearth.
            </Text>
            <Text textStyle="heading.h2">Visit app.hearthtogether.com</Text>
            <Text textStyle="heading.h3" color="accent.grey">
              See you soon.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ChakraBaseProvider>
  );
}

export default DesktopPage;
