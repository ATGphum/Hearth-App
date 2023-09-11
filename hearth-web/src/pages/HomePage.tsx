import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Slide } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Layout } from "../components/Layout";
import NavBar from "./NavBar";
import Today from "./Today";
import { UserContext } from "../context/UserContext";
import { useSwipeable } from "react-swipeable";
import Library from "../components/Library";

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const user = useContext(UserContext);

  const [page, setPage] = useState(0);

  const swipeZero = useSwipeable({
    onSwipedLeft: () => setPage(1),
  });

  const swipeOne = useSwipeable({
    onSwipedLeft: () => setPage(2),
    onSwipedRight: () => setPage(0),
  });

  const swipeTwo = useSwipeable({
    onSwipedRight: () => setPage(1),
  });

  return (
    <Layout hidePadding>
      <Flex direction="column" flex="1" width="100%">
        {page === 0 && (
          <Flex {...swipeZero} direction="column" flex="1" width="100%">
            <Today />
          </Flex>
        )}
        {page === 1 && (
          <Flex {...swipeOne} direction="column" flex="1" width="100%">
            <Library />
          </Flex>
        )}
        {page === 2 && (
          <Flex {...swipeTwo} direction="column" flex="1" width="100%">
            <Today />
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
