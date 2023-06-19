import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Navbar";
import "../TaskResults/mytaskresults.css";
import axios from "axios";

function MyTaskResults() {
  const [client, setClient] = useState(null);
  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/test");
  };
  const RenderClientsResults = () => {
    if (client !== null) {
      let results = JSON.parse(client.attributes.results);

      if (results !== null) {
        return results.map((result, index) => (
          <div style={{ display: "flex" }}>
            <div style={{ width: "5%" }}></div>
            <div className="results">
              <div
                key={index}
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  height: "2vw",
                  alignItems: "center",
                  fontSize: "2vw",
                  fontFamily: "sans-serif",
                }}
              >
                <p>{result.test}</p>
                <p>:</p>
                <p>{result.score}</p>
              </div>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "row",
                  height: "2vw",
                  alignItems: "center",
                  justifyContent: "right",
                  fontSize: "2vw",
                  fontFamily: "sans-serif",
                }}
              >
                <p>Tarih: {result.date}</p>
              </div>
            </div>
            <div style={{ width: "5%" }}></div>
          </div>
        ));
      } else {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
            }}
          >
            {" "}
            <div style={{ width: "12%" }}></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "2vw", fontFamily: "sans-serif" }}>
                Test sonucunuzu görebilmek için Online Test sayfasındaki
                testlerden en az birini uygulamalısınız.
              </p>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>Online Test Sayfasına gitmek için</div>
                <p>&nbsp;</p>
                <div
                  style={{ cursor: "pointer", color: "purple" }}
                  onClick={routeChange}
                >
                  tıklayınız.
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      let clientResponse;
      try {
        const getClientByUserQuery = {
          query: `
            query {
              clients(filters: { user: { id: { eq: ${localStorage.getItem(
                "userId"
              )} } } }) {
                data {
                  id
                  attributes {
                    results
                  }
                }
              }
            }      
          `,
        };

        axios({
          url: `${process.env.REACT_APP_API_URL}/graphql`,
          method: "POST",
          data: getClientByUserQuery,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        }).then((res) => {
          clientResponse = res.data.data.clients.data[0];

          setClient(clientResponse);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (client === null) {
      fetchClient();
    }
  }, [client]);

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
          top: "20%",
          right: "25%",
          border: "none",
          borderRadius: "1.5vw",
          width: "50%",
          height: "70vh",
          background: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          fontSize: "2vw",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "6vw",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Test Sonuçlarım:
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            height: "52.3vh",
            gap: "1vw",
          }}
        >
          <RenderClientsResults />
        </div>
      </div>
    </div>
  );
}

export default MyTaskResults;
