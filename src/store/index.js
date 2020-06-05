import { create } from "mobx-persist";
import TodoStore from "./TodoStore";

const hydrate = create();

class Store {
  constructor() {
    this.TodoStore = new TodoStore(this);
    hydrate("TodoStore", this.TodoStore);
  }
}

export default new Store();
