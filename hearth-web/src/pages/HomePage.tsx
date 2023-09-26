import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import Library from "./Library";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Today from "./Today";
import { trackEvent } from "../core/analytics";

function HomePage() {
  const [page, setPage] = useState(0);

  const trackPageSwitch = (pageNumber: number) => {
    switch (pageNumber) {
      case 0:
        trackEvent({ type: "View Today Page" });
        break;
      case 1:
        trackEvent({ type: "View Library Page" });
        break;
      case 2:
        trackEvent({ type: "View Profile Page" });
        break;
      default:
        break;
    }
  };

  return (
    <LayoutNoRedirect
      hidePadding
      bg={
        page === 1
          ? "linear-gradient(175deg, #FFBE7E 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)"
          : undefined
      }
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
            <Profile />
          </Flex>
        )}
      </Flex>
      <NavBar
        selectedPage={page}
        tabChange={(pageNumber: number) => {
          setPage(pageNumber);
          trackPageSwitch(pageNumber);
        }}
      />
    </LayoutNoRedirect>
  );
}

export default HomePage;
