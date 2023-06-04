import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tc, setTC] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.checkValidity());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTCChange = (event) => {
    setTC(event.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  let navigate = useNavigate();

  const theme = createTheme();

  const createUser = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/local/register`, {
        username: name + " " + surname,
        email: email,
        password: password,
      })
      .then(async (res) => {
        console.log("user created.");

        const userId = res.data.user.id;

        await axios
          .put(
            `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
            {
              phone: phone,
              tc: tc,
              gender: gender,
              role: 4,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
              },
            }
          )
          .then(async () => {
            console.log("user created and updated.");

            let consultantUserId = 26;

            let consultantId;

            const getConsultantIdQuery = {
              query: `
              query {
                consultants(filters: { user: { id: { eq: ${consultantUserId} } } }) {
                  data {
                    id
                  }
                }
              }
              `,
            };

            axios({
              url: `${process.env.REACT_APP_API_URL}/graphql`,
              method: "POST",
              data: getConsultantIdQuery,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
              },
            }).then(async (res) => {
              consultantId = res.data.data.consultants.data[0].id;

              console.log(consultantId);

              await axios
                .post(
                  `${process.env.REACT_APP_API_URL}/api/clients`,
                  {
                    data: {
                      user: userId,
                      consultant: parseInt(consultantId),
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                  }
                )
                .then(() => {
                  navigate("/");
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/1920×1080/?city,night,1920x1080)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "#f7f0fe" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 0.5, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Üye Ol
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              style={{ scale: "0.8" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="İsim"
                type="name"
                id="name"
                autoComplete="current-password"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="surname"
                label="Soy İsim"
                type="surname"
                id="surname"
                autoComplete="current-password"
                value={surname}
                onChange={handleSurnameChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Telefon Numarası"
                type="phone"
                id="phone"
                autoComplete="current-password"
                value={phone}
                onChange={handlePhoneChange}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                label="Cinsiyet"
                type="gender"
                id="gender"
                autoComplete="current-password"
                value={phone}
                onChange={handleGenderChange}
              /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="tc"
                label="TC Kimlik Numarası"
                type="tc"
                id="tc"
                autoComplete="current-password"
                value={tc}
                onChange={handleTCChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Adresi"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.9vw",
                    lineHeight: "0.2vw",
                    paddingLeft: ".2vw",
                    paddingTop: ".1vw",
                  }}
                >
                  Lütfen geçerli bir email adresi girin
                </div>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <select
                name="gender"
                onChange={handleGenderChange}
                value={gender}
                style={{
                  fontSize: "2vh",
                  border: "none",
                  borderRadius: ".5vw",
                  width: "10vw",
                  height: "5vh",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  backgroundColor: "steelblue",
                  color: "white",
                }}
              >
                <option value="Male">Erkek</option>
                <option value="Female">Kadın</option>
                <option value="Other">Diğer</option>
              </select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={createUser}
              >
                Üye Ol
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Hesabın Var Mı?Giriş Yap"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
