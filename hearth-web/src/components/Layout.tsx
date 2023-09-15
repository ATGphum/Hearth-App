import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingPage from "../pages/LoadingPage";
import { LayoutNoRedirect } from "./LayoutNoRedirect";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
}

export const Layout = ({ children, hidePadding }: Props) => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // show loading page while user data is retrieving or 2 seconds is up
  if (!user || !journeys || isLoading) return <LoadingPage />;

  // show user form if essential fields are not present
  if (
    !user.first_name ||
    !user.last_name ||
    !user.partner_first_name ||
    !user.partner_last_name
  )
    navigate("/create-user");

  return (
    <LayoutNoRedirect hidePadding={hidePadding}>{children}</LayoutNoRedirect>
  );
};
