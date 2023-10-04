import {
  Flex,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { LazyMotion, domMax, m } from "framer-motion";
import ReactDOM from "react-dom";
import { trackEvent } from "../core/analytics";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MotionFlex = m(Flex);

const PrivacyPolicyPage = ({ isOpen, onClose }: Props) => {
  const mounter = document.getElementById("mounter");
  const backgroundColor = "#FFF9C4";

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
              page_type: "Privacy Policy",
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
              page_type: "Privacy Policy",
            });
          }}
        >
          <ArrowLeftIcon />
        </Flex>
        <Flex direction="column" gridRowGap="3rem" textAlign="left" mb="1rem">
          <Text textStyle="heading.h1" textAlign="center">
            Privacy Policy
          </Text>
          <OrderedList textStyle="heading.h2" spacing="3rem" ml="2.5rem">
            <ListItem>
              <Text textStyle="heading.h2">Purpose and objective</Text>
              <br />
              <Text textStyle="body">
                BetterLabs Pty Ltd (ACN 620 505 615) trading as Hearth (
                <Text as="span" fontWeight={500}>
                  Heart
                </Text>
                h,{" "}
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
                ) is committed to protecting and upholding your privacy and
                dignity in our handling of personal information. This Privacy
                Policy (
                <Text as="span" fontWeight={500}>
                  Policy
                </Text>
                ) outlines how we collect, use and disclose information about
                you when you access or use our website or mobile application
                (including when you contact our customer service team, engage
                with us on social media, or otherwise interact with us about our
                website or mobile application) (
                <Text as="span" fontWeight={500}>
                  Services
                </Text>
                ).
              </Text>
              <br />
              <Text textStyle="body">
                Hearth maintains and uses personal information in accordance
                with the Australian Privacy Principles contained in the Privacy
                Act 1988 (Cth) (
                <Text as="span" fontWeight={500}>
                  Australian Privacy Law
                </Text>
                ). Any personal information that we collect, we keep strictly
                confidential and it can only be accessed by authorised staff
                within Hearth and our related and subsidiary companies. Any of
                our agents, contractors and other third parties, who require
                your personal information to provide a legitimate service, are
                bound by terms in their contracts to comply with Australian
                Privacy Law at all times.
              </Text>
              <br />
              <Text textStyle="body">
                For further information about our privacy practices, or to
                access or correct your personal information, or make a
                complaint, please contact our Privacy Officer using the details
                set out below: <br />
                Name: Eduardo Morales <br />
                Email: hello@hearthtogether.com
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Scope</Text>
              <br />
              <Text textStyle="body">
                The Policy describes the type of information obtained from you
                and the way in which it is managed, including:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    Why and how we collect personal information;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    How we may used or disclose personal information;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    How you may request to access or correct your personal
                    information and seek the correction of that information; and
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    How you may complain about our privacy practices and how we
                    will deal with such a complaint.
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Types of personal information</Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'3.1'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Personal information
              </Text>
              <br />
              <Text textStyle="body">
                Personal information is information or an opinion (whether true
                or untrue) about an individual whose identity is apparent or can
                reasonably be ascertained. To be classed as ‘personal
                information’, the information must relate to a natural living
                person.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                When you use our Services we may collect the following types of
                personal information from you:{" "}
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">Your name; </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Your partner’s name;</Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Your location; </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Your app usage; and </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Your email address.</Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'3.2'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Your email address. Financial information
              </Text>
              <br />
              <Text textStyle="body">
                When you purchase our Services you will be required to provide
                your financial information, such as your bank details.
              </Text>
              <br />
              <Text textStyle="body">
                Payments are processed by a third party banking merchant (
                <Text as="span" fontWeight={500}>
                  Banking Merchant
                </Text>
                ). While we do not collect or store your financial information,
                the Banking Merchant and Hearth may exchange information about
                you as is necessary for the purpose of providing you the
                Services. Please refer to the Privacy Policy and Terms and
                Conditions of the Banking Merchant which are available to you
                prior to finalising your payment.
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'3.3'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Sensitive information
              </Text>
              <br />
              <Text textStyle="body">
                Sensitive personal information includes information or an
                opinion about matters like your health, sexual orientation or
                practices, criminal history or racial or ethnic origin. In
                limited circumstances, we need to collect this information from
                you to assist you.
              </Text>
              <br />
              <Text textStyle="body">
                We will not collect sensitive information about you unless you
                consent to the collection and it is directly related to our
                activities.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                If any unsolicited sensitive information is received by us, we
                will deal with it in accordance with our obligations under
                Australian Privacy Law.{" "}
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'3.4'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Digital tracking information
              </Text>
              <br />
              <Text textStyle="body">
                We use technologies to collect information, including standard
                log files, cookies and web beacons.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We may collect information about relating to your when you use
                our Services, which include the type of web browser you use, app
                version, access times and dates, pages viewed, your IP address
                and the page you visited before navigating to our website.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                Cookies (and other similar tracking technologies) help us
                provide you with a better website, by enabling us to monitor
                which pages you find useful and which you do not. Cookies do not
                us give access to your computer or any information about you,
                other than the data you choose to share with us. You can choose
                to decline cookies by modifying your browser settings.
              </Text>
              <br />
              <Text textStyle="body">
                For more information about our website and mobile application
                terms and conditions, please refer to the document “Terms of
                Use” (available on our website).
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Variation to the Terms and Services
              </Text>
              <br />
              <Text textStyle="body">
                Hearth will only collect personal information about you for the
                purpose of:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    providing you with the Services of your choice;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    ongoing administration and management of the Services and
                    related business functions;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    handling complaints and incidents and comply with quality
                    assurance procedures; and{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    complying with our legal obligations; and{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    communicating with you about other services and events
                    offered us, news, gifts or other information we think will
                    be of interest to you, your feedback about our Services. (To
                    opt-out of our marketing messages, please refer below.)
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Why do we collect personal information?{" "}
              </Text>
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
              <Text textStyle="heading.h2">
                How do we collect this information?{" "}
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    Except with the written consent of Health, you may only use
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
              <Text textStyle="heading.h2">
                How do we disclose your personal information?
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Transferring your information overseas
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Direct Marketing</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Accuracy of our information</Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                How do we protect personal information?
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The Services uses cookies, tracking pixels and related
                    technologies.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Cookies are small data files that are served by our platform
                    and stored on your device. The Services uses cookies dropped
                    by us or third parties for a variety of purposes including
                    to operate and personalise the Services and Content. Also,
                    cookies may be used to track how you use the Services to
                    target ads to you on other websites.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You can disable the use of the cookies by changing your web
                    browser settings.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Can you get access to access and/or correct your personal
                information?
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The Services may contain links to other web sites (including
                    banner advertisements and sponsored links) controlled by
                    third parties and resources provided by third parties (
                    <Text as="span" fontWeight={500}>
                      Third Party Website and Resources
                    </Text>
                    ), these links are provided for your information only. Such
                    links should not be interpreted as approved by us of those
                    linked websites or information you may obtain from them.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth is not responsible for any content on, or in, Third
                    Party Website and Resources. If you choose to visit, or use,
                    a Third Party Website and Resources you do so at your own
                    risk and subject to the terms and conditions of use of the
                    Third Part Website and Resources. You should make your own
                    enquiries before relying on any content contained on, or in,
                    a Third Party Website and Resources.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth makes no representations or warranties, whether
                    express or implied, about the quality or accuracy of
                    material available on, or in, a Third Party Website and
                    Resources, or that such material does not infringe the
                    intellectual property rights of a third party.{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                What can you do if you have a complaint?
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The Services and the Content are protected by copyright laws
                    and treaties around the world. All such rights are reserved.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You may print off one copy, and may download extracts, of
                    any page(s) from the Services for your personal use and you
                    may draw the attention of others to the Services or Content
                    posted on the Services. You must not modify the paper or
                    digital copies of any materials you have printed off or
                    downloaded in any way, and you must not use any
                    illustrations, photographs, video or audio sequences or any
                    graphics separately from any accompanying text.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Our status (and that of any identified contributors) as the
                    authors of the Services and Content must always be
                    acknowledged.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You must not use any part of the Content for commercial
                    purposes without obtaining a licence to do so from us or our
                    licensors.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If you print off, copy or download any part of the Services
                    or the Content in breach of these Terms, your right to use
                    the Services and the Content will cease immediately and you
                    must, at our option, return or destroy any copies of the
                    materials you have made.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If we provide social media features such as the ability to
                    share content, you may take such actions as are enabled by
                    such features.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You must not delete or alter any copyright, trade mark or
                    other proprietary rights notices from copies of materials
                    from the Services.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You warrant and represent to Hearth that you are the owner
                    of, or have a licence to use, Your Content and any and all
                    images/documents that you upload to the Services (
                    <Text as="span" fontWeight={500}>
                      User Images
                    </Text>
                    ). You indemnify and keep harmless Hearth against any and
                    all claims for loss, cost, liability or damage that Hearth
                    may incur either directly or indirectly as a result of the
                    use or publication of Your Content or of any uploaded image.{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                What if this Privacy Policy is amended?
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The trade marks and all related names, logos, product and
                    service names, designs and slogans are our trade marks or
                    the trade marks of our affiliates or licensors (whether or
                    not registered).
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You must not use such marks without our prior written
                    permission unless they are part of material you are using as
                    per clause 12(b).{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Other names, logos, product and service names, designs and
                    slogans on the Services are the trade marks of their
                    respective owners and are used by us under licence.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
          </OrderedList>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default PrivacyPolicyPage;
