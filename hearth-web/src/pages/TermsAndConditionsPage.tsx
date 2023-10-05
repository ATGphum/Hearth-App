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
        <Flex direction="column" gridRowGap="3rem" textAlign="left" mb="1rem">
          <Text textStyle="heading.h1" textAlign="center">
            Terms of Use
          </Text>
          <OrderedList
            textStyle="heading.h2"
            spacing="3rem"
            ml="2rem"
            mr="1rem"
          >
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
              <Text textStyle="heading.h2">User Account</Text>
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
                Use of User Account
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    To be eligible for a User Account you must be an individual
                    over the age of 18 years and capable of forming a binding
                    contract (
                    <Text as="span" fontWeight={500}>
                      Eligibility Criteria
                    </Text>
                    ). You may use the Services only if you are 13 years or
                    older and are not barred from using the Services under
                    applicable law.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Subject to satisfying the Eligibility Criteria, you may
                    apply for a “user account” to access the Services (
                    <Text as="span" fontWeight={500}>
                      User Account
                    </Text>
                    ). By applying for a User Account you warrant and represent
                    that you satisfy the Eligibility Criteria. If at any time
                    you cease to satisfy the Eligibility Criteria you must cease
                    accessing and using the Services and Hearth may terminate
                    your User Account.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If Hearth, at its absolute discretion, grants you a User
                    Account, your use of that account is subject to and
                    conditional on your compliance with these Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If you choose, or you are provided with, a username, user
                    identification code, password or any other piece of
                    information as part of our security procedures (
                    <Text as="span" fontWeight={500}>
                      Security Information
                    </Text>
                    ), you must treat such information as confidential. You must
                    not disclose it to any third party. You are responsible for
                    the safekeeping of the Security Information, and liable if
                    your account is misused by an unauthorised person.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We have the right to disable any of the Security
                    Information, whether chosen by you or allocate by us, at any
                    time, if in our reasonable opinion you have failed to comply
                    with any of the provisions of these Terms.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You are responsible for ensuring that all persons who access
                    the Services through your internet connection are aware of
                    the Terms and other applicable terms and conditions, and
                    that they comply with them. If you know or suspect that
                    anyone other than you know any of your Security Information,
                    you must promptly notify us by emailing
                    hello@hearthtogether.com.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Notwithstanding any clause to the contrary, we reserve the
                    right to refuse to set up a User Account or provide a
                    Service to anyone for any reason at any time.{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Purchasing Services</Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'6.1'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Subscription
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    You may purchase access to experiences available via
                    Services as a monthly, yearly or lifetime subscription (
                    <Text as="span" fontWeight={500}>
                      Subscription
                    </Text>
                    ). A description of features associated with Subscriptions
                    is available via the Services.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'6.2'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Banking Merchant
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    You acknowledge that payments are processed by a third party
                    banking merchant (
                    <Text as="span" fontWeight={500}>
                      Banking Merchant
                    </Text>
                    ) and agree that the Banking Merchant and Hearth may
                    exchange information about you as is necessary for the
                    purpose of this Agreement. You acknowledge that use of the
                    Banking Merchant gateway is subject to the terms and
                    conditions of use of the Banking Merchant.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    If you choose to save your credit/debit card details via the
                    Banking Merchant’s gateway (which you are directed to from
                    our website for the purposes of processing payment only),
                    you acknowledge that your card details are saved at your
                    risk and that Hearth is not liable for any loss you may
                    suffer (including but not limited to any claim, liability,
                    damage, judgement, award, loss, cost, expense, demand, or
                    fee (including reasonable solicitors’ fees)) due to the
                    storing of those card details. For the avoidance of doubt,
                    Hearth does not store any card details, and if such details
                    are collected for the purpose of providing a refund those
                    card details are destroyed immediately after use.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'6.3'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Accuracy of billing and account information
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    You agree to provide current, complete, and accurate
                    purchase and account information for all purchases made at
                    our store. You agree to promptly update your account and
                    other information, including your email address and credit
                    card numbers and expiration dates, so that we can complete
                    your transactions and contact you as needed.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Additional Features</Text>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'7.1'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Use of Additional Services
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The Additional Features may not all be available at all
                    times, availability is subject to and at the discretion of
                    Hearth.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Additional Features may be offered on a complimentary option
                    to your Subscription or on a fee-for-service basis (and
                    charged in addition to your Subscription).{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You may be notified from time to time of additional terms
                    and conditions that apply to Additional Features, such
                    additional terms and conditions are in addition to those set
                    out in this document, and the additional terms and
                    conditions will form part of these Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We reserve the right to and may, in our sole discretion,
                    limit, or cancel, the sale or availability of Additional
                    Features to any person, geographic region, jurisdiction or
                    quantity. We may exercise this right on a case-by-case
                    basis. We reserve the right to limit the quantities of any
                    Additional Features that we offer.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    All descriptions or pricing of Additional Features are
                    subject to change at any time without notice, in our sole
                    discretion. We reserve the right to refuse any order you
                    place with us for any Additional Feature (for any reason).
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    The restrictions noted above may include orders placed by or
                    under the same User Account, the same credit card, and/or
                    orders that use the same billing and/or shipping address. If
                    we make a change to or cancel an order, we may attempt to
                    notify you by contacting the e-mail and/or billing
                    address/phone number provided at the time the order was
                    made. We reserve the right to limit or prohibit orders that,
                    in our sole judgment, appear to be placed by dealers,
                    resellers or distributors.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We do not warrant that the quality of any products,
                    services, information, or other material purchased or
                    obtained by you will meet your expectations, or that any
                    errors in Additional Feature will be corrected.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem
              as="div"
              textStyle="heading.h3"
              position="relative"
              _before={{
                content: "'7.2'",
                position: "absolute",
                left: "-1.5rem",
              }}
            >
              <Text textStyle="heading.h3" ml="0.25rem">
                Modifications to the Additional Features
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    Prices for the Additional Features are subject to change
                    without notice. Prior to purchasing any Additional Features,
                    you will be notified of the price payable for that
                    Additional Features at that time. For the avoidance of
                    doubt, the price for Additional Features will be the price
                    as advised immediately prior to you placing your order for
                    that Additional Feature, we may increase the price for that
                    Additional Feature after you have placed your order but we
                    will not increase the price you pay for the Additional
                    Features the subject of that order.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We reserve the right at any time to modify or discontinue
                    any Additional Feature (or any part or content thereof)
                    without notice. Notwithstanding any other term to the
                    contrary, if you have paid for an Additional Feature and it
                    is discontinued during the “term” of that Additional
                    Feature, we will provide you with at least 30 days’ notice
                    of its modification or discontinuance and, if the Additional
                    Feature is a “paid” service, we will refund you a prorated
                    part of the total payment for the Additional Feature (to
                    take into account the period of time the Additional Feature
                    had already been rendered).{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We shall not be liable to you or to any third-party for any
                    modification, price change, suspension, or discontinuance of
                    the Additional Feature.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                User create, connect, communicate, discover and share
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    If, at our request or without a request, you send certain
                    specific submissions (for example contest entries) creative
                    ideas, suggestions, proposals, plans, or other materials,
                    whether online, by email, by postal mail, or otherwise, or
                    post in an online chat or forum (collectively, 'comments'),
                    you agree that we may, at any time, without restriction,
                    edit, copy, publish, distribute, translate, and otherwise
                    use in any medium any comments that you forward to us. We
                    are and shall be under no obligation: (1) to maintain any
                    comments in confidence; (2) to pay compensation for any
                    comments; or (3) to respond to any comments.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    We may, but have no obligation to, monitor, edit or remove
                    content that we determine in our sole discretion are
                    unlawful, offensive, threatening, libellous, defamatory,
                    pornographic, obscene, or otherwise objectionable or
                    violates any party’s intellectual property or these Terms.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You agree that the comments made by you, and any uploaded
                    images/documents that you or someone on your behalf provided
                    in connection with the Services (
                    <Text as="span" fontWeight={500}>
                      Your Content
                    </Text>
                    ) will not violate any rights or entitlements of any person,
                    including copyright, trademark, privacy, personality or
                    other personal or proprietary right, including intellectual
                    property rights. You further agree that Your Content will
                    not contain libellous or otherwise unlawful, abusive, or
                    obscene material, or contain any computer virus or other
                    malware that could in any way affect the operation of
                    Services or any related website. You may not use a false
                    e-mail address, pretend to be someone other than yourself,
                    or otherwise mislead us or third parties as to the origin of
                    any comments.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You are solely responsible for Your Content and its
                    accuracy. We take no responsibility and assume no liability
                    for any of Your Content provided or made available by you or
                    any third-party.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    In our absolute discretion, we may terminate your User
                    Account immediately and without notice if you breach or are
                    alleged to have breached a term of this clause 8.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Prohibited Uses</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    You may use the Services and the Content only for lawful
                    purposes and in accordance with these Terms.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You agree not to use the Services and the Content:
                  </Text>
                  <OrderedList
                    listStyleType="lower-roman"
                    textStyle="body"
                    spacing="0.5rem"
                  >
                    <ListItem mt="0.5rem">
                      <Text textStyle="body">
                        in any way that violates any applicable federal, state,
                        local or international law or regulation (including,
                        without limitation, any laws regarding the export of
                        data or software to and from other countries);
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        for the purpose of exploiting, harming or attempting to
                        exploit or harm minors in any way by exposing them to
                        inappropriate content, asking for personally
                        identifiable information or otherwise;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        to transmit, or procure the sending of, any advertising
                        or promotional, including any "junk mail", "chain
                        letter" or "spam" or any other similar solicitation;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        to impersonate or attempt to impersonate us, any of our
                        employees, another user or any other person or entity
                        (including, without limitation, by using email addresses
                        associated with any of the foregoing); or
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        to engage in any other conduct that restricts or
                        inhibits anyone's use or enjoyment of the Services, or
                        which, as determined by us, may harm us or users of the
                        Services or expose them to liability.
                      </Text>
                    </ListItem>
                  </OrderedList>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">Additionally, you agree not to:</Text>
                  <OrderedList listStyleType="lower-roman" spacing="0.5rem">
                    <ListItem mt="0.5rem">
                      <Text textStyle="body">
                        use the Services in any manner that could disable,
                        overburden, damage, or impair the Services or interfere
                        with any other party's use of the Services, including
                        their ability to engage in real time activities through
                        the Services;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        use any robot, spider, scraping device, deep link, or
                        other automatic device, tool or algorithm, to process or
                        means to access the Services for any purpose, including
                        monitoring or copying any of the Content;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        use any manual process to monitor or copy any of the
                        Content or for any other unauthorised purpose without
                        our prior written consent;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        use any automatic or manual process to reverse engineer
                        or decompile any part of the Services;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        use any device, software or routine that interferes with
                        the proper working of the Services;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        attack the Services via a denial-of-service attack or a
                        distributed denial-of-service attack;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        introduce any viruses, trojan horses, worms, logic
                        bombs, spyware, computer code, file, program or material
                        which is malicious or technologically harmful;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        attempt to gain unauthorised access to, interfere with,
                        damage or disrupt any parts of the Services, the server
                        on which the Services is stored, or any server, computer
                        or database connected to the Services;
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        breach the security of the Services, test or scan the
                        vulnerability of the Services, or make any unauthorised
                        modifications to the Services; or
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text textStyle="body">
                        use the Services or the Content in any way that
                        otherwise breaches these Terms.
                      </Text>
                    </ListItem>
                  </OrderedList>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth may report any of the activities above to the
                    relevant law enforcement authorities (as relevant) and we
                    will cooperate with those authorities by disclosing your
                    identity to them. In the event of such a breach, your right
                    to use our Services will cease immediately.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Cookies</Text>
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
              <Text textStyle="heading.h2">Third party websites</Text>
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
              <Text textStyle="heading.h2">Intellectual Property</Text>
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
              <Text textStyle="heading.h2">Trade Marks</Text>
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
            <ListItem>
              <Text textStyle="heading.h2">
                Do not rely on information on the Services
              </Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    The Services and the Content is provided on an “as is” and
                    “as available” basis, and to the extent permitted by law we
                    make no guarantee, representations or warranties, express or
                    implied, regarding the operations or availability of the
                    Services or the Content (including but not limited to
                    uninterrupted, timely, secure, or error-free use).{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You acknowledge that any guidance, advice, comments and/or
                    information provided by Hearth in the delivery of,
                    associated to, or as part of its Service (
                    <Text as="span" fontWeight={500}>
                      Hearth Guidance
                    </Text>
                    ), is general information only, and to the extent permitted
                    by law, Hearth makes no guarantee, representations,
                    warranties, express or implies, regarding the accuracy and
                    reliability of the Hearth Guidance.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    The Content and the Hearth Guidance is provided for general
                    information only and should not be relied upon or used as
                    the sole basis for making decisions without consulting
                    primary, more accurate, more complete, or more timely
                    sources of information. Any reliance on the Content and/or
                    the Hearth Together Guidance is at your own risk.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    The Services may contain certain historical information,
                    which of its own nature, is not current and is provided for
                    your reference only. We reserve the right to modify the
                    Contents and the Services at any time, but we have no
                    obligation to update any information on the Services. You
                    agree that it is your responsibility to monitor changes to
                    the Services.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Although we make reasonable efforts to update the Services
                    and the Content, to the extent permitted by law we make no
                    representations, warranties or guarantees, whether express
                    or implied, that the Services, the Content or the Hearth
                    Guidance is accurate, complete or up-to-date.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    All new, or updated, features or tools to the Services are
                    subject to these Terms as soon as that new, or updated,
                    feature or tool is available for access.{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Termination of use</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    You may stop using the Services at any time for any reason.
                    You may cancel your Account at any time by sending an email
                    to us at hello@hearthtogether.com.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You agree that your purchase of a Subscription or Additional
                    Features (as applicable) is not contingent on the delivery
                    of any future availability, or dependent on any oral or
                    written public comments made by Health regarding future
                    availability.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Hearth reserves the right in its absolute discretion to
                    suspend or terminate at any time your access to the Services
                    or your User Account without notice for any reason,
                    including but not limited to a breach of these Terms. The
                    suspension or termination shall not affect either party’s
                    rights or liabilities.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Notwithstanding any other term of these Terms to the
                    contrary, if you have paid for a Subscription and it is
                    discontinued during the “term” of that Subscription we will
                    provide you with at least 7 days’ notice of its
                    discontinuance. If the Subscription has been purchased on a
                    yearly or lifetime basis we will refund you a prorated part
                    of the total payment for the Subscription (to take into
                    account the period of time the Services have already been
                    rendered).{" "}
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">
                Suspension of withdrawal of Services
              </Text>
              <Text textStyle="body" mt="1rem">
                Hearth does not guarantee that the Services or any Content, will
                always be available, uninterrupted or be error-free. We may
                suspend or withdraw or restrict availability of all or any part
                of the Services for business and operational reasons. We will
                try to give you reasonable notice of any suspension or
                withdrawal.{" "}
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Limitation of liability</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    To the extent permitted by law, Hearth, its associated
                    entities (as that term is defined in the Corporations Act
                    2001 (Cth)), licensors, service providers and each of their
                    respective officers, employees, contractors, agents,
                    licensors, suppliers, successors and assigns (
                    <Text as="span" fontWeight={500}>
                      Affiliates
                    </Text>
                    ) are not liable for damages of any kind, under any law,
                    arising out of or in connection with your use, or inability
                    to use, the Services, any website linked to it, the Content
                    or such other websites content or any services or items
                    obtained through the Services, including the Hearth
                    Guidance, or such other websites, including any direct,
                    indirect, special, incidental, consequential or punitive
                    damages, including but not limited to, personal injury, pain
                    and suffering, emotional distress, loss of revenue, loss of
                    goodwill, loss of data, and whether caused by tort
                    (including negligence), breach of contract or otherwise,
                    even if foreseeable.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Nothing in this clause affects any liability which cannot be
                    excluded or limited under applicable law. Hearth and its
                    Affiliates do not exclude or limit in any way our liability
                    to you it would be unlawful to do so. This includes
                    liability for death or personal injury caused by our
                    negligence or the negligence of our employees, agents or
                    subcontractors and for fraud or fraudulent
                    misrepresentation.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Where Hearth and its Affiliates’ liability cannot be
                    excluded, their liability is limit to the fullest extent
                    permitted by the Australian Consumer Law.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    You agree to defend, indemnify and hold Hearth and its
                    Affiliates, harmless from and against any claims,
                    liabilities, damages, judgments, awards, losses, costs,
                    expenses or fees (including reasonable solicitors’ fees)
                    arising out of or relating to your breach of the Terms or
                    your use of the Services, including, but not limited to your
                    use of any information obtained from the Services and any
                    use of the Content, services and products other than as
                    expressly authorised in these Terms and the User Images.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Governing Law</Text>
              <Text textStyle="body" mt="1rem">
                These Terms are governed by the laws of Western Australia in
                Australia, and any dispute in relation to these Terms or your
                access or use of the Services and the Content will be subject to
                the exclusive jurisdiction of the Courts of Western Australia.
              </Text>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Miscellaneous</Text>
              <OrderedList
                listStyleType="lower-alpha"
                textStyle="body"
                spacing="1rem"
              >
                <ListItem mt="1rem">
                  <Text textStyle="body">
                    If any of these Terms are unenforceable or held to be
                    invalid, the offending provision/s will be removed from
                    these Terms and the amended Terms will remain in force.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Any failure by Hearth to act or enforce these Terms
                    immediately will not be considered a waiver of Hearth’s
                    right to take any such action.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    The headings used in this document are included for
                    convenience only and will not limit or otherwise affect
                    these Terms.{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle="body">
                    Any ambiguities in the interpretation of these Terms shall
                    not be construed against the drafting party.
                  </Text>
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text textStyle="heading.h2">Contact us</Text>
              <Text textStyle="body" mt="1rem">
                If you have any questions or queries in relation to these Terms,
                please contact us by emailing hello@hearthtogether.com.
              </Text>
            </ListItem>
          </OrderedList>
        </Flex>
      </MotionFlex>
    </LazyMotion>,
    mounter
  );
};

export default TermsAndConditionsPage;
