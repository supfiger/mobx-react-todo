import { decorate, observable, action } from "mobx";
import { persist } from "mobx-persist";

export default class TodoStore {
  list = [];
  filteredList = [];
  isInputEmpty = null;
  text = "";

  resetData = () => {
    this.isInputEmpty = null;
    this.text = "";
  };

  toggleComplete = (id) => {
    const list = [...this.list];

    list.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
    });

    this.list = list;
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
    const list = [...this.list];

    const todo = {
      text: this.text,
      id: Date.now(),
      completed: false,
      date: this.todoGetDate(),
      editing: false,
    };

    list.push(todo);
    this.list = list;

    this.resetData();
  };

  onAddTodo = () => {
    const { text } = this;
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
      }
    });

    this.list = list;
  };

  onSaveTodo = (id) => {};

  onDeleteTodo = (id) => {
    this.list = this.list.filter((item) => item.id !== id);
  };

  onChangeFormInput = (e) => {
    this.text = e.target.value;
    this.isInputEmpty = false;
  };

  onChangeTodoInput = (id, e) => {
    const list = [...this.list];

    list.map((todo) => {
      if (todo.id === id) {
        todo.text = e.target.value;
      }
    });

    this.list = list;
  };

  onFilterList = (e) => {
    const filterName = e.target.name;
    const list = [...this.list];

    switch (filterName) {
      case "active":
        this.filteredList = list.filter((todo) => !todo.completed);
        break;
      case "completed":
        this.filteredList = list.filter((todo) => todo.completed);
        break;
      case "all":
        this.filteredList = [];
        this.list = list;
        break;
      case "clear":
        this.filteredList = [];
        this.list = [];
        break;
      default:
        break;
    }
  };

  onClearInput = () => {
    this.text = "";
  };

  getFilteredList = () => {
    return this.filteredList;
  };
}

decorate(TodoStore, {
  list: [observable, persist("list")],
  filteredList: [observable, persist("list")],
  isInputEmpty: [observable, persist],
  text: [observable, persist],
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
  onFilterList: action,
  onClearInput: action,
});
