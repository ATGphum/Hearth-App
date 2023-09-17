import { Flex, Image } from "@chakra-ui/react";

interface navProps {
  tabChange: (pageNumber: number) => void;
}

const NavBar = ({ tabChange }: navProps) => {
  return (
    <Flex
      width="100%"
      position="sticky"
      bottom={0}
      bg="linear-gradient(148deg, rgba(250, 151, 4, 0.25) 19.23%, rgba(250, 151, 4, 0.00) 81.73%)"
      maxW="40rem"
      alignSelf={"flex-start"}
      alignItems={"center"}
      pb="2rem"
    >
      <Flex
        p="1rem"
        onClick={() => tabChange(0)}
        flex={1}
        justifyContent={"center"}
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1694936418/Property_1_tape_tuo8yr.png"
          }
        />
      </Flex>
      <Flex
        p="1rem"
        onClick={() => tabChange(1)}
        flex={1}
        justifyContent={"center"}
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1694936395/Untitled_Artwork_43_2_xcsubw.png"
          }
        />
      </Flex>
      <Flex
        p="1rem"
        onClick={() => tabChange(2)}
        flex={1}
        justifyContent={"center"}
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1694936419/Property_1_Variant16_hnecni.png"
          }
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
