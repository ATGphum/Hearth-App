import {
  Box,
  ChakraBaseProvider,
  Flex,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import theme from "../theme/chakra-theme";
import ArrowUpWithTrayIcon from "../icons/ArrowUpWithTrayIcon";
import PlusSquareIcon from "../icons/PlusSquareIcon";
import ThreeDotsVerticalIcon from "../icons/ThreeDotsVerticalIcon";
import AddHomeButtonIcon from "../icons/AddHomeButtonIcon";

function InstallationMobilePage() {
  const userAgent = window.navigator.userAgent;
  const isSafariIOS =
    /Safari/.test(userAgent) && /(iPhone|iPod|iPad)/i.test(userAgent);

  return (
    <ChakraBaseProvider theme={theme}>
      <LayoutNoRedirect bg="radial-gradient(45.76% 56.1% at 50% 50%, rgba(255, 194, 144, 0.10) 38.35%, rgba(255, 194, 144, 0.10) 100%), radial-gradient(17.88% 32.85% at 100% 68.31%, rgba(0, 240, 255, 0.10) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(53.91% 90.31% at 0% 100%, rgba(255, 199, 0, 0.30) 17.13%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.15) 0%, rgba(0, 102, 255, 0.00) 73.6%), radial-gradient(43.47% 88.34% at 40.78% 51.67%, rgba(255, 0, 0, 0.15) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.05) 0%, rgba(252, 112, 68, 0.05) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.50) 0%, rgba(255, 223, 192, 0.50) 100%)">
        {isSafariIOS ? <IOSInstallPage /> : <AndroidInstallPage />}
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
        <Text textStyle="heading.h1">Add Hearth to your home screen.</Text>
        <Text textStyle="action">Using Safari as your browser:</Text>
        <Box ml="0.5rem">
          <OrderedList spacing={2}>
            <ListItem>
              <Text>
                In the browser menu tap the share icon "
                {<ArrowUpWithTrayIcon />}
                ."
              </Text>
            </ListItem>
            <ListItem>
              <Text>Scroll down</Text>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Text>
                  Find and tap "
                  <Text as="span" fontWeight={500}>
                    Add to Home Screen
                  </Text>{" "}
                  {<PlusSquareIcon />}
                  ."
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Text>
                Tap "
                <Text as="span" fontWeight={500}>
                  Add
                </Text>
                " to confirm.
              </Text>
            </ListItem>
          </OrderedList>
        </Box>

        <Text pb="10rem">
          You're all set. Now you'll see Hearth next to other apps on your home
          screen.
        </Text>
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
        <Text textStyle="heading.h1">Add Hearth to your home screen.</Text>
        <Text textStyle="action">Using Chrome as your browser:</Text>
        <Box ml="0.5rem">
          <OrderedList spacing={2}>
            <ListItem>
              <Text>
                Tap the more options icon " {<ThreeDotsVerticalIcon />}
                ."
              </Text>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Text>
                  Tap "{<AddHomeButtonIcon />}
                  <Text as="span" fontWeight={500}>
                    Add to Home Screen
                  </Text>
                  ."
                </Text>
              </Flex>
            </ListItem>
          </OrderedList>
        </Box>

        <Text mb="10rem">
          You're all set. Now you'll see Hearth next to other apps on your home
          screen.
        </Text>
      </Flex>
    </Flex>
  );
};

export default InstallationMobilePage;
