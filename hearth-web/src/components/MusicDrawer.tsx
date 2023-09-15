import {
  Collapse,
  Flex,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CrossIcon from "../icons/CrossIcon";
import DownIcon from "../icons/DownIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import RewindBackIcon from "../icons/RewindBackIcon";
import RewindFowardIcon from "../icons/RewindForwardIcon";
import UpIcon from "../icons/UpIcon";
import { Experience, Journey } from "../core/types";
import { formatTime } from "../core/helpers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openedExperience: Experience;
  parentCourse: Journey;
}

const MotionFlex = m(Flex);

const MusicDrawer = ({
  isOpen,
  onClose,
  openedExperience,
  parentCourse,
}: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showText, setShowText] = useState(true);

  // logic for when audio ends
  useEffect(() => {
    const audioEl = audioRef.current;

    const handleAudioEnded = () => {
      console.log("Audio has ended!");
      // Trigger any other function or logic you need here
    };

    if (audioEl) {
      audioEl.addEventListener("ended", handleAudioEnded);

      // Cleanup listener when component unmounts
      return () => {
        audioEl.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, []);

  const handleLoadedData = () => {
    audioRef.current && setDuration(audioRef.current.duration);
  };
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
    setShowText(false);
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
    if (audioRef.current) audioRef.current.currentTime = currentTime - 15;
    setCurrentTime(currentTime - 15);
    if (isPlaying) audioRef.current?.play();
  };

  const forward = () => {
    if (audioRef.current) audioRef.current.currentTime = currentTime + 15;
    setCurrentTime(currentTime + 15);
  };

  useEffect(() => {
    if (!isOpen) {
      handleSeekEnd(0);
      setShowText(true);
      setIsPlaying(false);
    }
  }, [isOpen, handleSeekEnd]);

  const mounter = document.getElementById("mounter");
  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <MotionFlex
        initial={{ y: "100%" }}
        animate={{
          y: isOpen ? "0%" : "100%",
        }}
        exit={{ y: "100%" }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 0) {
            onClose();
          }
        }}
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
        <Flex justifyContent={"flex-end"}>
          <Flex
            onClick={() => {
              if (isPlaying) togglePlay();
              onClose();
            }}
            p="1rem"
          >
            <CrossIcon />
          </Flex>
        </Flex>
        <Flex px="1rem" minHeight={0} flexShrink={1} justifyContent={"center"}>
          <Image
            height="100%"
            maxHeight={"100%"}
            src={openedExperience.image_link}
            objectFit={"contain"}
          />
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
            <Flex direction="column" p="0 1rem 1rem 1rem" gridRowGap="0.5rem">
              <Text textStyle="bodySmall">Description</Text>
              <Text textStyle="body">{openedExperience.description}</Text>
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
            p="1rem"
            px="1.5rem"
            gridRowGap="1rem"
          >
            <Flex direction={"column"} width={"100%"}>
              <audio
                ref={audioRef}
                src={openedExperience.audio_link}
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
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
            <Flex
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex
                height="3rem"
                alignItems={"center"}
                direction="column"
                justifyContent={"center"}
                onClick={rewind}
              >
                <RewindBackIcon />
                <Text textStyle={"detailTextSmall"}>15 sec.</Text>
              </Flex>
              <Flex onClick={togglePlay} height="3rem" alignItems={"center"}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Flex>

              <Flex
                height="3rem"
                alignItems={"center"}
                direction="column"
                justifyContent={"center"}
                onClick={forward}
              >
                <RewindFowardIcon />
                <Text textStyle={"detailTextSmall"}>15 sec.</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default MusicDrawer;
