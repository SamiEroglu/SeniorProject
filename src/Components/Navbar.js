import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isConsultant, setisConsultant] = useState(false);

  useEffect(() => {
    const consultantCheck = async () => {
      try {
        await getUsersRole();
      } catch (e) {
        console.log(e);
      }
    };

    consultantCheck();
  }, []);

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

  const routeChange3 = () => {
    navigate("/home");
  };
  const routeChange4 = () => {
    navigate("/myresults");
  };

  const getUsersRole = async () => {
    let userId;
    let role;

    axios({
      url: `${process.env.REACT_APP_API_URL}/api/users/me`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      userId = res.data.id;
      localStorage.setItem("userId", userId);

      const getUserQuery = {
        query: `
				query {
				usersPermissionsUser(id: ${userId}) {
					data {
					attributes {
						username
						role {
						data {
							attributes {
							name
							}
						}
						}
					}
					}
				}
			}
			`,
      };
      axios({
        url: `${process.env.REACT_APP_API_URL}/graphql`,
        method: "POST",
        data: getUserQuery,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      }).then((res) => {
        role =
          res.data.data.usersPermissionsUser.data.attributes.role.data
            .attributes.name;
        localStorage.setItem("role", role);
        localStorage.setItem(
          "username",
          res.data.data.usersPermissionsUser.data.attributes.username
        );

        if (role === "Consultant") {
          setisConsultant(true);
        } else if (role === "Client") {
          setisConsultant(false);
        }
      });
    });

    return role;
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
          {isConsultant === true && (
            <li style={{ cursor: "pointer" }} onClick={routeChange1}>
              Danışan Bilgileri
            </li>
          )}
          {isConsultant === false && (
            <li style={{ cursor: "pointer" }} onClick={routeChange4}>
              Test Sonuçlarım
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
