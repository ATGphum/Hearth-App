import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import ReactDOM from "react-dom";
import MusicDrawer from "../components/MusicDrawer";
import { trackEvent } from "../core/analytics";
import { Category, Experience } from "../core/types";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openedCourse: Category;
}

const MotionFlex = m(Flex);
const CategoryPage = ({ isOpen, onClose, openedCourse }: Props) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const [openedExperience, setOpenedExperience] = useState<
    Experience | undefined
  >(undefined);

  const mounter = document.getElementById("mounter");

  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        dragDirectionLock
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 20 && info.offset.x > 50) {
            onClose();

            // Amplitude track event
            trackEvent({
              type: "Close Page",
              page_type: "Course/Experience Page",
            });
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
        <Flex
          onClick={() => {
            onClose();

            // Amplitude track event
            trackEvent({
              type: "Close Page",
              page_type: "Course/Experience Page",
            });
          }}
        >
          <ArrowLeftIcon />
        </Flex>
        <Flex direction="column" textAlign={"center"} gridRowGap="1rem">
          <Image
            m="1rem"
            height="8rem"
            src={openedCourse.experiences[0].image_link}
            objectFit={"contain"}
          />
          <Text textStyle="heading.h1">{openedCourse?.name}</Text>
          <Text textStyle="body" textAlign="center">
            {openedCourse?.description}
          </Text>
          <Flex direction="column" gridRowGap="0.5rem" my="0.5rem">
            {openedCourse?.experiences.map((exp) => (
              <Flex key={exp.id} direction="column">
                <Flex
                  flex={1}
                  justifyContent={"space-between"}
                  p="1rem"
                  bg={"rgb(255 255 255 / 50%)"}
                  borderBottom="1px solid rgba(0, 0, 0, 0.60)"
                  borderRadius="2.75rem"
                  onClick={() => {
                    setOpenedExperience(exp);
                    drawerOnOpen();

                    // Amplitude track event
                    trackEvent({
                      type: "Click Experience",
                      experience_name: exp.name,
                    });
                  }}
                >
                  <Text>{exp.name}</Text> <ArrowRightIcon />
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default CategoryPage;
