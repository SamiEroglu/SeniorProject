import React from "react";
import { useNavigate } from "react-router-dom";
import "../Profile/profile.css";
function Profile() {
  let navigate = useNavigate();
  const routeChange2 = () => {
    navigate("/home");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
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

      <li
        style={{
          color: "white",
          cursor: "pointer",
          width: "11%",
          fontFamily: "sans-serif",
          fontSize: "3vh",
          listStyleType: "none",
          position: "absolute",
          top: "5%",
          left: "3%",
          textShadow:
            "5px 5px 5px rgba(0,0,0,0.3), 0px -2px 3px rgba(255,255,255,0.3)",
          zIndex: "3",
        }}
        onClick={routeChange2}
      >
        &lt;&nbsp; Ana Sayfa
      </li>
      <div
        style={{
          zIndex: "3",
          position: "absolute",
          top: "40%",
          right: "20%",
          border: "none",
          borderRadius: "1.5vw",
          width: "60%",
          height: "55vh",
          background: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            backgroundImage: "url(/ppicon.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 150%",
            backgroundSize: "90%",
            width: "8vw",
            height: "8vw",
            borderRadius: "100%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            position: "absolute",
            bottom: "85%",
            right: "45%",
          }}
        ></div>
        <div
          className="details"
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            fontFamily: "sans-serif",
            fontSize: "3vh",
          }}
        >
          <table cellSpacing="10">
            <tr>
              <td>İsim:</td>
              <td>
                <input type="text" name="pname"></input>
              </td>
            </tr>
            <tr>
              <td>Soyisim:</td>
              <td>
                <input type="text" name="psurname"></input>
              </td>
            </tr>
            <tr>
              <td>TC Kimlik Numarası:</td>
              <td>
                <input type="text" name="ptc" maxLength={"11"}></input>
              </td>
            </tr>
            <tr>
              <td>Telefon Numarası:</td>
              <td>
                <input type="text" name="ptel" maxLength={"11"}></input>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: "11%" }}>Gelme Nedeni:</td>
              <td>
                <textarea
                  type="text"
                  name="preason"
                  classname="preasonid"
                  id="preasonid"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}

export default Profile;
