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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tc, setTC] = useState("");
  const [surname, setSurname] = useState("");
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
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  const theme = createTheme();

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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={routeChange}
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