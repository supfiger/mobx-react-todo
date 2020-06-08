import React, { Component } from "react";
import { inject } from "mobx-react";

import { List, Form, Filters } from "./components/index";
import "./App.sass";

@inject("store")
export default class App extends Component {
  componentDidMount() {
    this.props.store.TodoStore.setFocus();
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <h2 className="appTitle">Todo app</h2>
          <Form />
          <List />
          <Filters />
        </div>
      </div>
    );
  }
}
