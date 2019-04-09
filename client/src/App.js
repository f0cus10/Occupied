import React, { Component } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import CreateBlueprint from "./components/CreateBlueprint";
import JoinBlueprint from "./components/JoinBlueprint";
import ViewBlueprint from "./components/ViewBlueprint";
import EditBlueprint from "./components/EditBlueprint";
import "./App.css";

class App extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Occupied </h1>
          {isAuth && <Navbar />}
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} isAuth={isAuth} />
          <Route path="/create" component={CreateBlueprint} isAuth={isAuth} />
          <Route path="/join" component={JoinBlueprint} isAuth={isAuth} />
          <Route path="/view" component={ViewBlueprint} isAuth={isAuth} />
          <Route path="/edit" component={EditBlueprint} isAuth={isAuth} />
          <Route path="/register" component={Registration} isAuth={isAuth} />
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
