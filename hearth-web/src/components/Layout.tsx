import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";
import { LayoutNoRedirect } from "./LayoutNoRedirect";
import { useEffect, useState } from "react";
import UserCreateForm from "../pages/UserCreateForm";
// import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
}

export const Layout = ({ children, hidePadding }: Props) => {
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  const [isVisible, setIsVisible] = useState(true);
  // const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  // // login guard
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     loginWithRedirect().catch((e) => console.error("Error occurred", e));
  //   }
  // }, [loginWithRedirect, isLoading, isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // show loading page while user data is retrieving or 2 seconds is up
  if (!user || !journeys || isVisible) return <LoadingPage />;

  // show user form if essential fields are not present
  if (
    !user.first_name ||
    !user.last_name ||
    !user.partner_first_name ||
    !user.partner_last_name
  )
    return <UserCreateForm />;

  return (
    <LayoutNoRedirect hidePadding={hidePadding}>{children}</LayoutNoRedirect>
  );
};
