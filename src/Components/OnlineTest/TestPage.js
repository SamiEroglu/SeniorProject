import React from "react";
import "./testPage.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/test1");
  };
  const routeChange1 = () => {
    navigate("/test2");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div
        className="profilebgimgcontainer"
        style={{
          width: "100%",
          height: "50vh",
          position: "relative",
        }}
      >
        <img
          className="foregroundImg"
          src="https://source.unsplash.com/random/1920x1080/?landscape"
          alt=""
        ></img>
        <img
          className="backgroundImg"
          src="https://source.unsplash.com/random/1920x1080/?landscape"
          alt=""
        ></img>
      </div>
      <div
        style={{
          zIndex: "3",
          position: "absolute",
          top: "30%",
          right: "20%",
          border: "none",
          borderRadius: "1.5vw",
          width: "60%",
          height: "55vh",
          background: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={routeChange}
          style={{ fontSize: "4vw" }}
          className="bdtbutton"
        >
          Beck Depresyon Testi
        </button>
        <button
          onClick={routeChange1}
          style={{ fontSize: "4vw" }}
          className="bdtbutton"
        >
          Go/No-Go Testi
        </button>
      </div>
    </div>
  );
}
