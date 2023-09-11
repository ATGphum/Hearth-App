import { Collapse, Flex, Text } from "@chakra-ui/react";
import UpIcon from "../icons/UpIcon";
import { useState } from "react";
import DownIcon from "../icons/DownIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

function Library() {
  return (
    <Flex direction="column" width="100%" flex="1" p="1rem">
      <Flex
        direction="column"
        p="2rem"
        background="linear-gradient(166deg, #F058FC 10.17%, rgba(240, 88, 252, 0.00) 90.68%)"
        width="100%"
      >
        <Text textStyle="heading.h1">Next session</Text>
      </Flex>
    </Flex>
  );
}

export default Library;
