import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";

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
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreateBlueprint} />
          <Route path="/join" component={JoinBlueprint} />
          <Route path="/view" component={ViewBlueprint} />
          <Route path="/edit" component={EditBlueprint} />
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
