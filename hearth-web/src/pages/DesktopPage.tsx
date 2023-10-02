import { Box, ChakraBaseProvider, Flex, Image, Text } from "@chakra-ui/react";
import theme from "../theme/chakra-theme";

function DesktopPage() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Flex
        direction="column"
        alignItems="center"
        background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
        minHeight="100vh"
        position="relative"
        overflow={"hidden"}
        justifyContent={"center"}
        p="1rem"
      >
        <Flex direction="column" gridRowGap="3rem">
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
