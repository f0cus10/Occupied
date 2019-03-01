import React, { Component } from 'react';
import Login from './components/Login';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <BrowserRouter>
        <div className="App">
          Occupied
        <Login />
        </div>
      </BrowserRouter>
=======
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.change
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
>>>>>>> 5be038710c6efd59922cd0e162bf80ff83d1905e
    );
  }
}

export default App;
