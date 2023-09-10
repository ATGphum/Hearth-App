import { Flex, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import FormButton from "../components/buttons/FormButton";
import { UserContext } from "../context/UserContext";
import { patchUser } from "../core/api";
import { User } from "../core/types";

function UserCreateForm() {
  const navigate = useNavigate();
  const { user, userMutate } = useContext(UserContext);
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

  const goBack = useSwipeable({
    onSwipedRight: () => setPage(0),
  });

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
      console.log(newUser);
      console.log(user);
    }
  };

  return (
    <LayoutNoRedirect>
      {page === 0 ? (
        <>
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
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="unstyled"
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
                    onChange={(e) => setLastName(e.target.value)}
                    variant="unstyled"
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
                    onChange={(e) => setPartnerFirstName(e.target.value)}
                    variant="unstyled"
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
                    onChange={(e) => setPartnerLastName(e.target.value)}
                    variant="unstyled"
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
        </>
      ) : page === 1 ? (
        <>
          <Flex
            direction="column"
            width={"100%"}
            alignItems={"start"}
            gridRowGap="1rem"
            flexGrow={1}
            {...goBack}
            color="accent.brown"
          >
            <Text textStyle={"heading.h1"}>Let's be social.</Text>

            <Text textStyle="heading.h2" textAlign={"left"}>
              We'd love to follow you on Instagram!
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
                  variant="unstyled"
                  onChange={(e) => setInstagram(e.target.value)}
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
            <FormButton text={"Continue"} callback={() => onSubmit(false)} />
          </Flex>
        </>
      ) : (
        <>
          <Flex
            direction="column"
            width={"100%"}
            alignItems={"center"}
            gridRowGap="1rem"
            flexGrow={1}
            padding="1rem"
            onClick={() => navigate("/")}
            color="accent.brown"
          >
            <Text textStyle={"heading.h1"}>
              Welcome, {user?.first_name} & {user?.partner_first_name}
            </Text>
          </Flex>
        </>
      )}
    </LayoutNoRedirect>
  );
}

export default UserCreateForm;
