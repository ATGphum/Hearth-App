import { Suspense, lazy, useEffect } from "react";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = lazy(() => import("../pages/HomePage"));
const UserCreateForm = lazy(() => import("../pages/HomePage"));

const Tree = () => {
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);

  // show loading page while user data is retrieving or 2 seconds is up
  if (!user || !journeys) return <LoadingPage />;

  // show user form if essential fields are not present
  if (
    !user.first_name ||
    !user.last_name ||
    !user.partner_first_name ||
    !user.partner_last_name
  )
    return (
      <Suspense fallback={<LoadingPage />}>
        <UserCreateForm />
      </Suspense>
    );

  return (
    <Suspense fallback={<LoadingPage />}>
      <HomePage />
    </Suspense>
  );
};

export default Tree;
