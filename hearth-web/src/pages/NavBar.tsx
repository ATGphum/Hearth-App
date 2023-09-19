import { Flex, Image } from "@chakra-ui/react";

interface navProps {
  tabChange: (pageNumber: number) => void;
  selectedPage: number;
}

const NavBar = ({ tabChange, selectedPage }: navProps) => {
  return (
    <Flex
      width="100%"
      position="sticky"
      bottom={0}
      bg="linear-gradient(148deg, rgba(250, 151, 4, 0.25) 19.23%, rgba(250, 151, 4, 0.00) 81.73%)"
      maxW="40rem"
      alignSelf={"flex-start"}
      alignItems={"center"}
      pb="1.5rem"
    >
      <Flex
        p="0.75rem"
        onClick={() => tabChange(0)}
        flex={1}
        justifyContent={"center"}
        background={
          selectedPage === 0
            ? "radial-gradient(11.69% 16.69% at 50% 33.85%, #FF4D00 0%, rgba(255, 255, 255, 0.00) 100%)"
            : "none"
        }
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097749/NavBarIcons/TodayIcon.svg"
          }
        />
      </Flex>
      <Flex
        p="0.75rem"
        onClick={() => tabChange(1)}
        flex={1}
        justifyContent={"center"}
        background={
          selectedPage === 1
            ? "radial-gradient(11.69% 16.69% at 50% 33.85%, #FF4D00 0%, rgba(255, 255, 255, 0.00) 100%)"
            : "none"
        }
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/LibraryIcon.svg"
          }
        />
      </Flex>
      <Flex
        p="0.75rem"
        onClick={() => tabChange(2)}
        flex={1}
        justifyContent={"center"}
        background={
          selectedPage === 2
            ? "radial-gradient(11.69% 16.69% at 50% 33.85%, #FF4D00 0%, rgba(255, 255, 255, 0.00) 100%)"
            : "none"
        }
      >
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/ProfileIcon.svg"
          }
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
