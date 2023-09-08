import { useAuth0 } from "@auth0/auth0-react";
// import { useContext } from "react";
import BlueButton from "../components/Buttons/FormButton";
import LogoutButton from "../components/Buttons/LogoutButton";
// import { UserContext } from "../context/UserContext";

function HomePage() {
  const { loginWithRedirect /*isAuthenticated*/ } = useAuth0();

  // const user = useContext(UserContext);

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
