import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Text, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { HiEye } from "react-icons/hi";
import AcceptTC from "../components/alerts/AcceptTC";
import { currentUser } from "./LoginForm";
import patchData from "../hooks/patchData";
import CopyrightVersion from "../components/CopyrightVersion";
import preventLoad from "../hooks/preventLoad";
import preventAccess from "../hooks/preventAccess";

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [isAtBottom, setBottom] = useState(false);

  preventAccess("staff");

  const handleAccept = () => {
    // Set the accepted state to true
    setAccepted(true);
    patchData({ loggedIn: true }, "update_login", currentUser.id);
    // Navigate to the "/student" page
    navigate("/student");
  };

  const handleScroll = (e) =>  {
    setBottom((e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < 1);
  }

  return (
    <>
      <HStack justifyContent={"center"}>
        <HiEye color={"#81E6D9"} size={"3em"} />
        <Heading padding={"10px"}>Welcome to Eyedentify!</Heading>
      </HStack>
      <Box>
        <VStack
          minHeight="100vh"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          paddingInline={100}
          paddingBottom={14}
        >
          <Text as="b" fontSize="xl">
            Privacy Terms and Conditions
          </Text>
          <p>
            Before you begin your exam, please take a moment to review our
            Privacy Terms and Conditions. By starting the exam, you agree to the
            following:
          </p>
          <Box
            maxWidth="50vw"
            maxHeight="50vh"
            overflow="auto"
            scrollBehavior="smooth"
            onScroll={ (e) => { handleScroll(e) }}
          >
            <VStack
              justifyContent="left"
              alignItems="left"
              spacing="10px"
              backgroundColor="#202020"
              padding="10px"
            >
              <Text as="b">VIDEO AND AUDIO RECORDING</Text>
              <p>
                You permit Eyedentify to use your camera for educational and
                exam integrity purposes. Video recording may be activated during
                the exam to monitor and prevent any misconduct.
              </p>
              <Text as="b">DATA USAGE</Text>
              <p>
                Eyedentify may collect and process personal data, including but
                not limited to your name and exam results, for the purpose of
                maintaining exam records and ensuring the exam's security and
                integrity.
              </p>
              <Text as="b">THIRD-PARTY TOOLS</Text>
              <p>
                We may use third-party tools and services to enhance your exam
                experience. These services may have their own privacy policies,
                and you are encouraged to review them as well.
              </p>
              <Text as="b">CONFIDENTIALITY</Text>
              <p>
                You agree to keep exam content, questions, and any related
                information confidential. Sharing or discussing exam content
                with others may result in disqualification.
              </p>
              <Text as="b">DATA SECURITY</Text>
              <p>
                Eyedentify employs industry-standard security measures to
                protect your personal data. However, we cannot guarantee
                absolute security, and you should also take necessary
                precautions.
              </p>
              <Text as="b">EXAM AND CRITERIA CHECK</Text>
              <p>
                Eyedentify will conduct a criteria check before the exam
                to ensure the integrity of the examination process.
                This check may include verifying your identity, system
                requirements, and network stability.
              </p>
              <p>
                <b>Please be aware that the time taken for the criteria
                  check will be included in your overall exam time if the
                  exam has started by the examiner. We recommend that you
                  arrive at least 10 minutes before the scheduled start of
                  the exam to ensure these checks are completed efficiently
                  and to avoid any disruption to your exam experience.
                </b>
              </p>
              <Text as="b">COOKIES AND TRACKING</Text>
              <p>
                We may use cookies and other tracking technologies to improve
                your user experience. You can manage your cookie preferences
                through your browser settings.
              </p>
              <Text as="b">CONTACT INFORMATION</Text>
              <p>
                For questions or concerns about your data or these terms, please
                contact Eyedentify at{" "}
                <Text as="b">
                  <Link to={""}>eyedentify@exam.com</Link>
                </Text>
                .
              </p>
            </VStack>
          </Box>

          <p>
            By clicking "Start Exam," you acknowledge that you have read and
            agree to these Privacy Terms and Conditions. If you do not agree
            with these terms, please do not proceed with the exam.
          </p>

          <p>Thank you for using Eyedentify and best of luck with your exam!</p>
          <p>
            By clicking "I Accept," you acknowledge that you have read and agree
            to these Privacy Terms and Conditions.
          </p>
          <Button 
            colorScheme="teal" 
            variant="solid" 
            onClick={handleAccept} 
            isDisabled = { !isAtBottom }
            backgroundColor={isAtBottom ? "teal.500" : "teal.100"} 
          >
            I Accept
          </Button>
          <AcceptTC
            handleCancel={() => {
              navigate("/");
              patchData({ loggedIn: false }, "update_login", currentUser.id);
            }}
          />
        </VStack>
      </Box>
      <CopyrightVersion bottomVal={0} />
    </>
  );
};

export default TermsAndConditions;
