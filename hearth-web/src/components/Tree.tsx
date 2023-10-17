import { Suspense, lazy } from "react";
import {
  useCategories,
  useCurrentUserProfile,
  useDailyQuote,
  useJourneys,
} from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const UserCreateForm = lazy(() => import("../pages/UserCreateForm"));

const Tree = () => {
  const { data: user } = useCurrentUserProfile();

  const { data: journeys } = useJourneys();

  //prefetch data
  // useCategories();

  // show user form if essential fields are not present
  if (
    user &&
    (!user.first_name ||
      !user.last_name ||
      !user.partner_first_name ||
      !user.partner_last_name)
  ) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <UserCreateForm />
      </Suspense>
    );
  }

  if (!user || !journeys) return <LoadingPage />;

  return (
    <Suspense fallback={<LoadingPage />}>
      <HomePage />
    </Suspense>
  );
};

export default Tree;
