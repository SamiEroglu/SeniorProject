import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Sign/SignInSide";
import Home from "./Components/Page";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
