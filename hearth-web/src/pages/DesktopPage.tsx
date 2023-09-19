import { Flex, Image, Text } from "@chakra-ui/react";

function DesktopPage() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      minHeight="100vh"
      position="relative"
      overflow={"hidden"}
      justifyContent={"center"}
    >
      <Flex direction="column" gridRowGap="4rem">
        <Flex direction="column" alignItems={"center"} gridRowGap="2rem">
          <Flex>
            <Image
              src={
                "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
              }
              alt="Hearth"
            />
          </Flex>
          <Text>
            Screen-free & feel-good experiences designed to help partners
            connect & relax in just 10 minutes a day.
          </Text>
        </Flex>
        <Flex direction="column" alignItems={"center"} gridRowGap="2rem">
          <Text textStyle="action">
            Visit app.hearthtogether on a phone to install the app
          </Text>
          <Text textStyle="fieldLabel" color="accent.grey">
            Check out our privacy policy →
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DesktopPage;
