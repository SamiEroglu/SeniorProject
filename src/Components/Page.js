import React from "react";
import { useRef } from "react";
import Navbar from "./Navbar";
import "../Styles/page.css";
import VideoCall from "./VideoCall";

function Page() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Navbar />

      <div
        style={{
          height: "100vh",
          backgroundImage: "url(/bgimg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="pagecontainer"
        style={{
          backgroundColor: "rgb(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "80vh",
          fontFamily: "sans-serif",
          fontSize: "10vh",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span className="titlestyle">İŞİTME ENGELLİLER İÇİN ONLINE TERAPİ</span>
        <button
          className="morebuttonstyle"
          style={{
            position: "absolute",
            top: "100%",
          }}
          onClick={handleClick}
        >
          Daha Fazlası
        </button>
      </div>
      <div ref={ref} id="section-1">
        <VideoCall />
      </div>
    </div>
  );
}

export default Page;
