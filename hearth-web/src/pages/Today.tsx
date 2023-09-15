import { Collapse, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DownIcon from "../icons/DownIcon";
import UpIcon from "../icons/UpIcon";
import MusicDrawer from "../components/MusicDrawer";
import { useJourneys } from "../core/apiHooks";
import { Experience, Journey } from "../core/types";
// import MusicDrawer from "../components/MusicDrawer";
// import { useJourneys } from "../core/apiHooks";

function Today() {
  const [showQuote, setShowQuote] = useState(true);
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const { data: journeys } = useJourneys();
  const [expToDo, setExpToDo] = useState<Experience | undefined>();
  const [journeyToDo, setJourneyToDo] = useState<Journey | undefined>();

  useEffect(() => {
    if (journeys) {
      const sortedJourneys = [...journeys].reverse();

      // Find the highest-level journey that's available
      const availableJourney = sortedJourneys.find((j) => j.is_available);

      if (availableJourney) {
        // Find the highest-level experience that's available in the found journey
        const sortedExperiences = [...availableJourney.experiences].reverse();
        const experience = sortedExperiences.find((e) => e.is_available);
        setJourneyToDo(availableJourney);
        setExpToDo(experience);
      }
    }
  }, [journeys]);
  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      justifyContent={"space-between"}
    >
      {expToDo && journeyToDo && (
        <MusicDrawer
          onClose={drawerOnClose}
          isOpen={drawerIsOpen}
          openedExperience={expToDo}
          parentCourse={journeyToDo}
        />
      )}
      <Flex direction="column" width="100%" padding="2rem" gridRowGap="1rem">
        <Flex
          width="100%"
          justifyContent={"space-between"}
          onClick={() => setShowQuote(!showQuote)}
        >
          <Text textStyle="heading.h2">Daily quote</Text>
          <Flex>{showQuote ? <UpIcon /> : <DownIcon />}</Flex>
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
        background={`linear-gradient(171deg, ${expToDo?.color} 6.76%, rgba(248, 231, 96, 0.00) 93.7%)`}
        onClick={drawerOnOpen}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"} pr="1rem">
          <Text textStyle={"heading.h1"}>Up next</Text>
          <ArrowRightIcon />
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Flex direction="column" alignItems={"flex-start"} textAlign={"left"}>
            <Text textStyle="detailText">{journeyToDo?.name}</Text>
            <Text textStyle="heading.h1">{expToDo?.name}</Text>
            <Text textStyle="detailText">{expToDo?.duration} minutes</Text>
          </Flex>
          <Flex minH={0} flexShrink={1} pl="1rem" maxH={"5rem"} maxW="5.5rem">
            <Image
              width="100%"
              maxWidth={"100%"}
              src={
                "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
              }
              objectFit={"contain"}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Today;
