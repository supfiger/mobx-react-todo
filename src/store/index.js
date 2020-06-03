import TodoStore from "./TodoStore";

class Store {
  constructor() {
    this.TodoStore = new TodoStore();
  }
}

export default new Store();
