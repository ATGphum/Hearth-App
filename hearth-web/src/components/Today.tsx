import { Collapse, Flex, Text } from "@chakra-ui/react";
import UpIcon from "../icons/UpIcon";
import { useState } from "react";
import DownIcon from "../icons/DownIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

function Today() {
  const [showQuote, setShowQuote] = useState(true);
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      justifyContent={"space-between"}
    >
      <Flex direction="column" width="100%" padding="2rem" gridRowGap="1rem">
        <Flex width="100%" justifyContent={"space-between"}>
          <Text textStyle="heading.h2">Daily quote</Text>
          <Flex onClick={() => setShowQuote(!showQuote)}>
            {showQuote ? <UpIcon /> : <DownIcon />}
          </Flex>
        </Flex>
        <Collapse in={showQuote} animateOpacity>
          <Flex direction="column" textAlign={"left"}>
            <Text textStyle="quote">
              "To love someone is to learn the song in their heart and sing it
              to them when they have forgotten.”
            </Text>
            <Text>- Arne Garborg</Text>
          </Flex>
        </Collapse>
      </Flex>
      <Flex
        direction="column"
        padding="1.5rem"
        borderTopRadius="3rem"
        gridRowGap="0.5rem"
        background="linear-gradient(171deg, #C1E6FC 6.76%, rgba(248, 231, 96, 0.00) 93.7%);"
      >
        <Flex justifyContent={"space-between"} alignItems={"center"} pr="1rem">
          <Text textStyle={"heading.h1"}>Up next</Text>
          <ArrowRightIcon />
        </Flex>
        <Flex>
          <Flex direction="column" alignItems={"flex-start"}>
            <Text textStyle="detailText">3-Day Connection Challenge</Text>
            <Text textStyle="heading.h1">Introduction</Text>
            <Text textStyle="detailText">3 minutes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Today;
