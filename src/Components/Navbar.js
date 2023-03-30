import React from "react";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        backgroundColor: "black",
        width: "100%",
        height: "10vh",
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
            backgroundColor: "#50a5d4",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "3vh",
            listStyleType: "none",
          }}
        >
          <li>Ana Sayfa</li>
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
            fontSize: "2vh",
            listStyleType: "none",
            gap: "15vh",
            paddingRight: "5vh",
          }}
        >
          <li>Online Terapi</li>
          <li>Kişisel Bilgilerim</li>
          <li>Hesap Ayarları</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
