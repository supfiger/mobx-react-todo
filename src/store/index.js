import { reaction, toJS } from "mobx";
import TodoStore from "./TodoStore";

class Store {
  constructor() {
    this.TodoStore = new TodoStore(this);
  }
}

reaction(
  () => JSON.stringify(Store),
  (json) => {
    localStorage.setItem("store", json);
  },
  {
    delay: 500,
  }
);

let json = localStorage.getItem("store");
if (json) {
  Object.assign(Store, JSON.parse(json));
}

export default new Store();
