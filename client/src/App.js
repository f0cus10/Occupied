import React, { PureComponent } from "react";
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import PageLayout from './components/PageLayout';
import Registration from "./components/Registration";
import Home from "./components/Home";
import CreateBlueprint from "./components/CreateBlueprint";
import CreateSpace from './components/CreateSpace';
import JoinBlueprint from "./components/JoinBlueprint";
import ViewBlueprint from "./components/ViewBlueprint";
import EditBlueprint from "./components/EditBlueprint";
import Profile from "./components/Profile";
import Help from "./components/Help";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Route exact path="/" render={props => <PageLayout component={Login} {...props} />} /> */}
          <Route exact path="/" component={Login} />
          <Route path="/home" render={props => <ProtectedRoute component={Home} {...props} />} />
          <Route path="/create" render={props => <ProtectedRoute component={CreateBlueprint} {...props} back={'Home'} />} />
          <Route path="/createspace" render={props => <ProtectedRoute component={CreateSpace} {...props} back={'Home'} />} />
          <Route path="/join" render={props => <ProtectedRoute component={JoinBlueprint} {...props} back={'Home'} />} />
          <Route path="/view/:blueprintId" render={props => <ProtectedRoute component={ViewBlueprint} {...props} back={'Home'} />} />
          <Route path="/profile/:profileId" render={props => <ProtectedRoute component={Profile} {...props} back={'Home'} />} />
          <Route path="/help" render={props => <ProtectedRoute component={Help} {...props} back={'Home'} />} />
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
