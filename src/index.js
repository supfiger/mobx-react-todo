import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { configure } from "mobx";

import "./App.sass";
import { List, Form, Input } from "./components/index";
import store from "./store";
import myStore from "./store/InputStore";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

configure({ enforceActions: "observed" });

@observer
class App extends Component {
  componentDidMount() {
    // const { setFocus } = store;
    // setFocus();
  }

  render() {
    const { myStore } = this.props;
    const { store } = this.props;
    return (
      <div className="App">
        <div className="content">
          <div className="contentIn">
            <h2 className="appTitle">Todo app</h2>
            <Form store={store} />
            <List store={store} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App myStore={myStore} store={store} />,
  document.getElementById("root")
);
serviceWorker.unregister();
