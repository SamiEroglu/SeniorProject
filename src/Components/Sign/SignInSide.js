import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.checkValidity());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#6B48FF",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          backgroundColor: "#F8F8FF",
          borderRadius: "10px",
          padding: "50px",
          minWidth: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#6B48FF",
          }}
        >
          Giriş Yap
        </h1>
        <div className="form-group">
          <label style={{ color: "#6B48FF" }}>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email adresinizi girin"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!isValidEmail && (
            <div style={{ color: "red" }}>
              Lütfen geçerli bir email adresi girin
            </div>
          )}
        </div>
        <div className="form-group">
          <label style={{ color: "#6B48FF" }}>Şifre</label>
          <input
            type="password"
            className="form-control"
            placeholder="Şifrenizi girin"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Link to="/home">
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#6B48FF",
              borderColor: "#6B48FF",
              marginTop: "30px",
            }}
          >
            Giriş Yap
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
