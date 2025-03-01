import {
  Collapse,
  Flex,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  useDragControls,
} from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../context/UserContext";
import { useCurrentUserProfile, useJourneys } from "../core/apiHooks";
import { formatTime } from "../core/helpers";
import { Category, Experience, Journey, UserExperience } from "../core/types";
import CrossIcon from "../icons/CrossIcon";
import DownIcon from "../icons/DownIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import RewindBackIcon from "../icons/RewindBackIcon";
import RewindFowardIcon from "../icons/RewindForwardIcon";
import UpIcon from "../icons/UpIcon";
import { createUserExperience } from "../core/api";
import UnlockIcon from "../icons/UnlockIcon";
import SubscriptionsDrawer from "./SubscriptionsDrawer";
import { trackEvent } from "../core/analytics";
import Spinner from "./Spinner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openedExperience: Experience;
  parentCourse: Journey | Category;
}

const MotionFlex = m(Flex);

const MusicDrawer = ({
  isOpen,
  onClose,
  openedExperience,
  parentCourse,
}: Props) => {
  const { mutate: journeyMutate } = useJourneys();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isCompletedNewExp, setIsCompletedNewExp] = useState(false);
  const [isLastExpInJourney, setIsLastExpInJourney] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [firstPlayTriggered, setFirstPlayTriggered] = useState(false);
  const [isMusicLoaded, setIsMusicLoaded] = useState(false);
  // isToggling only used to determine if dragging is being undergone
  // to protect from pausing the music when it is being dragged in app
  // as when the music is paused from ios controls we need to update
  // the component playing state as done in the audio component
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showText, setShowText] = useState(true);

  const { experienceToDo, journeyToDo } = useContext(UserContext);

  const { data: user } = useCurrentUserProfile();

  //force audio to load on ios devices
  useEffect(() => {
    audioRef.current && audioRef.current.load();
  }, []);

  useEffect(() => {
    if ("mediaSession" in navigator && journeyToDo) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: openedExperience.name,
        artist: "Hearth",
        album: journeyToDo.name,
        artwork: [
          {
            src: openedExperience.image_link,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying(true);
        audioRef.current?.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying(false);
        audioRef.current?.pause();
      });
    }
  }, [journeyToDo, openedExperience.image_link, openedExperience.name]);

  // logic for when audio ends
  const handleAudioEnded = async () => {
    // if it is latest experience in progress, create new link
    if (openedExperience.id === experienceToDo?.id && user) {
      const userExperience: Partial<UserExperience> = {
        experience_id: openedExperience.id,
        user_id: user.id,
      };
      // check if the experience was last in course
      if (journeyToDo) {
        const allExps = journeyToDo.experiences;
        const lastExp = allExps[allExps.length - 1];
        if (lastExp.id === openedExperience.id) {
          createUserExperience(userExperience, true, journeyToDo.id);
          setIsLastExpInJourney(true);
        } else {
          createUserExperience(userExperience);
        }
        setIsCompletedNewExp(true);
      }

      trackEvent({
        type: "Complete Experience",
        journey_name: parentCourse.name,
        experience_name: experienceToDo?.name ?? "",
        user_id: user.id,
        email: user.email,
        name: user.first_name ?? "" + user.last_name ?? "",
        partner_name:
          user.partner_first_name ?? "" + user.partner_last_name ?? "",
      });
    }
  };

  const handleLoadedData = () => {
    audioRef.current && setDuration(audioRef.current.duration);
    setIsMusicLoaded(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
      setShowText(false);

      if (!firstPlayTriggered && user) {
        setFirstPlayTriggered(true);
        trackEvent({
          type: "Start Experience",
          journey_name: parentCourse.name,
          experience_name: experienceToDo?.name ?? "",
          user_id: user.id,
          email: user.email,
          name: user.first_name ?? "" + user.last_name ?? "",
          partner_name:
            user.partner_first_name ?? "" + user.partner_last_name ?? "",
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    audioRef.current && setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeekChange = (value: number) => {
    setCurrentTime(value);
  };

  // pause audio while playing!
  const handleSeekStart = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    }
  };

  const handleSeekEnd = useCallback(
    (value: number) => {
      if (audioRef.current) audioRef.current.currentTime = value;
      setCurrentTime(value);
      if (isPlaying) {
        audioRef.current?.play();
      }
    },
    [isPlaying]
  );

  const rewind = () => {
    if (audioRef.current) audioRef.current.currentTime = currentTime - 10;
    setCurrentTime(currentTime - 10);
    if (isPlaying) audioRef.current?.play();
  };

  const forward = () => {
    if (audioRef.current) audioRef.current.currentTime = currentTime + 10;
    setCurrentTime(currentTime + 10);
  };

  useEffect(() => {
    if (!isOpen) {
      handleSeekEnd(0);
      setShowText(true);
      setIsPlaying(false);
    }
  }, [isOpen, handleSeekEnd]);

  const closeFunction = async () => {
    if (isPlaying) togglePlay();
    // if this is slow in production, add function to optimistically update
    journeyMutate();
    onClose();
  };

  const pictureVariants = {
    expanded: {
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
    shrunk: {
      paddingRight: "0rem",
      paddingLeft: "0rem",
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      display: "none",
    },
    visible: {
      opacity: 1,
      marginTop: "0rem",
      paddingTop: "1rem",
      display: "block",
    },
  };

  const {
    isOpen: subscriptionsIsOpen,
    onOpen: subscriptionsOnOpen,
    onClose: subscriptionsOnClose,
  } = useDisclosure();

  const controls = useDragControls();

  const mounter = document.getElementById("mounter");
  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        dragListener={false}
        dragControls={controls}
        initial={{ y: "100%" }}
        animate={{
          y: isOpen ? "0%" : "100%",
        }}
        exit={{ y: "100%" }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.8 }}
        onDragEnd={async (_, info) => {
          if (info.velocity.y > 20) {
            await closeFunction();
          }
        }}
        drag="y"
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        overflowY={"auto"}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
        background={`linear-gradient(175deg, ${openedExperience.color} 3.42%, #F4D9BB 64.78%, #F0D5BA 96.64%)`}
        p={0}
        maxHeight={"100vh"}
        textAlign={"left"}
        zIndex={15}
      >
        <AnimatePresence>
          {subscriptionsIsOpen && (
            <SubscriptionsDrawer
              onClose={subscriptionsOnClose}
              isOpen={subscriptionsIsOpen}
            />
          )}
        </AnimatePresence>
        <Flex
          onPointerDown={(e) => controls.start(e)}
          style={{ touchAction: "none" }}
          direction="column"
          justifyContent={"space-between"}
          flexGrow={1}
          flexShrink={1}
          minHeight={0}
        >
          <Flex justifyContent={"flex-end"}>
            <Flex
              className="ios-disable-highlight"
              onClick={closeFunction}
              p="1rem"
            >
              <CrossIcon />
            </Flex>
          </Flex>
          <Flex
            direction="column"
            flexShrink={1}
            minHeight={0}
            alignItems={"center"}
            justifyContent={"center"}
            flexGrow={1}
            pt={isCompletedNewExp ? "1rem" : undefined}
            bg={
              isCompletedNewExp
                ? `linear-gradient(167deg, ${journeyToDo?.color} 9.42%, rgba(240, 88, 252, 0.00) 100.4%)`
                : "#ffffff00"
            }
            m={isCompletedNewExp ? "2rem" : undefined}
            borderRadius="1.5625rem"
          >
            <MotionFlex
              minHeight={0}
              flexShrink={1}
              justifyContent={"center"}
              initial="expanded"
              animate={isCompletedNewExp ? "shrunk" : "expanded"}
              variants={pictureVariants}
            >
              <Image
                height="100%"
                maxHeight={"90vw"}
                src={openedExperience.image_link}
                objectFit={"contain"}
                className={`musicImage ${!isPlaying ? "musicImagePaused" : ""}`}
              />
            </MotionFlex>
            {isCompletedNewExp && (
              <MotionFlex
                initial="hidden"
                animate={isCompletedNewExp ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.5 }}
                textAlign={"center"}
              >
                <Text textStyle="heading.h1">Congratulations!</Text>
                <Text textStyle="body" p="0.5rem 1rem 1rem 1rem">
                  {isLastExpInJourney
                    ? `You completed the ${journeyToDo?.name}!`
                    : experienceToDo?.level === 0
                    ? `You have completed the introduction of the ${journeyToDo?.name}`
                    : `You completed day ${experienceToDo?.level} of the ${journeyToDo?.name}!`}
                </Text>
              </MotionFlex>
            )}
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <Flex
            onClick={() => setShowText(!showText)}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p="1rem"
          >
            <Flex direction="column">
              <Text textStyle={"body.small"}>{parentCourse.name}</Text>
              <Text textStyle={"heading.h1"}>{openedExperience.name}</Text>
              <Text textStyle={"detailTextSmall"}>
                {openedExperience.duration} min.
              </Text>
            </Flex>
            {showText ? <DownIcon /> : <UpIcon />}
          </Flex>
          <Collapse in={showText}>
            <Flex
              direction="column"
              p="0 1rem 1rem 1rem"
              gridRowGap="0.5rem"
              maxHeight="12rem"
              overflow="auto"
            >
              <Text textStyle="bodySmall">Description</Text>
              <Text textStyle="body" whiteSpace="pre-line">
                {openedExperience.description}
              </Text>
              <Text textStyle="detailText">{openedExperience.study}</Text>
              <Text textStyle="bodySmall">Activity type</Text>
              <Text textStyle="body">{openedExperience.activity_type}</Text>
            </Flex>
          </Collapse>
          <Flex
            direction="column"
            background={
              "linear-gradient(144deg, rgba(250, 137, 4, 0.25) 21.07%, rgba(250, 151, 4, 0.00) 83.54%)"
            }
            alignItems="center"
            pt="1rem"
            px="1rem"
            pb="2rem"
            gridRowGap="1rem"
          >
            <Flex direction={"column"} width={"100%"}>
              <audio
                ref={audioRef}
                src={openedExperience.audio_link}
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
                preload="auto"
              />
              <Slider
                aria-label="audio-slider"
                value={currentTime}
                max={duration}
                step={0.01}
                onChange={handleSeekChange}
                onChangeStart={handleSeekStart}
                onChangeEnd={handleSeekEnd}
                size={"sm"}
              >
                <SliderTrack width={"3rem"} bg="neutral.black">
                  <SliderFilledTrack bg={"neutral.black"} />
                </SliderTrack>
                <SliderThumb
                  sx={{
                    "&:focus-visible": {
                      boxShadow: "none",
                    },
                  }}
                  boxSize={6}
                  mt="1px"
                  bg="brand.secondary"
                />
              </Slider>
              <Flex width="100%" justifyContent={"space-between"}>
                <Text textStyle="bodySmall">{formatTime(currentTime)}</Text>
                <Text textStyle="bodySmall">
                  {formatTime(duration - currentTime)}
                </Text>
              </Flex>
            </Flex>
            {parentCourse.subscription_required &&
            !user?.stripe_subscription_id ? (
              <Flex
                width={"100%"}
                justifyContent={"center"}
                gridColumnGap="0.5rem"
                alignItems={"center"}
                borderRadius="40px"
                border="1px solid"
                borderColor={"neutral.black"}
                padding="0.625rem 1rem"
                onClick={subscriptionsOnOpen}
              >
                <UnlockIcon />
                <Text textStyle="action" onClick={() => {}}>
                  Subscribe to unlock.
                </Text>
              </Flex>
            ) : (
              <Flex width={"100%"} justifyContent={"space-around"}>
                {isMusicLoaded && (
                  <Flex
                    className="ios-disable-highlight"
                    height="3rem"
                    alignItems={"center"}
                    direction="column"
                    justifyContent={"center"}
                    onClick={rewind}
                  >
                    <RewindBackIcon />
                    <Text textStyle={"detailTextSmall"}>10 sec.</Text>
                  </Flex>
                )}
                <Flex
                  className="ios-disable-highlight"
                  onClick={() => isMusicLoaded && togglePlay()}
                  alignItems={"center"}
                  mb="1rem"
                  height="2rem"
                  width="2rem"
                >
                  {!isMusicLoaded ? (
                    <Spinner />
                  ) : isPlaying ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </Flex>
                {isMusicLoaded && (
                  <Flex
                    className="ios-disable-highlight"
                    height="3rem"
                    alignItems={"center"}
                    direction="column"
                    justifyContent={"center"}
                    onClick={forward}
                  >
                    <RewindFowardIcon />
                    <Text textStyle={"detailTextSmall"}>10 sec.</Text>
                  </Flex>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default MusicDrawer;
