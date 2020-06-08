import React, { useEffect } from "react";
import { inject } from "mobx-react";

import { List, Form, Filters } from "./components/index";
import "./App.sass";

const App = (props) => {
  useEffect(() => props.store.TodoStore.onRenderPage());

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
};

export default inject("store")(App);
