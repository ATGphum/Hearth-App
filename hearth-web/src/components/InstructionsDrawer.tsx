import { Flex } from "@chakra-ui/react";
import { LazyMotion, domMax, m } from "framer-motion";
import ReactDOM from "react-dom";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { getInstallableStatus } from "../core/helpers";
import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";

const DesktopPage = lazy(() => import("../pages/DesktopPage"));
const InstallationPage = lazy(() => import("../pages/InstallationMobilePage"));

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const InstructionsDrawer = ({ isOpen, onClose }: Props) => {
  const installable = getInstallableStatus();

  const mounter = document.getElementById("mounter");

  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        dragDirectionLock
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 20 && info.offset.x > 50) {
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
        bg="background.fleshOpaque"
        p={0}
        // minHeight="100vh"
        minHeight="100%"
        textAlign={"left"}
        zIndex={20}
      >
        <Flex
          flex={1}
          direction="column"
          width="100%"
          background={
            "linear-gradient(180deg, #D4F8A8 0%, rgba(255, 249, 100, 0.00) 90.67%), radial-gradient(41.92% 85.12% at 100% 68.31%, rgba(0, 240, 255, 0.20) 0%, rgba(0, 240, 255, 0.00) 100%), radial-gradient(48.49% 83.29% at 0% 100%, rgba(255, 199, 0, 0.50) 0%, rgba(255, 199, 0, 0.00) 100%), radial-gradient(55.85% 107.38% at 100% 0%, rgba(112, 0, 255, 0.30) 0%, rgba(0, 102, 255, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.32) 0%, rgba(216, 0, 0, 0.00) 100%), linear-gradient(0deg, rgba(252, 112, 68, 0.10) 0%, rgba(252, 112, 68, 0.10) 100%), linear-gradient(180deg, rgba(255, 190, 126, 0.80) 0%, rgba(255, 223, 192, 0.80) 100%)"
          }
        >
          <Flex p="1rem" onClick={onClose}>
            <ArrowLeftIcon />
          </Flex>
          {(installable === "installable" ||
            installable === "non-installable") && (
            <Suspense fallback={<LoadingPage />}>
              <InstallationPage />
            </Suspense>
          )}
          {installable === "desktop" && (
            <Suspense fallback={<LoadingPage />}>
              <DesktopPage />
            </Suspense>
          )}
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default InstructionsDrawer;
