import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx";

import TodoStore from "./store/TodoStore";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

configure({ enforceActions: "observed" });

const Root = () => (
  <Provider store={TodoStore}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.querySelector("#root"));
serviceWorker.unregister();
