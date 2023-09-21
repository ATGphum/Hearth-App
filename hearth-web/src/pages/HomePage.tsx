import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import Library from "./Library";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Today from "./Today";

function HomePage() {
  const [page, setPage] = useState(0);

  return (
    <LayoutNoRedirect hidePadding>
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
            <Profile />
          </Flex>
        )}
      </Flex>
      <NavBar
        selectedPage={page}
        tabChange={(pageNumber: number) => {
          setPage(pageNumber);
        }}
      />
    </LayoutNoRedirect>
  );
}

export default HomePage;
