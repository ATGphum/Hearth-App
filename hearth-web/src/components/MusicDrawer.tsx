import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  SlideFade,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import RewindBackIcon from "../icons/RewindBackIcon";
import RewindFowardIcon from "../icons/RewindForwardIcon";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MusicDrawer = ({ isOpen, onClose }: Props) => {
  const url =
    "https://ia600907.us.archive.org/0/items/tvtunes_21704/Naruto%20Shippuden%20-%20Sadness%20and%20Sorrow%20-%20Full.mp3";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showText, setShowText] = useState(true);

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

  const handleSeekEnd = (value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value;
    setCurrentTime(value);
    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  const rewind = () => {
    if (audioRef.current) audioRef.current.currentTime = currentTime - 15;
    setCurrentTime(currentTime - 15);
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

  return (
    <Drawer placement={"bottom"} isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent maxHeight={"100vh"}>
        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent={"space-between"}
          background="linear-gradient(175deg, #F058FC 3.42%, #F4D9BB 64.78%, #F0D5BA 96.64%)"
          p={0}
          maxHeight={"100vh"}
        >
          <Flex justifyContent={"flex-end"}>
            <Flex onClick={onClose} p="1rem">
              <DownIcon />
            </Flex>
          </Flex>
          <Flex
            px="1rem"
            minHeight={0}
            flexShrink={1}
            justifyContent={"center"}
          >
            <Image
              height="100%"
              maxHeight={"100%"}
              src={
                "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
              }
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
                <Text textStyle={"body.small"}>Collection name</Text>
                <Text textStyle={"heading.h1"}>Content name</Text>
                <Text textStyle={"detailTextSmall"}>3 min.</Text>
              </Flex>
              {showText ? <DownIcon /> : <UpIcon />}
            </Flex>
            <Collapse in={showText}>
              <Flex direction="column" p="0 1rem 1rem 1rem" gridRowGap="0.5rem">
                <Text textStyle="bodySmall">Description</Text>
                <Text textStyle="body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text textStyle="bodySmall">Activity type</Text>
                <Text textStyle="body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Flex>
            </Collapse>
            <Flex
              direction="column"
              background={
                "linear-gradient(144deg, rgba(250, 137, 4, 0.25) 21.07%, rgba(250, 151, 4, 0.00) 83.54%)"
              }
              alignItems="center"
              p="1rem"
              gridRowGap="1rem"
            >
              <audio
                ref={audioRef}
                src={url}
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
                <SliderThumb boxSize={6} mt="1px" bg="brand.secondary" />
              </Slider>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MusicDrawer;
