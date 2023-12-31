//This is what will be rendered in the grid, and represents a student and their stream.
//We will need to replace the Webcam and make the card loading as a student is connecting.

import {
  Card,
  CardBody,
  Heading,
  VStack,
  Text,
  Skeleton,
  HStack,
  Box,
  Spinner,
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import setBorder from "../hooks/setBorder";
import { useRef, useEffect, useContext, useCallback } from "react";
import { StreamsContext } from "../contexts/StreamContext";
import { TiTick, TiTimes } from "react-icons/ti";

interface Props {
  name: string;
  warnings: number;
  id: number;
  ready: boolean;
  loading: boolean;
  disconnected: boolean;
}

const StudentCard = ({
  name,
  warnings,
  id,
  loading,
  ready,
  disconnected,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streams = useContext(StreamsContext);
  const stream = streams[id];

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
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
      overflow={"hidden"}
      borderColor={setBorder(warnings)}
      borderWidth={"1px"}
      borderRadius={"10px"}
    >
      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {disconnected ? (
          <Spinner thickness="4px" size={"xl"} color="teal" />
        ) : (
          <div style={{ position: "relative" }}>
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              style={{
                borderRadius: "10px",

                overflow: "hidden",
                width: "100%",
                height: "auto",
              }}
            ></video>
          </div>
        )}
        <VStack>
          <Heading marginTop={"8px"}>
            <HStack>
              <div>{name}</div>
              <Box marginTop={ready ? "0" : "1.5"}>
                {ready ? <TiTick /> : <TiTimes />}
              </Box>
            </HStack>
          </Heading>
          <Text>Warnings: {warnings}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StudentCard;
