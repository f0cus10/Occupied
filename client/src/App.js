import React, { Component } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Authorization from './auth';
import "./App.css";

class App extends Component {
  componentDidMount() {
    const { isAuthenticated } = Authorization;
    console.log(isAuthenticated);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Occupied </h1>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

/**
 * A private route, if isAuthenticated is false, redirects back to "/"
 */
function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = Authorization;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
      }
    />
  )
}

export default App;
