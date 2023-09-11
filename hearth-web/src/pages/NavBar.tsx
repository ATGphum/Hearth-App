import { Flex } from "@chakra-ui/react";

interface navProps {
  tabChange: (pageNumber: number) => void;
}

const NavBar = ({ tabChange }: navProps) => {
  return (
    <Flex
      justifyContent={"space-evenly"}
      width="100%"
      position="sticky"
      bottom={0}
      bg="crimson"
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
