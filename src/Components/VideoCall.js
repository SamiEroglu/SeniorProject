import React from "react";
import Webcam from "react-webcam";
import "../Styles/videocall.css";
import Chat from "./Chat/Chat";

function VideoCall() {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        backgroundImage: "url(/videocallbg.jpg)",
        backgroundSize: "100vw 90vh",
        backgroundRepeat: "no-repeat",
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
          height: "62.8%",
          border: "solid black 2px",
          backgroundImage: "url(/webcambg.png)",
          backgroundSize: "35%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
        }}
      />
      <div
        className="chatboxcontainer"
        style={{
          border: "none",
          borderRadius: "1vw",
          backgroundColor: "rgba(244, 248, 251,0.8)",
          width: "20%",
          height: "60%",
        }}
      >
        <Chat />
      </div>
    </div>
  );
}

export default VideoCall;
