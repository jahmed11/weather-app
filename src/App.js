import React, { Component } from "react";
import Weather from "./container/weather";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Weather />
      </div>
    );
  }
}

export default App;
