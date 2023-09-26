//This is what will be rendered in the grid, and represents a student and their stream.
//We will need to replace the Webcam and make the card loading as a student is connecting.

import {
  Card,
  CardBody,
  Heading,
  VStack,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import setBorder from "../hooks/setBorder";
import { useRef, useEffect, useContext } from "react";
import { StreamsContext } from "../contexts/StreamContext";

interface Props {
  name: string;
  warnings: number;
  id: number;

  loading: boolean;
}

const StudentCard = ({ name, warnings, id, loading }: Props) => {
  const videoRef = useRef(null);
  const streams = useContext(StreamsContext);
  const stream = streams[id];

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.innerHTML = ""; // clear the inner HTML to ensure no other elements
      videoRef.current.appendChild(stream);
    }
  }, [stream]);

  return loading ? (
    <Card
      overflow={"hidden"}
      borderColor={"RGBA(0, 0, 0, 0.80)"}
      borderWidth={"1px"}
      borderRadius={"10px"}
    >
      <Skeleton height="200px" overflow="hidden" />
      <CardBody>
        <VStack>
          <Skeleton height="20px" width="60%" />
          <Skeleton height="20px" width="40%" />
        </VStack>
      </CardBody>
    </Card>
  ) : (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      overflow={"hidden"}
      borderColor={setBorder(warnings)}
      borderWidth={"1px"}
      borderRadius={"10px"}
    >
      <CardBody>
        <div
          ref={videoRef}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            width: "100%",
            height: "auto",
          }}
        ></div>
        <VStack>
          <Heading marginTop={"8px"}>{name}</Heading>
          <Text>Warnings: {warnings}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StudentCard;
