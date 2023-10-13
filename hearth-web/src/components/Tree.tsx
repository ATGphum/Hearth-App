import { Suspense, lazy } from "react";
import {
  useCategories,
  useCurrentUserProfile,
  useJourneys,
} from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const UserCreateForm = lazy(() => import("../pages/UserCreateForm"));

const Tree = () => {
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();
  const { data: categories } = useCategories();

  // show loading page while user data is retrieving or 2 seconds is up
  // essentially load the categries into cache but no active need to hide them behind LoadingPage
  if (!user || !journeys || !categories) return <LoadingPage />;

  // show user form if essential fields are not present
  if (
    !user.first_name ||
    !user.last_name ||
    !user.partner_first_name ||
    !user.partner_last_name
  ) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <UserCreateForm />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<LoadingPage />}>
      <HomePage />
    </Suspense>
  );
};

export default Tree;
