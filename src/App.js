import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main {...this.props} />
      </BrowserRouter>
    );
  }
}

export default App;
