import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login1 from "./Components/Sign/SignInSide";
import Home from "./Components/Page";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login1 />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
