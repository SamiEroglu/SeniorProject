import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Components/Page";
import Login from "./Components/Sign/SignInSide";

const isLoggedIn = true;

// Eğer kullanıcı giriş yapmamışsa ana sayfaya yönlendirme yapılır
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Burada gerçek kullanıcı bilgisi kontrol edilir
  return (
    <Route
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
