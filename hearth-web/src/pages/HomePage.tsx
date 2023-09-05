import { UnorderedList, Flex, Image, Text, ListItem } from "@chakra-ui/react";
import PinkWorld from "../svg/pink-world.svg";
import { useAuth0 } from "@auth0/auth0-react";
import BlueButton from "../components/Buttons/BlueButton";

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <Flex
      direction="column"
      justifyContent={"space-between"}
      flex="1"
      gridRowGap={"1rem"}
    >
      <Flex direction="column" gridRowGap="2" mt="2rem">
        <Image src={PinkWorld} />
        <Text textStyle={"heading.h2"} textAlign={"left"}>
          Experience Hearth for free.
        </Text>
        <Text
          textStyle={"heading.h3"}
          textAlign={"left"}
          mx="0.5rem"
          mt="0.5rem"
        >
          <UnorderedList>
            <ListItem>Explore your relationship</ListItem>
            <ListItem>Schedule reminders</ListItem>
            <ListItem>Get guidance from experts</ListItem>
          </UnorderedList>
        </Text>
      </Flex>
      <BlueButton
        text="Sign up for the free 3-day connection challenge"
        callback={() => {
          loginWithRedirect();
        }}
      />
    </Flex>
  );
}

export default HomePage;
