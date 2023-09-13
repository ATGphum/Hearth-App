import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import MusicDrawer from "./MusicDrawer";
import JourneyDrawer from "./JourneysDrawer";

function Library() {
  const {
    isOpen: musicDrawerIsOpen,
    onOpen: musicDrawerOnOpen,
    onClose: musicDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: journeyDrawerIsOpen,
    onOpen: journeyDrawerOnOpen,
    onClose: journeyDrawerOnClose,
  } = useDisclosure();
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      p="1rem"
      pt={0}
      gridRowGap="1rem"
    >
      {musicDrawerIsOpen && (
        <MusicDrawer onClose={musicDrawerOnClose} isOpen={musicDrawerIsOpen} />
      )}
      <JourneyDrawer
        onClose={journeyDrawerOnClose}
        isOpen={journeyDrawerIsOpen}
      />
      <Flex
        direction="column"
        p="2rem"
        background="linear-gradient(166deg, #F058FC 10.17%, rgba(240, 88, 252, 0.00) 90.68%)"
        width="100%"
        borderRadius="2.75rem"
        borderBottom="1px solid rgba(0, 0, 0, 0.40)"
        onClick={musicDrawerOnOpen}
      >
        <Image
          m="1rem"
          height="6rem"
          src={
            "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
          }
          objectFit={"contain"}
        />

        <Text textStyle="heading.h1">Up next</Text>
        <Text textStyle="bodySmall">3-Day Connection Challenge</Text>
        <Text textStyle="heading.h2">Introduction</Text>
        <Text textStyle="body">3 min</Text>
      </Flex>
      <Flex direction="column" textAlign={"left"} gridRowGap="0.75rem">
        <Text textStyle={"heading.h2"}>Connection Journeys</Text>
        <Text textStyle={"body"}>
          Directed paths for making conneciton time a habit.
        </Text>
        <Flex
          borderRadius="2.75rem"
          background="linear-gradient(162deg, #B694F7 12.43%, rgba(182, 148, 247, 0.00) 88.3%)"
          borderBottom="1px solid rgba(0, 0, 0, 0.40)"
          p="1rem"
          alignItems={"center"}
          gridColumnGap="1rem"
          onClick={journeyDrawerOnOpen}
        >
          <Image
            h={"3rem"}
            src={
              "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
            }
            objectFit={"contain"}
          />
          <Text textStyle={"heading.h2"}>Connection Journeys</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Library;

{
  // const flexString = "1 0 8.5rem";
  /* <Flex direction="column" textAlign={"left"} gridRowGap="0.75rem">
<Text textStyle={"heading.h2"}>Categories</Text>
<Text textStyle={"body"}>
  Self-guided options for when you know what kind of topic you want to
  explore together.
</Text>
<SimpleGrid minChildWidth="8.5rem" spacing="0.75rem">
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(180deg, #BEE6FF 0%, rgba(190, 230, 255, 0.00) 100%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(162deg, #CBE476 12.41%, rgba(203, 228, 118, 0.00) 83.23%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(180deg, #D3F8A7 0%, rgba(211, 248, 167, 0.00) 100%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(174deg, #D1A8FF 4.42%, rgba(209, 167, 255, 0.00) 96.51%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(180deg, #E593DC 0%, rgba(232, 215, 255, 0.00) 100%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
  <Flex
    direction="column"
    alignItems={"center"}
    borderRadius="1.5rem"
    background="linear-gradient(180deg, #51D8AE 0%, rgba(190, 230, 255, 0.00) 100%)"
    borderBottom="1px solid rgba(0, 0, 0, 0.40)"
    p="1rem"
    flex={flexString}
  >
    <Flex py="2rem" />
    <Text textStyle={"heading.h2"}>Category</Text>
    <Text textStyle="body">:x: Experiences</Text>
  </Flex>
</SimpleGrid>
</Flex> */
}
