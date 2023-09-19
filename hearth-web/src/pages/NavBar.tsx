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
      >
        <Image
          src={
            selectedPage === 0
              ? "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/TodayIconSelected.svg"
              : "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097749/NavBarIcons/TodayIcon.svg"
          }
        />
      </Flex>
      <Flex
        p="0.75rem"
        onClick={() => tabChange(1)}
        flex={1}
        justifyContent={"center"}
      >
        <Image
          src={
            selectedPage === 1
              ? "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097749/NavBarIcons/LibraryIconSelected.svg"
              : "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/LibraryIcon.svg"
          }
        />
      </Flex>
      <Flex
        p="0.75rem"
        onClick={() => tabChange(2)}
        flex={1}
        justifyContent={"center"}
      >
        <Image
          src={
            selectedPage === 2
              ? "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/ProfileIcon.svg"
              : "https://res.cloudinary.com/ddh1fblle/image/upload/v1695097750/NavBarIcons/ProfileIcon.svg"
          }
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
