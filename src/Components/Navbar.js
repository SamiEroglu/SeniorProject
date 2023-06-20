import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/page.css";
function Navbar() {
  const [isConsultant, setisConsultant] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState();

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

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleShow = () => {
    setIsOpen(!isOpen);
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
        <li
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "start",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "2.5vh",
            listStyleType: "none",
          }}
        >
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <li>{localStorage.getItem("username")}</li>
            {isDropdownOpen && (
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  display: "flex",
                  fontFamily: "sans-serif",
                  fontSize: "2.5vh",
                  marginLeft: "2vh",
                }}
                onClick={handleShow}
              >
                Çıkış Yap
              </button>
            )}
          </div>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  zIndex: "3",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "1.5vw",
                  width: "30%",
                  height: "30vh",
                  background: "white",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  color: "black",
                  fontFamily: "sans-serif",
                  fontSize: "2vw",
                  gap: "1vw",
                }}
              >
                <div>Çıkış Yapmak İstediğinizden Emin Misiniz?</div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1vw" }}
                >
                  <button className="morebuttonstyle" onClick={logout}>
                    Evet
                  </button>
                  <button className="morebuttonstyle" onClick={handleShow}>
                    Hayır
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
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
