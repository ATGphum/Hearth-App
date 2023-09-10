import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from "../components/Layout";
import BlueButton from "../components/buttons/FormButton";
import LogoutButton from "../components/buttons/LogoutButton";

function HomePage() {
  const { loginWithRedirect /*isAuthenticated*/ } = useAuth0();

  // const user = useContext(UserContext);

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
