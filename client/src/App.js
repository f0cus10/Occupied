import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// import CardExampleCard from "./components/Card.js";
import "semantic-ui-css/semantic.min.css";
import data from "./dummydata.json";
import "./App.css";


class App extends Component {
  componentDidMount() {
    console.log(data);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          Occupied
		  
          <Login />
          {/* <div className="card-container"> */}
            {/* <CardExampleCard /> */}
          {/* </div> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
