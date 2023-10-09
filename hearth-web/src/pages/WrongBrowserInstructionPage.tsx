import {
  ChakraBaseProvider,
  Flex,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import theme from "../theme/chakra-theme";

function WrongBrowserInstructionPage() {
  const userAgent = window.navigator.userAgent;
  const isIos = /(iPhone|iPod|iPad)/i.test(userAgent);

  return (
    <ChakraBaseProvider theme={theme}>
      <LayoutNoRedirect bg="radial-gradient(45.76% 56.1% at 50% 50%, rgba(255, 194, 144, 0.10) 38.35%, rgba(255, 194, 144, 0.10) 100%), radial-gradient(17.88% 32.85% at 100% 68.31%, rgba(0, 240, 255, 0.10) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(53.91% 90.31% at 0% 100%, rgba(255, 199, 0, 0.30) 17.13%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.15) 0%, rgba(0, 102, 255, 0.00) 73.6%), radial-gradient(43.47% 88.34% at 40.78% 51.67%, rgba(255, 0, 0, 0.15) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.05) 0%, rgba(252, 112, 68, 0.05) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.50) 0%, rgba(255, 223, 192, 0.50) 100%)">
        {isIos ? <IOSInstallPage /> : <AndroidInstallPage />}
      </LayoutNoRedirect>
    </ChakraBaseProvider>
  );
}

const IOSInstallPage = () => {
  return (
    <Flex
      direction="column"
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      p="0.5rem"
    >
      <Flex direction="column" textAlign="left" gridRowGap="2rem">
        <Text textStyle="heading.h1">
          To get started with Hearth, switch to your Safari browser.
        </Text>
        <OrderedList spacing={2}>
          <ListItem>
            <Text>
              In the browser menu tap the share icon "{<ThreeDotsIcon />}".
            </Text>
          </ListItem>
          <ListItem>
            <Text>Tap "Open in external browser"</Text>
          </ListItem>
        </OrderedList>

        <Text pb="10rem">See you soon ❤️</Text>
      </Flex>
    </Flex>
  );
};

const AndroidInstallPage = () => {
  return (
    <Flex
      direction="column"
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      p="0.5rem"
    >
      <Flex direction="column" textAlign="left" gridRowGap="2rem">
        <Text textStyle="heading.h1">
          To get started with Hearth, switch to your Chrome.
        </Text>
        <OrderedList spacing={2}>
          <ListItem>
            <Text>
              In the browser menu tap the share icon "{<ThreeDotsIcon />}".
            </Text>
          </ListItem>
          <ListItem>
            <Text>Tap "Open in external browser"</Text>
          </ListItem>
        </OrderedList>

        <Text pb="10rem">See you soon ❤️</Text>
      </Flex>
    </Flex>
  );
};

export default WrongBrowserInstructionPage;

const ThreeDotsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 -5 20 20"
      fill="none"
      style={{ display: "inline-block" }}
    >
      <path
        d="M4.99967 8.33398C4.08301 8.33398 3.33301 9.08398 3.33301 10.0007C3.33301 10.9173 4.08301 11.6673 4.99967 11.6673C5.91634 11.6673 6.66634 10.9173 6.66634 10.0007C6.66634 9.08398 5.91634 8.33398 4.99967 8.33398ZM14.9997 8.33398C14.083 8.33398 13.333 9.08398 13.333 10.0007C13.333 10.9173 14.083 11.6673 14.9997 11.6673C15.9163 11.6673 16.6663 10.9173 16.6663 10.0007C16.6663 9.08398 15.9163 8.33398 14.9997 8.33398ZM9.99967 8.33398C9.08301 8.33398 8.33301 9.08398 8.33301 10.0007C8.33301 10.9173 9.08301 11.6673 9.99967 11.6673C10.9163 11.6673 11.6663 10.9173 11.6663 10.0007C11.6663 9.08398 10.9163 8.33398 9.99967 8.33398Z"
        fill="black"
      />
    </svg>
  );
};
