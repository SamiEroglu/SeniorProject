import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  let navigate = useNavigate();
  const routeChange1 = () => {
    navigate("/profile");
  };
  const routeChange2 = () => {
    navigate("/test");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        backgroundColor: "black",
        width: "100%",
        height: "10vh",
        zIndex: "5",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "11%",
          height: "10vh",
          backgroundColor: "#50a5d4",
          justifyContent: "start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ul
          style={{
            width: "11%",
            backgroundColor: "#50a5d4",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "3vh",
            listStyleType: "none",
            position: "absolute",
            right: "89%",
          }}
        >
          <li
            style={{ color: "white", cursor: "pointer" }}
            onClick={scrollToTop}
          >
            Ana Sayfa
          </li>
        </ul>
      </div>

      <div
        style={{
          width: "89%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "2.5vh",
            listStyleType: "none",
            gap: "15vh",
            paddingRight: "5vh",
          }}
        >
          <li style={{ cursor: "pointer" }} onClick={handleClickScroll}>
            Online Terapi
          </li>
          <li style={{ cursor: "pointer" }} onClick={routeChange2}>
            Online Test
          </li>
          <li style={{ cursor: "pointer" }} onClick={routeChange1}>
            Danışan Bilgileri
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
