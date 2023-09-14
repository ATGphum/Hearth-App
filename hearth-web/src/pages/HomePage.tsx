import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Layout } from "../components/Layout";

import LogoutButton from "../components/buttons/LogoutButton";
import NavBar from "./NavBar";
import React from "react";
const Library = React.lazy(() => import("../components/Library"));
const Today = React.lazy(() => import("./Today"));

function HomePage() {
  const [page, setPage] = useState(0);

  return (
    <Layout hidePadding>
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
    </Layout>
  );
}

export default HomePage;
