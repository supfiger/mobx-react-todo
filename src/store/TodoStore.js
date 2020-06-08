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
    const selector = document.querySelector(".addTodoInput");
    selector.focus();
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

    this.list = [...list, todo];

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

  onEnterPress = (e, action, id) => {
    if (e.key === "Enter") {
      switch (action) {
        case "save":
          this.onSaveTodo(id);
          break;
        case "add":
          this.onAddTodo();
          break;
        default:
          break;
      }
    }
  };

  onEditTodo = (id) => {
    const list = [...this.list];

    const editingTodoIndex = list.findIndex((todo) => todo.editing === true);
    const clickedIndex = list.findIndex((todo) => todo.id === id);

    const editingTodo = list[editingTodoIndex];
    const isEditing = editingTodo && editingTodo.editing;
    const clickedTodo = list[clickedIndex];

    clickedTodo.editing = !clickedTodo.editing;

    if (isEditing) {
      editingTodo.editing = false;
    }

    this.list = list;
  };

  onSaveTodo = (id) => {
    const list = [...this.list];
    const index = list.findIndex((todo) => todo.id === id);
    const todo = list[index];
    const isValid = this.validate(todo.text);

    if (isValid) {
      todo.editing = false;
      this.list = list;
    }
  };

  onDeleteTodo = (id) => {
    this.list = this.list.filter((item) => item.id !== id);
  };

  onChangeFormInput = (e) => {
    this.text = e.target.value;
    this.isInputEmpty = false;
  };

  onChangeTodoInput = (id, e) => {
    const list = [...this.list];

    const index = list.findIndex((todo) => todo.id === id);
    const todo = list[index];
    todo.text = e.target.value;

    this.list = list;
  };

  onFilterList = (e) => {
    const filter = e.target.name;
    const list = [...this.list];

    switch (filter) {
      case "active":
        this.filteredList = list.filter((todo) => !todo.completed);
        break;
      case "completed":
        this.filteredList = list.filter((todo) => todo.completed);
        break;
      case "all":
        this.filteredList = [];
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
  updateList: action,
  onAddTodo: action,
  onEditTodo: action,
  onSaveTodo: action,
  onDeleteTodo: action,
  onFilterList: action,
  onClearInput: action,
  onRenderPage: action,
});
