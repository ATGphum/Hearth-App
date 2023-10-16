import { Flex, Image, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { useContext, useState } from "react";
import MusicDrawer from "../components/MusicDrawer";
import { UserContext } from "../context/UserContext";
import { useCategories } from "../core/apiHooks";
import { Category } from "../core/types";
import CategoryPage from "./CategoryPage";
import CoursesPage from "./CoursesPage";
import Spinner from "../components/Spinner";

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

  const openMusicDrawer = () => {
    musicDrawerOnOpen();
  };

  if (!categories)
    return (
      <Flex
        width="100%"
        flex="1"
        overflow={"hidden"}
        position={"relative"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

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
        <Flex
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
              onClick={() => openMusicDrawer()}
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
                  <Image
                    height="4rem"
                    src={category.experiences[0].image_link}
                    objectFit={"contain"}
                    my="1rem"
                  />
                  <Text textStyle={"heading.h2"} textAlign={"center"}>
                    {category.name}
                  </Text>
                  <Text textStyle="body">
                    {category.experiences.length} Experiences
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </LazyMotion>
    </Flex>
  );
}

export default Library;
