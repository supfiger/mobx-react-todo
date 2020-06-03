import { decorate, observable, action, extendObservable } from "mobx";

class Store {
  list = [];
  isInputEmpty = null;
  todo = {
    text: "",
    id: null,
    completed: false,
    date: null,
    isEdit: false,
  };

  resetData = () => {
    extendObservable(this, {
      isInputEmpty: null,
      todo: {
        text: "",
        id: null,
        completed: false,
        date: null,
        isEdit: false,
      },
    });
  };

  toggleComplete = (id) => {
    let todo = { ...this.todo };
    let list = [...this.list];

    list.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      this.todo = todo;
      this.list = list;
      return todo;
    });
  };

  setFocus = () => {
    const addTodoInput = document.querySelector(".addTodoInput");
    addTodoInput.focus();
  };

  validate = (text) => {
    return text !== "" && text.length < 50;
  };

  todoGetDate = () => {
    const fullDate = new Date();
    const time = `${fullDate.toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    })}`;
    const day = `${fullDate.toLocaleString("default", {
      day: "2-digit",
    })} ${fullDate.toLocaleString("en", {
      month: "long",
    })} ${fullDate.getFullYear()}`;

    const date = {
      time,
      day,
    };

    return date;
  };

  updateList = () => {
    let todo = { ...this.todo };
    let list = [...this.list];

    todo.id = Date.now();
    todo.date = this.todoGetDate();
    list.push(todo);

    this.todo = todo;
    this.list = list;

    console.log("list", list);

    this.resetData();
  };

  onAddTodo = () => {
    const text = this.todo.text;
    const isValid = this.validate(text);

    if (isValid) {
      this.updateList();
      this.setFocus();
    } else {
      this.isInputEmpty = true;
    }
  };

  onEnterPress = (e) => {
    e.key === "Enter" && this.onAddTodo();
  };

  onEditTodo = (id) => {
    const list = this.list;

    list.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = !todo.isEdit;
      }
      return todo;
    });
  };

  onSaveTodo = (id) => {};

  onDeleteTodo = (id) => {
    const list = this.list;
    this.list = list.filter((item) => item.id !== id);
  };

  onChangeInput = (e) => {
    this.todo.text = e.target.value;
    this.isInputEmpty = false;
  };
}

decorate(Store, {
  list: observable,
  isInputEmpty: observable,
  todo: observable,
  resetData: action,
  toggleComplete: action,
  onChangeInput: action,
  setFocus: action,
  validate: action,
  todoGetDate: action,
  updateList: action,
  onAddTodo: action,
  onEnterPress: action,
  onEditTodo: action,
  onSaveTodo: action,
  onDeleteTodo: action,
});

const store = new Store();

export default store;
