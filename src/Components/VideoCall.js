import React from "react";
import Webcam from "react-webcam";
import "../Styles/videocall.css";
import C from "./Chat/C";

function VideoCall() {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Webcam
        audio={true}
        height={1152}
        width={2048}
        style={{
          width: "50%",
          height: "56.5%",
          border: "solid black 5px",
        }}
      />
      <div
        style={{
          backgroundColor: "white",
          width: "30%",
          height: "60%",
        }}
      ></div>
      <C />
    </div>
  );
}

export default VideoCall;
