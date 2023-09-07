import { UnorderedList, Flex, Image, Text, ListItem } from "@chakra-ui/react";
import PinkWorld from "../svg/pink-world.svg";
import { useAuth0 } from "@auth0/auth0-react";
import ShapeOne from "../components/Buttons/shape-one";
import LoadingPage from "./LoadingPage";
import BlueButton from "../components/Buttons/BlueButton";
import { useCurrentUserProfile } from "../core/apiHooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import LogoutButton from "../components/Buttons/LogoutButton";

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const user = useContext(UserContext);

  return (
    <>
      <LogoutButton />
      <BlueButton
        text="Sign up for the free challenge"
        callback={() => {
          loginWithRedirect();
        }}
      />
    </>
  );
}

export default HomePage;
