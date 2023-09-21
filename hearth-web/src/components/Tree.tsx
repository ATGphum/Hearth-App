import { useEffect, useState, Suspense, lazy } from "react";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const UserCreateForm = lazy(() => import("../pages/UserCreateForm"));

export const Tree = () => {
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  const [isVisible, setIsVisible] = useState(true);

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
