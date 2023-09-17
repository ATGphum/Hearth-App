import { useNavigate } from "react-router-dom";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";
import { LayoutNoRedirect } from "./LayoutNoRedirect";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
}

export const Layout = ({ children, hidePadding }: Props) => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

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
    navigate("/create-user");

  return (
    <LayoutNoRedirect hidePadding={hidePadding}>{children}</LayoutNoRedirect>
  );
};
