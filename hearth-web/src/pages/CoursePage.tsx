import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import MusicDrawer from "../components/MusicDrawer";
import ReactDOM from "react-dom";
import { Experience, Journey } from "../core/types";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openedCourse: Journey;
}

const MotionFlex = m(Flex);
const CoursePage = ({ isOpen, onClose, openedCourse }: Props) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const [openedExperience, setOpenedExperience] = useState<
    Experience | undefined
  >(undefined);

  const { experienceToDo } = useContext(UserContext);

  const mounter = document.getElementById("mounter");

  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.85 }}
        onDragEnd={(_, info) => {
          if (
            info.velocity.x > 0 &&
            info.offset.x > 50 &&
            Math.abs(info.offset.y) < 70
          ) {
            onClose();
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex={10}
        background={` linear-gradient(175deg, ${openedCourse?.color} 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)`}
        p="1rem"
        display={"flex"}
        direction={"column"}
        overflowY={"auto"}
      >
        <AnimatePresence>
          {drawerIsOpen && openedExperience && (
            <MusicDrawer
              onClose={drawerOnClose}
              isOpen={drawerIsOpen}
              openedExperience={openedExperience}
              parentCourse={openedCourse}
            />
          )}
        </AnimatePresence>
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
          <Text textStyle="heading.h1">{openedCourse?.name}</Text>
          <Text textStyle="body" textAlign="center">
            {openedCourse?.description}
          </Text>
          <Flex direction="column" gridRowGap="0.5rem" my="0.5rem">
            {openedCourse?.experiences.map((exp) => (
              <>
                {experienceToDo && experienceToDo.level + 1 === exp.level && (
                  <Text textStyle="body" py="0.5rem">
                    Complete {experienceToDo.name} to access {exp.name}.
                  </Text>
                )}
                <Flex
                  key={exp.id}
                  justifyContent={"space-between"}
                  p="1rem"
                  bg={exp.is_available ? exp.color : openedCourse.color}
                  borderBottom="1px solid rgba(0, 0, 0, 0.60)"
                  borderRadius="2.75rem"
                  onClick={() => {
                    setOpenedExperience(exp);
                    drawerOnOpen();
                  }}
                  opacity={exp.is_available ? 1 : 0.4}
                  pointerEvents={!exp.is_available ? "none" : undefined}
                >
                  <Text>{exp.name}</Text> <ArrowRightIcon />
                </Flex>
              </>
            ))}
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default CoursePage;
