import { ChakraBaseProvider, Flex, Text } from "@chakra-ui/react";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import theme from "../theme/chakra-theme";

function WrongBrowserPage() {
  return (
    <ChakraBaseProvider theme={theme}>
      <LayoutNoRedirect>
        <Flex
          direction="column"
          flex={1}
          gridRowGap="2rem"
          justifyContent={"center"}
          p="0.5rem"
        >
          <Flex direction="column" alignItems={"center"}>
            <Text textStyle="heading.h1">Add to Home Screen</Text>
          </Flex>
          <Text textStyle="action">
            To install the app, you need to add this website to your home
            screen.
          </Text>
          <Text textStyle="fieldInput" pb="10rem">
            In your Safari browser menu, tap the Share icon and choose{" "}
            <Text as="span" fontWeight={500}>
              Add to Home Screen
            </Text>{" "}
            in the options. Then open the Hearth app on your home screen.
          </Text>
        </Flex>
      </LayoutNoRedirect>
    </ChakraBaseProvider>
  );
}

export default WrongBrowserPage;
