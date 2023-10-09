import { Flex, Image, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import CoursesPage from "./CoursesPage";
import MusicDrawer from "../components/MusicDrawer";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { trackEvent } from "../core/analytics";
import { useCategories } from "../core/apiHooks";
import JourneyPage from "./JourneyPage";
import { Category, CourseType } from "../core/types";
import CategoryPage from "./CategoryPage";

const MotionFlex = m(Flex);

function Library() {
  const { experienceToDo, journeyToDo } = useContext(UserContext);
  const { data: categories } = useCategories();
  const {
    isOpen: musicDrawerIsOpen,
    onOpen: musicDrawerOnOpen,
    onClose: musicDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: journeyDrawerIsOpen,
    onOpen: journeyDrawerOnOpen,
    onClose: journeyDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: categoryDrawerIsOpen,
    onOpen: categoryDrawerOnOpen,
    onClose: categoryDrawerOnClose,
  } = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState<
    undefined | Category
  >();

  const openMusicDrawer = (journeyName: string, experienceName: string) => {
    musicDrawerOnOpen();

    // Amplitude track event
    trackEvent({
      type: "Click Up Next",
      journey_name: journeyName,
      experience_name: experienceName,
      from: "Library Page",
    });
  };

  return (
    <Flex
      direction="column"
      width="100%"
      flex="1"
      overflow={"hidden"}
      position={"relative"}
    >
      <AnimatePresence>
        {journeyDrawerIsOpen && (
          <CoursesPage
            onClose={journeyDrawerOnClose}
            isOpen={journeyDrawerIsOpen}
          />
        )}
        {categoryDrawerIsOpen && selectedCategory && (
          <CategoryPage
            onClose={categoryDrawerOnClose}
            isOpen={categoryDrawerIsOpen}
            courseType={CourseType.category}
            openedCourse={selectedCategory}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {musicDrawerIsOpen && journeyToDo && experienceToDo && (
          <MusicDrawer
            onClose={musicDrawerOnClose}
            isOpen={musicDrawerIsOpen}
            parentCourse={journeyToDo}
            openedExperience={experienceToDo}
          />
        )}
      </AnimatePresence>
      <LazyMotion features={domMax}>
        <MotionFlex
          drag={"y"}
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 0 }}
          animate={{ x: journeyDrawerIsOpen ? "-50%" : "0%" }}
          transition={{ damping: 300 }}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          overflowY={"auto"}
          direction="column"
          width="100%"
          flex="1"
          p="1rem"
          pt="0rem"
          gridRowGap="2rem"
        >
          {experienceToDo && (
            <Flex
              direction="column"
              p="2rem"
              background={`linear-gradient(166deg, ${experienceToDo?.color} 10.17%, rgba(240, 88, 252, 0.00) 90.68%)`}
              width="100%"
              borderRadius="2.75rem"
              borderBottom="1px solid rgba(0, 0, 0, 0.40)"
              onClick={() =>
                openMusicDrawer(
                  journeyToDo?.name ?? "",
                  experienceToDo?.name ?? ""
                )
              }
            >
              <Image
                m="1rem"
                height="6rem"
                src={experienceToDo?.image_link}
                objectFit={"contain"}
              />

              <Text textStyle="heading.h1">Up next</Text>
              <Text textStyle="bodySmall">{journeyToDo?.name}</Text>
              <Text textStyle="heading.h2">{experienceToDo?.name}</Text>
              <Text textStyle="body">{experienceToDo?.duration} min</Text>
            </Flex>
          )}

          <Flex direction="column" textAlign={"left"} gridRowGap="0.75rem">
            <Text textStyle={"heading.h2"}>Connection Journeys</Text>
            <Text textStyle={"body"}>
              Directed paths for making connection time a habit.
            </Text>
            <Flex
              borderRadius="2.75rem"
              background="linear-gradient(162deg, #B694F7 12.43%, rgba(182, 148, 247, 0.00) 88.3%)"
              borderBottom="1px solid rgba(0, 0, 0, 0.40)"
              p="1rem"
              alignItems={"center"}
              gridColumnGap="1rem"
              onClick={journeyDrawerOnOpen}
            >
              <Image
                h={"4rem"}
                src={
                  "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/JourneyMasterLogo_qlvdpb.png"
                }
                objectFit={"contain"}
              />
              <Text textStyle={"heading.h2"}>Connection Journeys</Text>
            </Flex>
          </Flex>
          <Flex direction="column" textAlign={"left"} gridRowGap="0.75rem">
            <Text textStyle={"heading.h2"}>Categories</Text>
            <Text textStyle={"body"}>
              Self-guided experiences for when you know what kind of topic you
              want to explore together.
            </Text>
            <SimpleGrid minChildWidth="8.5rem" spacing="0.75rem">
              {categories?.map((category) => (
                <Flex
                  direction="column"
                  alignItems={"center"}
                  borderRadius="1.5rem"
                  background={`linear-gradient(180deg, ${category.color} 0%, rgba(190, 230, 255, 0.00) 100%)`}
                  borderBottom="1px solid rgba(0, 0, 0, 0.40)"
                  p="1rem"
                  flex={"1 0 8.5rem"}
                  onClick={() => {
                    setSelectedCategory(category);
                    categoryDrawerOnOpen();
                  }}
                >
                  <Flex py="2rem" />
                  <Text textStyle={"heading.h2"}>{category.name}</Text>
                  <Text textStyle="body">
                    {category.experiences.length} Experiences
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Flex>
        </MotionFlex>
      </LazyMotion>
    </Flex>
  );
}

export default Library;
