import { decorate, observable, action, extendObservable } from "mobx";
import { persist } from "mobx-persist";

export default class TodoStore {
  list = [];
  isInputEmpty = null;
  todo = {
    text: "",
    id: null,
    completed: false,
    date: null,
    editing: false,
  };

  resetData = () => {
    extendObservable(this, {
      isInputEmpty: null,
      todo: {
        text: "",
        id: null,
        completed: false,
        date: null,
        editing: false,
      },
    });
  };

  toggleComplete = (id) => {
    const list = [...this.list];

    list.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
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
    const todo = { ...this.todo };
    const list = [...this.list];

    todo.id = Date.now();
    todo.date = this.todoGetDate();
    list.push(todo);

    this.todo = todo;
    this.list = list;

    this.resetData();
  };

  onAddTodo = () => {
    const { text } = this.todo;
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
    const list = [...this.list];

    list.map((todo) => {
      if (todo.id === id) {
        todo.editing = !todo.editing;
        this.todo = todo;
      }
    });

    this.list = list;
    console.log("editing", this.todo.editing);
  };

  onSaveTodo = (id) => {};

  onDeleteTodo = (id) => {
    this.list = this.list.filter((item) => item.id !== id);
  };

  onChangeFormInput = (e) => {
    this.todo.text = e.target.value;
    this.isInputEmpty = false;
  };

  onChangeTodoInput = (e) => {
    const todo = { ...this.todo };
    todo.text = e.target.value;
    console.log("todo", todo);
    this.todo.text = todo.text;
  };

  onClearList = () => {
    let newList = [...this.list];
    newList = [];

    this.list = newList;
  };

  onFilterList = (e) => {
    const filterName = e.target.name;

    switch (filterName) {
      case "completed":
        break;
      default:
        break;
    }
  };
}

decorate(TodoStore, {
  list: [observable, persist("list")],
  isInputEmpty: [observable, persist],
  todo: [observable, persist("object")],
  resetData: action,
  toggleComplete: action,
  onChangeFormInput: action,
  onChangeTodoInput: action,
  setFocus: action,
  validate: action,
  todoGetDate: action,
  updateList: action,
  onAddTodo: action,
  onEnterPress: action,
  onEditTodo: action,
  onSaveTodo: action,
  onDeleteTodo: action,
  onClearList: action,
  onFilterList: action,
});
