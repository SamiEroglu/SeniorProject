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
    <div>
      <Navbar />
      <div>
        <button
          onClick={routeChange}
          style={{ position: "absolute", top: "50%" }}
        >
          beckdepresyontesti
        </button>
        <button
          onClick={routeChange1}
          style={{ position: "absolute", top: "50%" }}
        >
          gonogotest
        </button>
      </div>
    </div>
  );
}
