import React, { Component } from "react";
import { inject } from "mobx-react";

import { List, Form, Input } from "./components/index";
import "./App.sass";

@inject("store")
export default class App extends Component {
  componentDidMount() {
    this.props.store.setFocus();
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="contentIn">
            <h2 className="appTitle">Todo app</h2>
            <Form />
            <List />
          </div>
        </div>
      </div>
    );
  }
}
