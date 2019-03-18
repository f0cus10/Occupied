import React, { Component } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import CreateBlueprint from "./components/CreateBlueprint";
import JoinBlueprint from "./components/JoinBlueprint";
import ViewBlueprint from "./components/ViewBlueprint";
import EditBlueprint from "./components/EditBlueprint";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuth } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Occupied </h1>
          {isAuth && <Navbar />}
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} isAuth={isAuth} />
          <Route path="/create" component={CreateBlueprint} isAuth={isAuth} />
          <Route path="/join" component={JoinBlueprint} isAuth={isAuth} />
          <Route path="/view" component={ViewBlueprint} isAuth={isAuth} />
          <Route path="/edit" component={EditBlueprint} isAuth={isAuth} />
        </div>
      </BrowserRouter>
    );
  }
}

/**
 * A private route, if isAuthenticated is false, redirects back to "/"
 */
function PrivateRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
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
  );
}

const mapState = state => {
  return {
    user: state.user.user,
    isAuth: state.user.isAuth
  };
};

export default connect(mapState)(App);
