import { UnorderedList, Flex, Image, Text, ListItem } from "@chakra-ui/react";
import PinkWorld from "../svg/pink-world.svg";
import { useAuth0 } from "@auth0/auth0-react";
import ShapeOne from "../components/buttons/shape-one";
import LoadingPage from "./LoadingPage";
import BlueButton from "../components/buttons/FormButton";
import { useCurrentUserProfile } from "../core/apiHooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import LogoutButton from "../components/buttons/LogoutButton";
import { Layout } from "../components/Layout";

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const user = useContext(UserContext);

  return (
    <Layout>
      <LogoutButton />
      <BlueButton
        text="Sign up for the free challenge"
        callback={() => {
          loginWithRedirect();
        }}
      />
    </Layout>
  );
}

export default HomePage;
