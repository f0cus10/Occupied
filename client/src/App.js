import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import CreateBlueprint from "./components/CreateBlueprint";
import JoinBlueprint from "./components/JoinBlueprint";
import ViewBlueprint from "./components/ViewBlueprint";
import EditBlueprint from "./components/EditBlueprint";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/home" render={props => <ProtectedRoute component={Home} {...props} />} />
          <Route path="/create" render={props => <ProtectedRoute component={CreateBlueprint} {...props} />} />
          <Route path="/join" render={props => <ProtectedRoute component={JoinBlueprint} {...props} />} />
          <Route path="/view" render={props => <ProtectedRoute component={ViewBlueprint} {...props} />} />
          <Route path="/edit" render={props => <ProtectedRoute component={EditBlueprint} {...props} />} />
          <Route path="/register" component={Registration} />
          {/* <Route path="/profile" component={Profile} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    isAuth: state.user.isAuth
  };
};

export default connect(mapState)(App);
