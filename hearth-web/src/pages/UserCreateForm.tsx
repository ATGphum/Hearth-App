import { Flex, Input, Text } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import { patchUser } from "../core/api";
import { useCurrentUserProfile } from "../core/apiHooks";
import { User } from "../core/types";

const MotionFlex = m(Flex);

function UserCreateForm() {
  const navigate = useNavigate();
  const { data: user, mutate: userMutate } = useCurrentUserProfile();
  const [page, setPage] = useState(0);

  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [partnerFirstName, setPartnerFirstName] = useState<string | undefined>(
    undefined
  );
  const [partnerLastName, setPartnerLastName] = useState<string | undefined>(
    undefined
  );
  const [instagram, setInstagram] = useState<string | undefined>(undefined);

  const [attemptSubmitNames, setAttemptSubmitNames] = useState(false);

  const onSubmit = async (instagram_skip: boolean) => {
    const tempUser: Partial<User> = {
      first_name: firstName,
      last_name: lastName,
      partner_first_name: partnerFirstName,
      partner_last_name: partnerLastName,
      instagram_username: instagram_skip ? undefined : instagram,
    };

    if (user) {
      const newUser: User = { ...user, ...tempUser };
      // mutate current state
      await userMutate(newUser, false);
      patchUser(user.id, tempUser);
      setPage(2);
    }
  };

  return (
    <>
      <LazyMotion features={domAnimation}>
        <MotionFlex
          animate={{ x: page !== 0 ? "-50%" : "0%" }}
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
          height="100vh"
          background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
        >
          <Flex
            direction="column"
            width={"100%"}
            alignItems={"start"}
            gridRowGap="1rem"
            flexGrow={1}
            color="accent.brown"
          >
            <Text textStyle={"heading.h1"}>Add personal details.</Text>
            <Flex direction={"column"} alignItems="start" width="100%">
              <Text textStyle="heading.h2">Enter your name</Text>
              <Flex
                direction="column"
                alignItems={"start"}
                py="1rem"
                gridRowGap="0.5rem"
                width="100%"
              >
                <Text textStyle="body">First</Text>
                <Flex
                  borderBottom={"0.5px solid"}
                  borderColor={"accent.navy"}
                  px="0.5rem"
                  width="100%"
                >
                  <Input
                    className="ios-disable-highlight"
                    onChange={(e) => setFirstName(e.target.value)}
                    width="100%"
                    background="none"
                    textStyle="fieldInput"
                  />
                </Flex>
                {attemptSubmitNames && !firstName && (
                  <Text textStyle="error">Please enter your first name</Text>
                )}
                <Text mt="0.5rem" textStyle="body">
                  Last
                </Text>
                <Flex
                  borderBottom={"0.5px solid"}
                  borderColor={"accent.navy"}
                  px="0.5rem"
                  width="100%"
                >
                  <Input
                    className="ios-disable-highlight"
                    onChange={(e) => setLastName(e.target.value)}
                    variant="unstyled"
                    width="100%"
                    background="none"
                    textStyle="fieldInput"
                  />
                </Flex>
                {attemptSubmitNames && !lastName && (
                  <Text textStyle="error">Please enter your last name</Text>
                )}
              </Flex>
            </Flex>
            <Flex direction={"column"} alignItems="start" width="100%">
              <Text textStyle="heading.h2">Enter your partner's name</Text>
              <Flex
                direction="column"
                alignItems={"start"}
                py="1rem"
                gridRowGap="0.5rem"
                width="100%"
              >
                <Text textStyle="body">First</Text>
                <Flex
                  borderBottom={"0.5px solid"}
                  borderColor={"accent.navy"}
                  px="0.5rem"
                  width="100%"
                >
                  <Input
                    className="ios-disable-highlight"
                    onChange={(e) => setPartnerFirstName(e.target.value)}
                    variant="unstyled"
                    width="100%"
                    background="none"
                    textStyle="fieldInput"
                  />
                </Flex>
                {attemptSubmitNames && !partnerFirstName && (
                  <Text textStyle="error">
                    Please enter your partner's first name
                  </Text>
                )}
                <Text textStyle="body" mt="0.5rem">
                  Last
                </Text>
                <Flex
                  borderBottom={"0.5px solid"}
                  borderColor={"accent.navy"}
                  px="0.5rem"
                  width="100%"
                >
                  <Input
                    className="ios-disable-highlight"
                    onChange={(e) => setPartnerLastName(e.target.value)}
                    variant="unstyled"
                    width="100%"
                    background="none"
                    textStyle="fieldInput"
                  />
                </Flex>
                {attemptSubmitNames && !partnerLastName && (
                  <Text textStyle="error">
                    Please enter your partner's last name
                  </Text>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            width={"100%"}
            direction={"column"}
            position={"sticky"}
            bottom="1rem"
          >
            <FormButton
              text={"Continue"}
              callback={() => {
                setAttemptSubmitNames(true);
                if (
                  firstName &&
                  lastName &&
                  partnerFirstName &&
                  partnerLastName
                )
                  setPage(1);
              }}
            />
          </Flex>
        </MotionFlex>
      </LazyMotion>
      {page > 0 && (
        <AnimatePresence>
          <LazyMotion features={domAnimation}>
            <MotionFlex
              initial={{ x: "100%" }}
              animate={{ x: page > 0 ? "0%" : "100%" }}
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
                  setPage(0);
                }
              }}
              transition={{ damping: 0 }}
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              zIndex={5}
              height="100vh"
              background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
              p="1rem"
              display={"flex"}
              direction={"column"}
              overflowY={"auto"}
            >
              <Flex
                direction="column"
                width={"100%"}
                alignItems={"start"}
                gridRowGap="1rem"
                flexGrow={1}
                color="accent.brown"
              >
                <Text textStyle={"heading.h1"}>Let's be social.</Text>

                <Text textStyle="heading.h2" textAlign={"left"}>
                  Can wel follow you on Instagram?
                </Text>
                <Flex
                  direction="column"
                  alignItems={"start"}
                  gridRowGap="0.5rem"
                  width="100%"
                >
                  <Text textStyle="body">Your Instagram username</Text>
                  <Flex
                    borderBottom={"0.5px solid"}
                    borderColor={"accent.navy"}
                    px="0.5rem"
                    width="100%"
                    mb="0.5rem"
                  >
                    <Input
                      className="ios-disable-highlight"
                      variant="unstyled"
                      onChange={(e) => setInstagram(e.target.value)}
                      width="100%"
                      background="none"
                      textStyle="fieldInput"
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                width={"100%"}
                direction={"column"}
                position={"sticky"}
                bottom="1rem"
                gridRowGap="1rem"
              >
                <FormButton
                  text={"Skip this step →"}
                  callback={() => onSubmit(true)}
                  color="neutral.black"
                  backgroundColor="inherit"
                />
                <FormButton
                  text={"Continue"}
                  callback={() => onSubmit(false)}
                />
              </Flex>
            </MotionFlex>
          </LazyMotion>
        </AnimatePresence>
      )}
      {page == 2 && (
        <AnimatePresence>
          <LazyMotion features={domAnimation}>
            <MotionFlex
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              direction="column"
              height="100vh"
              width={"100%"}
              alignItems={"center"}
              gridRowGap="1rem"
              flexGrow={1}
              onClick={() => navigate("/")}
              color="accent.brown"
              zIndex={10}
              bg="background.fleshOpaque"
            >
              <Flex
                h="100%"
                w="100%"
                bg="radial-gradient(41.92% 85.12% at 100% 68.31%, rgba(0, 240, 255, 0.20) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(48.49% 83.29% at 0% 100%, rgba(255, 199, 0, 0.50) 0%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.30) 0%, rgba(0, 102, 255, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.32) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.10) 0%, rgba(252, 112, 68, 0.10) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.80) 0%, rgba(255, 223, 192, 0.80) 100%);"
                alignItems={"center"}
                justifyContent={"center"}
                direction={"column"}
                gridRowGap="2rem"
              >
                <Text textStyle={"heading.h1XL"}>Welcome,</Text>
                <Text textStyle="heading.h2XL" px="3rem">
                  {user?.first_name} and {user?.partner_first_name}
                </Text>
              </Flex>
            </MotionFlex>
          </LazyMotion>
        </AnimatePresence>
      )}
    </>
  );
}

export default UserCreateForm;
