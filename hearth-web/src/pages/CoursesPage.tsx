import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useJourneys } from "../core/apiHooks";
import { Journey } from "../core/types";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import CoursePage from "./CoursePage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const CoursesPage = ({ isOpen, onClose }: Props) => {
  const {
    isOpen: courseDrawerIsOpen,
    onOpen: courseDrawerOnOpen,
    onClose: courseDrawerOnClose,
  } = useDisclosure();

  const [openedJourney, setOpenedJourney] = useState<Journey | undefined>(
    undefined
  );

  return (
    <>
      <AnimatePresence>
        {courseDrawerIsOpen && openedJourney && (
          <CoursePage
            onClose={courseDrawerOnClose}
            isOpen={courseDrawerIsOpen}
            openedCourse={openedJourney}
          />
        )}
      </AnimatePresence>
      <Courses
        isOpen={isOpen}
        onClose={onClose}
        courseDrawerIsOpen={courseDrawerIsOpen}
        courseDrawerOnOpen={courseDrawerOnOpen}
        setOpenedJourney={(journey) => setOpenedJourney(journey)}
      />
    </>
  );
};

export default CoursesPage;

interface CourseType {
  isOpen: boolean;
  onClose: () => void;
  courseDrawerIsOpen: boolean;
  courseDrawerOnOpen: () => void;
  setOpenedJourney: (journey: Journey) => void;
}

const Courses = ({
  isOpen,
  onClose,
  courseDrawerIsOpen,
  courseDrawerOnOpen,
  setOpenedJourney,
}: CourseType) => {
  const mounter = document.getElementById("mounter");
  const { data: journeys } = useJourneys();
  const backgroundColor = "#B694F7";

  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{
          x: courseDrawerIsOpen ? "-50%" : isOpen ? "0%" : "100%",
        }}
        exit={{ x: "100%" }}
        drag={"x"}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 10 && info.offset.x > 100) {
            onClose();
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        overflowY={"auto"}
        direction="column"
        width="100%"
        display="flex"
        flexDirection="column"
        background={`linear-gradient(175deg, ${backgroundColor} 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)`}
        p={"1rem"}
        zIndex={5}
      >
        <Flex onClick={onClose}>
          <ArrowLeftIcon />
        </Flex>
        <Flex direction="column" textAlign={"center"} gridRowGap="1rem">
          <Image
            m="1rem"
            height="8rem"
            src={
              "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
            }
            objectFit={"contain"}
          />
          <Text textStyle="heading.h1">Connection Journeys</Text>
          <Text textStyle="body">Make connection time a meaningful habit.</Text>
          <Flex direction="column" gridRowGap="0.5rem" mt="0.5rem">
            {journeys?.map((journey) => (
              <Flex
                key={journey.id}
                justifyContent={"space-between"}
                p="1rem"
                bg={journey.is_available ? journey.color : backgroundColor}
                borderBottom="1px solid rgba(0, 0, 0, 0.60)"
                borderRadius="2.75rem"
                onClick={() => {
                  setOpenedJourney(journey);
                  courseDrawerOnOpen();
                }}
                opacity={journey.is_available ? 1 : 0.4}
                pointerEvents={!journey.is_available ? "none" : undefined}
              >
                <Text>{journey.name}</Text> <ArrowRightIcon />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};
