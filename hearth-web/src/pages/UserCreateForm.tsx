import { Flex, Input, Link, Text } from "@chakra-ui/react";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import FormButton from "../components/FormButton";
import { patchUser } from "../core/api";
import { useCurrentUserProfile } from "../core/apiHooks";
import { User } from "../core/types";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { trackEvent } from "../core/analytics";

const MotionFlex = m(Flex);

function UserCreateForm() {
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
      // mutate current state
      patchUser(user.id, tempUser);
      setPage(2);
      //dont mutate until last page has been tapped!
      trackEvent({
        type: "Submitted user information form",
        name: firstName ?? "" + lastName ?? "",
        partner_name: partnerFirstName ?? "" + partnerLastName ?? "",
        user_id: user.id,
        email: user.email,
      });
    }
  };

  const mutateUser = async () => {
    if (user) {
      const tempUser: Partial<User> = {
        first_name: firstName,
        last_name: lastName,
        partner_first_name: partnerFirstName,
        partner_last_name: partnerLastName,
      };
      const newUser: User = { ...user, ...tempUser };
      await userMutate(newUser);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      position="relative"
      overflow={"hidden"}
      bg="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
    >
      <LazyMotion features={domMax}>
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
          zIndex={5}
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
          <Text textStyle="body" mt="0.5rem">
            By clicking Continue, you agree to our{" "}
            <Link
              textDecoration={"underline"}
              onClick={() =>
                window.open(
                  "https://www.hearthtogether.com/terms-and-conditions"
                )
              }
            >
              Terms
            </Link>{" "}
            and acknowledge that you have read our{" "}
            <Link
              textDecoration={"underline"}
              onClick={() =>
                window.open("https://www.hearthtogether.com/privacy-policy")
              }
            >
              Privacy Policy
            </Link>
            , which explains how to opt out of offers and promos.
          </Text>
        </MotionFlex>
      </LazyMotion>
      <AnimatePresence>
        {page > 0 && (
          <LazyMotion features={domMax}>
            <MotionFlex
              initial={{ x: "100%" }}
              animate={{ x: page > 0 ? "0%" : "100%" }}
              exit={{ x: "100%" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.velocity.x > 20 && info.offset.x > 50) {
                  setPage(0);
                }
              }}
              transition={{ damping: 0 }}
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              zIndex={10}
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
                  Can we follow you on Instagram?
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
        )}
      </AnimatePresence>
      <AnimatePresence>
        {page === 2 && (
          <LazyMotion features={domMax}>
            <MotionFlex
              initial={{ opacity: 0 }}
              animate={{ opacity: page === 2 ? 1 : 0 }}
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
              onClick={mutateUser}
              color="accent.brown"
              zIndex={15}
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
                pb="4rem"
              >
                <Text textStyle={"heading.h1XL"}>Welcome,</Text>
                <Text textStyle="heading.h2XL" px="3rem">
                  {firstName} and {partnerFirstName}
                </Text>
                <Flex gridColumnGap="0.5rem" alignItems="center">
                  <Text textStyle="body">Tap to continue</Text>
                  <ArrowRightIcon />
                </Flex>
              </Flex>
            </MotionFlex>
          </LazyMotion>
        )}
      </AnimatePresence>
    </Flex>
  );
}

export default UserCreateForm;
