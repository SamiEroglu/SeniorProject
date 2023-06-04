import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

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
  function adminstrator() {
    setIsAdmin((isAdmin) => !isAdmin);
  }
  let navigate = useNavigate();
  const routeChange1 = () => {
    navigate("/profile");
  };
  const routeChange2 = () => {
    navigate("/test");
  };
  const routeChange3 = () => {
    navigate("/home");
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
          backgroundColor: "black",
          justifyContent: "start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ul
          style={{
            width: "11%",
            backgroundColor: "black",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "3vh",
            listStyleType: "none",
            position: "absolute",
            right: "89%",
          }}
        >
          <li
            style={{ color: "white", cursor: "pointer", fontWeight: "500" }}
            onClick={routeChange3}
          >
            <li onClick={scrollToTop}>Ana Sayfa</li>
          </li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#2c1444",
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
          <li style={{ cursor: "pointer" }} onClick={routeChange3}>
            <li onClick={handleClickScroll}>Online Terapi</li>
          </li>
          <li style={{ cursor: "pointer" }} onClick={routeChange2}>
            Online Test
          </li>
          {isAdmin && (
            <li style={{ cursor: "pointer" }} onClick={routeChange1}>
              Danışan Bilgileri
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
