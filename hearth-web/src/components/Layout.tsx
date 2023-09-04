import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Image } from "@chakra-ui/react";
import logo from "../assets/logo.svg";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      backgroundColor="flesh.background"
      width="100vw"
      minHeight="100vh"
      padding="3"
    >
      <Flex
        direction="column"
        justifyContent={"center"}
        //    height="2.5rem"
      >
        <Image src={logo} alt="Hearth" />
      </Flex>
      {children}
    </Flex>
  );
};
