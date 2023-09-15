import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import { Experience, Journey } from "../core/types";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  journeyToDo: Journey | undefined;
  experienceToDo: Experience | undefined;
};

const UserContext = createContext<ContextProps>({
  journeyToDo: undefined,
  experienceToDo: undefined,
});

const UserProvider = ({ children }: Props) => {
  const { mutate: userMutate } = useCurrentUserProfile();

  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

  // store auth0 access token in memory
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          window.localStorage.setItem("acAccessToken", token);
          userMutate();
        })
        .catch((e) => {
          console.error("Error fetching access token", e);
        });
    } else if (!isLoading) {
      window.localStorage.removeItem("acAccessToken");
    }
  }, [isAuthenticated, getAccessTokenSilently, userMutate, isLoading]);

  const { data: journeys } = useJourneys();
  const [experienceToDo, setExperienceToDo] = useState<
    Experience | undefined
  >();
  const [journeyToDo, setJourneyToDo] = useState<Journey | undefined>();

  useEffect(() => {
    if (journeys) {
      const sortedJourneys = [...journeys].reverse();

      // Find the highest-level journey that's available
      const availableJourney = sortedJourneys.find((j) => j.is_available);

      if (availableJourney) {
        // Find the highest-level experience that's available in the found journey
        const sortedExperiences = [...availableJourney.experiences].reverse();
        const experience = sortedExperiences.find((e) => e.is_available);
        setJourneyToDo(availableJourney);
        setExperienceToDo(experience);
      }
    }
  }, [journeys]);

  return (
    <UserContext.Provider value={{ experienceToDo, journeyToDo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
