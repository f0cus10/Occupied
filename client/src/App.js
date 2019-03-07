import React, { Component } from 'react';
import Login from './components/Login';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          Occupied
        <Login />
		//test
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
