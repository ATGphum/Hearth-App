import { Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import FormButton from "../components/Buttons/FormButton";
import { Layout } from "../components/Layout";

function UserCreateForm() {
  const [page, setPage] = useState(0);

  return (
    <Layout>
      {page === 0 ? (
        <>
          <Flex
            direction="column"
            width={"100%"}
            alignItems={"start"}
            gridRowGap="1rem"
            flexGrow={1}
          >
            <Text textStyle={"heading.h1"}>Add personal details.</Text>
            <Flex direction="column" gridRowGap="1rem" px="0.5rem" width="100%">
              <Flex direction={"column"} alignItems="start" width="100%">
                <Text textStyle="heading.h2">Enter your name</Text>
                <Flex
                  direction="column"
                  alignItems={"start"}
                  p="1rem"
                  gridRowGap="0.5rem"
                  width="100%"
                >
                  <Text textStyle="body">First</Text>
                  <Flex
                    borderBottom={"0.5px solid"}
                    borderColor={"accent.navy"}
                    px="0.5rem"
                    width="100%"
                    mb="0.5rem"
                  >
                    <Input variant="unstyled" />
                  </Flex>
                  <Text textStyle="body">Last</Text>
                  <Flex
                    borderBottom={"0.5px solid"}
                    borderColor={"accent.navy"}
                    px="0.5rem"
                    width="100%"
                  >
                    <Input variant="unstyled" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction={"column"} alignItems="start" width="100%">
                <Text textStyle="heading.h2">Enter your partner's name</Text>
                <Flex
                  direction="column"
                  alignItems={"start"}
                  p="1rem"
                  gridRowGap="0.5rem"
                  width="100%"
                >
                  <Text textStyle="body">First</Text>
                  <Flex
                    borderBottom={"0.5px solid"}
                    borderColor={"accent.navy"}
                    px="0.5rem"
                    width="100%"
                    mb="0.5rem"
                  >
                    <Input variant="unstyled" />
                  </Flex>
                  <Text textStyle="body">Last</Text>
                  <Flex
                    borderBottom={"0.5px solid"}
                    borderColor={"accent.navy"}
                    px="0.5rem"
                    width="100%"
                  >
                    <Input variant="unstyled" />
                  </Flex>
                </Flex>
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
          >
            <Text textStyle={"heading.h1"}>Let's be social.</Text>
            <Flex
              direction={"column"}
              alignItems="start"
              width="100%"
              px="0.5rem"
            >
              <Text textStyle="heading.h2" textAlign={"left"}>
                We'd love to follow you on Instagram!
              </Text>
              <Flex
                direction="column"
                alignItems={"start"}
                p="1rem"
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
                  <Input variant="unstyled" />
                </Flex>
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
              callback={() => {
                setPage(2);
              }}
              color="neutral.black"
              backgroundColor="inherit"
            />
            <FormButton
              text={"Continue"}
              callback={() => {
                setPage(2);
              }}
            />
          </Flex>
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
}

export default UserCreateForm;
