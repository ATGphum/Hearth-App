import { Flex } from "@chakra-ui/react";

interface navProps {
  tabChange: (pageNumber: number) => void;
}

const NavBar = ({ tabChange }: navProps) => {
  return (
    <Flex
      justifyContent={"space-around"}
      width="100%"
      position="sticky"
      bottom={0}
      bg="linear-gradient(148deg, rgba(250, 151, 4, 0.25) 19.23%, rgba(250, 151, 4, 0.00) 81.73%)"
    >
      <Flex p="1rem" onClick={() => tabChange(0)}>
        1
      </Flex>
      <Flex p="1rem" onClick={() => tabChange(1)}>
        2
      </Flex>
      <Flex p="1rem" onClick={() => tabChange(2)}>
        3
      </Flex>
    </Flex>
  );
};

export default NavBar;
