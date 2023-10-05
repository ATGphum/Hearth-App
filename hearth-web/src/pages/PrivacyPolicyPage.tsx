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
                Why do we collect personal information?
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
              How do we collect this information?
              <Text textStyle="heading.h2"> </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'5.1'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Directly from you
              </Text>
              <br />
              <Text textStyle="body">
                We collect personal information directly from you when you
                register for a User Account, to access our Services or otherwise
                engage with us.{" "}
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'5.2'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Information from third parties
              </Text>
              <br />
              <Text textStyle="body">
                When a Service is purchased as a gift, we will collect personal
                information from a third party, this is usually your friends and
                relatives.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We also obtain information about you from other sources, such as
                third-party app stores/providers or social media service
                accounts where you have elected to link or use with our
                Services.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We may also obtain information about you from publicly available
                sources.
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'5.3'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Unsolicited information
              </Text>
              <br />
              <Text textStyle="body">
                If we receive your personal information from you or third
                parties which we did not request, we will determine whether we
                are permitted to collect the information in accordance with the
                Privacy Act.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                If we determine that we are not permitted to collect that
                personal information, we will, as soon as practicable, lawfully
                destroy the information or ensure that it is de-identified. If
                we determine that we are permitted to collect the personal
                information, we will ensure that the information is handled with
                in a manner that complies with our obligations under Australian
                Privacy Law.
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'5.4'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Anonymity and pseudonymity
              </Text>
              <br />
              <Text textStyle="body">
                When interacting with us, you may choose to remain anonymous or
                to use a pseudonym. However, in some circumstances, it may not
                be possible for us to properly provide a service without the
                knowledge of your identity.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We may elect not to deal with you anonymously or pseudonymously
                if:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    we are required or authorised by or under Law, or a
                    court/tribunal order, to deal with you in accordance with
                    your identity; or
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    it is impracticable for us to deal with you in this way.
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                How do we disclose your personal information?
              </Text>
              <br />
              <Text textStyle="body">
                Subject to this Policy and the Law, we will use or disclose your
                personal information for the purpose it was collected.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We will only use or disclose your personal information for
                another purpose in the following circumstances:{" "}
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">where you have consented; </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    where the use or disclosure is directly related to the
                    Services or reason you engaged with us and you would
                    reasonably expect us to use or disclose your personal
                    information in this way (e.g. service management,
                    administration, billing, audit and quality assurance,
                    accreditation, incident monitoring); or{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    as required or authorised by law or court/tribunal order.
                  </Text>
                </ListItem>
              </UnorderedList>
              <br />
              <Text textStyle="body">
                We may share information with our related and subsidiary
                companies to help us provide you with more efficient service and
                to keep you informed about our products and services.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We may also share your information with unrelated third party
                companies where those companies provide services to us that
                enable us to undertake our functions (such as those that assist
                us with advertising measurement, communications and surveys,
                data analytics, fraud prevention, cloud storage, bug fix
                management and payment processing.) Please note, we will only
                disclose your personal information to third party companies with
                the condition that they will comply with Australian Privacy Law.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We will never commercialise or sell your personal information.
                However, if ownership or control of all or part of our business
                changes, we may transfer your personal information to a
                potential or new owner.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                Occasionally, we may disclose your personal details to market
                research companies engaged by us to gather independent feedback
                from you about the performance of our Services.
              </Text>
              <br />
              <Text textStyle="body">Please contact us, if at any time:</Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    you would like to know more information about which
                    companies we regularly deal with and what personal
                    information they receive from us; or
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    you wish to stop your personal information from being used
                    or disclosed for the purposes set out in this Policy.
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Transferring your information overseas
              </Text>
              <br />
              <Text textStyle="body">
                Sometimes our suppliers, contractors or agents are based
                overseas, or otherwise have data storage facilities overseas
                where your personal information will be stored. We may transfer
                information about you between countries if required for a
                relevant purpose described above. However, in all cases, we will
                take reasonable steps to ensure all entities to whom we transfer
                your personal information comply with the Australian Privacy
                Law, including ensuring appropriate security measures are taken
                by those entities to protect your personal information from
                unauthorised access and use.
              </Text>
              <br />
              <Text textStyle="body">
                Please note that we are based in Australia and predominantly
                process your information in Australia, which may not provide
                equivalent levels of data protection in the jurisdiction you are
                located in.
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Direct Marketing</Text>
              <br />
              <Text textStyle="body">
                It is our aim to provide you with access to premium Services. To
                do this, we use the information you provide to us for market
                research so we can better understand your needs. We may use your
                personal information to conduct direct marketing, such as
                telemarketing and advertising via email, SMS or post, in order
                tell you about our products and services.
              </Text>
              <br />
              <Text textStyle="body">
                Your personal information may be passed to other entities
                (including third party entities) for promotional purposes,
                including direct marketing. Those entities may use the personal
                information we provide to them to market to you, including by
                sending you information or contacting you (by telephone, post or
                electronically) about our Services. These entities may be
                associated with us, or be agents, contractors or allied
                organisations. The type of personal information we use or
                disclose will usually be limited to your name and contact
                details. Importantly, we will not use any sensitive personal
                information for marketing purposes without your express consent.
              </Text>
              <br />
              <Text textStyle="body">
                You may choose to opt out of our marketing activities at any
                time by advising us via the unsubscribe function or other
                contact information provided in any marketing you receive.
                Alternatively, you may advise us by contacting us directly.
              </Text>
              <br />
              <Text textStyle="body">
                Please note that it may take up to 60 days to fully implement
                your request not to receive marketing or promotional materials.
                We apologise if you receive any materials during this period.
              </Text>
              <br />
              <Text textStyle="body">
                We will not undertake any marketing activities which would
                amount to a breach of any legislation including the Do Not Call
                Register Act 2006 (Cth) and the Spam Act 2003.
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Accuracy of our information</Text>
              <br />
              <Text textStyle="body">
                We will hold your personal information for a reasonable period
                of time before we consider whether it is inaccurate,
                out-of-date, incomplete, irrelevant or misleading (unless we are
                informed otherwise).
              </Text>
              <br />
              <Text textStyle="body">
                If, having regard to the purpose for which it is held, we are
                satisfied that personal information we hold is inaccurate,
                out-of-date, incomplete, irrelevant or misleading, or if the
                individual about whom the information relates makes a request,
                we will take reasonable steps to correct the information.{" "}
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                How do we protect personal information?
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'10.1'",
                position: "absolute",
                left: "-2rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Information security measures
              </Text>
              <br />
              <Text textStyle="body">
                We may hold your personal information in either electronic or
                physical form.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                We take reasonable steps to protect your personal information
                from misuse, interference and loss, as well as unauthorised
                access, modification or disclosure. We will use a number of
                physical, administrative, personnel and technical measures to
                protect your personal information.
              </Text>
              <br />
              <Text textStyle="body">
                The processes and systems we use to safeguard personal are:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    limiting access to systems on which information is processed
                    and stored and segregate user access as required to carry
                    out their role;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    integrating data security measures into our risk management
                    strategies;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    integrating data security measures into our risk management
                    strategies;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    ensuring all external email communications sent from BCRC-WA
                    are encrypted;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    require all staff to periodically reset passwords;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    use anti-virus protections and ensure operating systems,
                    browsers and plugins are up-to-date with patches and fixes;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    monitoring and regularly reviewing our third party providers
                    (including cloud computing) to ensure compliance with
                    Australian Privacy Law;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    monitoring and regularly reviewing our information and
                    communications technology systems (including hardware and
                    software);{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    monitoring and regularly reviewing our practice against our
                    own policies and against industry best practice.
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'10.2'",
                position: "absolute",
                left: "-2rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Cloud Storage
              </Text>
              <br />
              <Text textStyle="body">
                We may store your personal information with a third party cloud
                storage provider. If we do, we will take reasonable steps to
                ensure that the third party cloud storage provider protects your
                personal information in accordance with Australian Privacy Law.{" "}
              </Text>
              <br />
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'10.3'",
                position: "absolute",
                left: "-2rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Deletion, destruction or archiving
              </Text>
              <br />
              <Text textStyle="body">
                Hearth ensures that your personal information is safely archived
                (if necessary) and, if no longer required for our functions,
                securely destroyed by using the services of professional
                archival and document management companies.
              </Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'10.4'",
                position: "absolute",
                left: "-2rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Data breach
              </Text>
              <br />
              <Text textStyle="body">
                In the event personal information held by us has been accessed,
                disclosed without authorisation, or is lost, we will take
                immediate action to contain, assess and remediate the incident
                in accordance with our Data Breach Response Plan.{" "}
              </Text>
              <br />
              <Text textStyle="body">
                Should we determine that a data breach is likely to cause
                serious harm to an individual to whom the relevant information
                relates, we will promptly notify the individual and the Office
                of the Australian Information Commissioner about the breach
                (unless the Law requires or authorises otherwise).{" "}
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Can you get access to access and/or correct your personal
                information?
              </Text>
              <br />
              <Text textStyle="body">
                Generally, you have the right to know all the personal
                information we hold about you. You can also request they we
                correct any personal information we hold about you. You can
                request access to view and/or correct this information by
                contacting us directly.
              </Text>
              <br />
              <Text textStyle="body">
                We will respond to your request as within a reasonable period
                (usually 30 days from the date the request was made), we will
                provide the requestor access to the information in the manner
                requested, if it is reasonable and practicable to do so and
                subject to exceptions set out in the Australian Privacy Law.
              </Text>
              <br />
              <Text textStyle="body">
                We will only refuse to correct personal information in
                accordance with our obligations under Australian Privacy Law.
                Some examples of when you might be denied access are if:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    access will pose a threat to the life or health of someone;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    access would have an unreasonable impact on another person's
                    privacy;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    information relates to anticipated or existing legal
                    proceedings; or
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">giving access would be unlawful.</Text>
                </ListItem>
              </UnorderedList>
              <br />
              <Text textStyle="body">
                Where we refuse a request to correct personal information we
                will provide a written notice to the requestor setting out:
              </Text>{" "}
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    the reasons for the refusal (except where it would be
                    unreasonable to provide the reasons);
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    the mechanisms available to complain about the refusal;{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    offer to insert a statement into the relevant record
                    identifying the requestor’s statement that the information
                    is inaccurate, out-of-date, incomplete, irrelevant or
                    misleading.
                  </Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                What can you do if you have a complaint?
              </Text>
              <br />
              <Text textStyle="body">
                If you believe that there has been a breach of privacy or you do
                not agree with a decision we have made about your access to
                personal information, you can make a complaint and we will
                endeavour to resolve it by following our internal complaint
                resolution process. You may provide the details of your
                complaint either verbally or in writing to our Privacy Officer
                using the details set out below:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">Telephone: +61 421824725 </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Email: hello@hearthtogether.com</Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Address: 191 St Georges Terrace, Level 6, Perth, WA, 6000,
                    Australia{" "}
                  </Text>
                </ListItem>
              </UnorderedList>
              <br />
              <Text textStyle="body">
                Once we have received your complaint, we will take steps to
                investigate the issues raised and endeavour to respond to you
                within a reasonable period of time (usually 30 days).{" "}
              </Text>
              <br />
              <Text textStyle="body">
                In response to your complaint, our Privacy Officer (or other
                relevant officer) will contact you by telephone or in writing
                to:{" "}
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    ask for more information about your complaint;
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    notify you of the outcome of our investigation; or
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    arrange to meet with you to discuss the complaint.
                  </Text>
                </ListItem>
              </UnorderedList>
              <br />
              <Text textStyle="body">
                If the matter is not resolved to your satisfaction, it will be
                referred to the relevant Manager, who will contact you within
                five working days. If the complaint is still unresolved, it will
                be referred to the General Manager, who will advise you of our
                final decision within fifteen days of the date you first made
                the complaint.
              </Text>
              <br />
              <Text textStyle="body">
                If you are not satisfied with our decision you can direct your
                written complaint to the Australian Information Commissioner at:
              </Text>
              <UnorderedList textStyle="body" spacing="1rem" ml="2rem">
                <ListItem mt="1rem">
                  <Text textStyle="body">GPO Box 5218, Sydney NSW 2001 </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Phone toll free: 1300 363 992 </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Email: enquiries@oaic.gov.au</Text>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                What if this Privacy Policy is amended?
              </Text>
              <br />
              <Text textStyle="body">
                This Policy will be reviewed and may be amended, from time to
                time, to take account of new laws and technology, changes to our
                operations, the operations of our related-entities and other
                necessary developments. Updates will be publicised on our
                website and made available upon request.{" "}
              </Text>
            </ListItem>
          </OrderedList>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default PrivacyPolicyPage;
