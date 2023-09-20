import { Collapse, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import MusicDrawer from "../components/MusicDrawer";
import { UserContext } from "../context/UserContext";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DownIcon from "../icons/DownIcon";
import UpIcon from "../icons/UpIcon";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

const MotionFlex = m(Flex);

function Today() {
  const [showQuote, setShowQuote] = useState(true);
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const { experienceToDo, journeyToDo } = useContext(UserContext);

  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      justifyContent={"flex-end"}
      overflow={"hidden"}
      position={"relative"}
    >
      <AnimatePresence>
        {drawerIsOpen && experienceToDo && journeyToDo && (
          <MusicDrawer
            onClose={drawerOnClose}
            isOpen={drawerIsOpen}
            openedExperience={experienceToDo}
            parentCourse={journeyToDo}
          />
        )}
      </AnimatePresence>
      <LazyMotion features={domAnimation}>
        <MotionFlex
          drag={"y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.5, bottom: 0.5 }}
          transition={{ damping: 300 }}
          animate={{ y: drawerIsOpen ? "1%" : "0%" }}
          direction="column"
          width="100%"
          padding="2rem"
          gridRowGap="1rem"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
        >
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
        </MotionFlex>
      </LazyMotion>
      {experienceToDo && (
        <LazyMotion features={domAnimation}>
          <MotionFlex
            drag={"y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.5, bottom: 0.5 }}
            transition={{ damping: 300 }}
            animate={{ y: drawerIsOpen ? "1%" : "0%" }}
            onDragEnd={async (_, info) => {
              if (info.velocity.y < 0) {
                drawerOnOpen();
              }
            }}
            direction="column"
            padding="1.5rem"
            borderTopRadius="3rem"
            gridRowGap="0.5rem"
            background={`linear-gradient(171deg, ${experienceToDo?.color} 6.76%, rgba(248, 231, 96, 0.00) 93.7%)`}
            onClick={drawerOnOpen}
          >
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              pr="1rem"
            >
              <Text textStyle={"heading.h1"}>Up next</Text>
              <ArrowRightIcon />
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Flex
                direction="column"
                alignItems={"flex-start"}
                textAlign={"left"}
              >
                <Text textStyle="detailText">{journeyToDo?.name}</Text>
                <Text textStyle="heading.h1">{experienceToDo?.name}</Text>
                <Text textStyle="detailText">
                  {experienceToDo?.duration} minutes
                </Text>
              </Flex>
              <Flex
                minH={0}
                flexShrink={1}
                pl="1rem"
                maxH={"5rem"}
                maxW="5.5rem"
              >
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
          </MotionFlex>
        </LazyMotion>
      )}
    </Flex>
  );
}

export default Today;
