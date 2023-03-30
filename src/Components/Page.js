import React from "react";
import Navbar from "./Navbar";

function Page() {
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
        style={{
          backgroundColor: "rgb(0,0,0,0.1)",

          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "50vh",
          fontFamily: "sans-serif",
          fontSize: "10vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        İŞİTME ENGELLİLER İÇİN ONLINE TERAPİ
      </div>
    </div>
  );
}

export default Page;
