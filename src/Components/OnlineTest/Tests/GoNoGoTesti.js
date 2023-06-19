import React from "react";
import Navbar from "../../Navbar";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoNoGoTest = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <Navbar />
      <img
        src="https://source.unsplash.com/random/1920x1080/?landscape"
        alt=""
      ></img>
      <iframe
        src="https://scripting.neurotask.com/exp/NzCdhJM8BY"
        width="960"
        height="700"
        title="1"
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: "17.5%",
          left: "25%",
          border: "none",
          borderRadius: "1.5vw",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      ></iframe>{" "}
      <div
        style={{
          position: "absolute",
          top: "85%",
          right: "28%",
        }}
      >
        <FontAwesomeIcon
          onClick={refreshPage}
          icon={faRefresh}
          className="refreshicon"
        />
      </div>
    </div>
  );
};

export default GoNoGoTest;
