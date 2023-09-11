import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingPage from "../pages/LoadingPage";
import { LayoutNoRedirect } from "./LayoutNoRedirect";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
}

export const Layout = ({ children, hidePadding }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // show loading page while user data is retrieving
  if (!user) return;
  <LoadingPage />;
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
