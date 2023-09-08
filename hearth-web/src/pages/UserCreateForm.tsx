import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import FormButton from "../components/Buttons/FormButton";

function UserCreateForm() {
  return (
    <Layout>
      <Flex
        direction="column"
        width={"100%"}
        alignItems={"start"}
        gridRowGap="1rem"
        flexGrow={1}
      >
        <Text textStyle={"heading.h1"}>Add personal details</Text>
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
      </Flex>
      <Flex
        width={"100%"}
        direction={"column"}
        position={"sticky"}
        bottom="1rem"
      >
        <FormButton text={"Continue"} />
      </Flex>
    </Layout>
  );
}

export default UserCreateForm;
