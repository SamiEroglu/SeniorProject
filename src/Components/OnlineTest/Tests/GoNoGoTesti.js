import React from "react";
import Navbar from "../../Navbar";

const GoNoGoTest = () => {
  return (
    <div>
      <Navbar />
      <img
        src="https://source.unsplash.com/random/1920x1080/?landscape"
        alt=""
      ></img>
      <iframe
        src="https://www.psytoolkit.org/experiment-library/experiment_go-no-go.html"
        width="960"
        height="1080"
        title="1"
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default GoNoGoTest;
