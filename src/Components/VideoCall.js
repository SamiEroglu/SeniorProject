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
        background:
          "linear-gradient(41deg, rgba(172,56,210,1) 0%, rgba(154,105,200,1) 16%, rgba(161,87,187,1) 36%, rgba(219,18,201,1) 57%, rgba(179,92,245,1) 74%, rgba(232,158,227,1) 100%, rgba(182,58,155,1) 100%)",
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
          background: "#6f48aa",
        }}
      />
      <div
        style={{
          border: "none",
          borderRadius: "1vw",
          backgroundColor: "#f4f8fb",
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
