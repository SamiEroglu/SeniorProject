import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Sign/SignInSide";
import SignUpSide from "./Components/Sign/SignUpSide";
import Home from "./Components/Page";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import TestPage from "./Components/OnlineTest/TestPage";
import BeckDepresyonTesti from "./Components/OnlineTest/Tests/BeckDepresyonTesti";
import GoNoGoTesti from "./Components/OnlineTest/Tests/GoNoGoTesti";
import AnksiyeteTesti from "./Components/OnlineTest/Tests/AnksiyeteTesti";
import MyTaskResult from "./Components/Profile/TaskResults/MyTaskResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/uyeol" element={<SignUpSide />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test1" element={<BeckDepresyonTesti />} />
        <Route path="/test2" element={<GoNoGoTesti />} />
        <Route path="/test3" element={<AnksiyeteTesti />} />
        <Route path="/myresults" element={<MyTaskResult />} />
      </Routes>
    </Router>
  );
}

export default App;
