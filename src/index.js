import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx";

import "./App.sass";
import { List, Form, Input } from "./components/index";
import store from "./store";
import myStore from "./store/InputStore";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

configure({ enforceActions: "observed" });

class App extends Component {
  componentDidMount() {
    const { setFocus } = store;
    setFocus();
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

const Root = () => (
  <Provider store={store}>
    <App myStore={myStore} />;
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
