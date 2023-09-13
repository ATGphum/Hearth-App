import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import Library from "../components/Library";
import LogoutButton from "../components/buttons/LogoutButton";
import NavBar from "./NavBar";
import Today from "./Today";

function HomePage() {
  const [page, setPage] = useState(0);

  return (
    <Layout hidePadding>
      <Flex
        id="mounter"
        overflow={"hidden"}
        position={"relative"}
        direction="column"
        flex="1"
        width="100%"
      >
        <Flex direction="column" flex="1" width="100%">
          {page === 0 && (
            <Flex direction="column" flex="1" width="100%">
              <Today />
            </Flex>
          )}
          {page === 1 && (
            <Flex direction="column" flex="1" width="100%">
              <Library />
            </Flex>
          )}
          {page === 2 && (
            <Flex direction="column" flex="1" width="100%">
              <LogoutButton />
            </Flex>
          )}
        </Flex>
        <NavBar
          tabChange={(pageNumber: number) => {
            setPage(pageNumber);
          }}
        />
      </Flex>
    </Layout>
  );
}

export default HomePage;
