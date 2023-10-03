import { Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { LazyMotion, domMax, m } from "framer-motion";
import ReactDOM from "react-dom";
import { trackEvent } from "../core/analytics";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const TermsAndConditionsPage = ({ isOpen, onClose }: Props) => {
  const mounter = document.getElementById("mounter");
  const backgroundColor = "#B694F7";

  if (!mounter) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domMax}>
      <MotionFlex
        initial={{ x: "100%" }}
        animate={{
          x: isOpen ? "0%" : "100%",
        }}
        exit={{ x: "100%" }}
        drag={"x"}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 20 && info.offset.x > 50) {
            onClose();

            // Amplitude track event
            trackEvent({
              type: "Close Page",
              page_type: "Terms and Conditions",
            });
          }
        }}
        transition={{ damping: 0 }}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        overflowY={"auto"}
        direction="column"
        width="100%"
        display="flex"
        flexDirection="column"
        background={`linear-gradient(175deg, ${backgroundColor} 3.42%, #F4D9BB 48.04%, #F0D5BA 96.64%)`}
        p={"1rem"}
        zIndex={11}
      >
        <Flex
          onClick={() => {
            onClose();

            // Amplitude track event
            trackEvent({
              type: "Close Page",
              page_type: "Terms and Conditions",
            });
          }}
        >
          <ArrowLeftIcon />
        </Flex>
        <Flex direction="column" gridRowGap="3rem" textAlign="left">
          <Text textStyle="heading.h1" textAlign="center">
            Terms of Use
          </Text>
          <OrderedList textStyle="heading.h2" spacing="3rem" ml="2.5rem">
            <ListItem>
              <Text textStyle="heading.h2">General</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    These Terms of Use, including our Privacy Policy (
                    <Text as="span" fontWeight={500}>
                      Terms
                    </Text>
                    ) govern your use of the website,
                    https://www.hearthtogether.com and mobile app collectively
                    referred to as the{" "}
                    <Text as="span" fontWeight={500}>
                      Services
                    </Text>
                    .
                  </Text>
                </ListItem>{" "}
                <ListItem>
                  <Text textStyle="body">
                    Please read these Terms carefully before accessing or using
                    the Services.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  If you do not agree to all of these Terms, then you must
                  immediately cease use of and no longer access to:
                </ListItem>
                <OrderedList listStyleType="lower-roman" spacing="0.5rem">
                  <ListItem>
                    <Text textStyle="body">the Services; and </Text>
                  </ListItem>
                  <ListItem>
                    <Text textStyle="body">
                      any of the additional features, such as the ability to
                      create lists or participate in group online chats in the
                      User Account section of the Services (Additional
                      Features).{" "}
                    </Text>
                  </ListItem>
                </OrderedList>
                <ListItem>
                  <Text textStyle="body">
                    If these Terms are considered an offer, acceptance is
                    expressly limited to these Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    BY USING THE SERVICES, YOU ARE DEEMED TO HAVE AGREED TO
                    THESE TERMS.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If you do not agree to be bound by these Terms you must not
                    use the Services.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Please refer to our Privacy Policy for information on how we
                    collect, use and disclose information from our users. You
                    acknowledge and agree that your use of the Services is
                    subject to our Privacy Policy
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Variation to the Terms and Services
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    Hearth may amend, vary or modify these Terms from time to
                    time and at our sole discretion.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    It is your responsibility to review the Terms each and every
                    time you wish to use the Services to ensure that you
                    understand the Terms that apply at that time.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Your continued use of or access of the Services or
                    Additional Features following the posting of any changes to
                    these Terms constitutes acceptance of those changes. For the
                    avoidance of doubt, Hearth will not notify you of these any
                    amendments, variations or modifications to the Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth may update and change the Services from time to time,
                    at our sole discretion, to reflect changes to new
                    information available, our users’ needs, changes in law
                    and/or our business priorities. We will provide reasonable
                    notice of any major changes.{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Ownership</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    BetterLabs Pty Ltd (ACN 620 505 615) trading as Health (
                    <Text as="span" fontWeight={500}>
                      Hearth
                    </Text>
                    ,{" "}
                    <Text as="span" fontWeight={500}>
                      we
                    </Text>
                    ,{" "}
                    <Text as="span" fontWeight={500}>
                      us
                    </Text>{" "}
                    and{" "}
                    <Text as="span" fontWeight={500}>
                      our
                    </Text>
                    ) is the owner or licensee of:{" "}
                  </Text>
                  <OrderedList
                    listStyleType="lower-roman"
                    textStyle="body"
                    spacing="0.5rem"
                  >
                    <ListItem mt="0.5rem">
                      <Text textStyle="body">the Services; and</Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        all intellectual property rights in the Services, and in
                        the material published on it (including but not limited
                        to all data, text, software, images, graphics,
                        trademarks, logos, interfaces, photographs) (
                        <Text as="span" fontWeight={500}>
                          Content
                        </Text>
                        ).
                      </Text>
                    </ListItem>
                  </OrderedList>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth reserves all rights in and to the Services, not
                    expressly granted to you under these Terms.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Use of Services</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    Except with the written consent of Health , you may only use
                    the Services (including the Content) for personal
                    non-commercial purposes.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    The Services and the Content are directed to users who are
                    at least 18 years old, residing within Australia. We do not
                    represent that the Content is appropriate for use or
                    available in other locations. If you access the Services
                    outside Australia, you do so at your own risk and you are
                    responsible for compliance with laws applicable to your
                    accessing the Services from your location.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You may only use the mobile app feature of the Services
                    subject to these Terms. Hearth grants you a limited,
                    non-exclusive, non-transferable, non-sublicensable license
                    to download and install a copy of the mobile app on a mobile
                    device or computer that you own or control and to run such
                    copy of the mobile app solely for your own personal
                    non-commercial purposes.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Additional terms and conditions may also apply to specific
                    parts or features of the Services. All such additional terms
                    and conditions are incorporated by this reference into these
                    Terms.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">User Account</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Purchasing Services</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Additional Features</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                User create, connect, communicate, discover and share
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Prohibited Uses</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Cookies</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Third party websites</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Intellectual Property</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Trade Marks</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Do not rely on information on the Services
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Termination of use</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Suspension of withdrawal of Services
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Limitation of liability</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Governing Law</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Miscellaneous</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Contact us</Text>
            </ListItem>
          </OrderedList>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default TermsAndConditionsPage;
