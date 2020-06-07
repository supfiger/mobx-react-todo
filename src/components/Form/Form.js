import React from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Form.sass";

const Form = (props) => {
  const {
    todo: { text },
    onChangeFormInput,
    onAddTodo,
    onClearList,
    onEnterPress,
    isInputEmpty,
    onFilterList,
  } = props.store.TodoStore;

  return (
    <div className="Form">
      <div
        className={classNames("inputWrap", {
          inputWrapEmpty: isInputEmpty,
        })}
      >
        <input
          name="addTodo"
          className="addTodoInput"
          type="text"
          placeholder="Type something here..."
          value={text}
          onChange={(e) => onChangeFormInput(e)}
          onKeyPress={(e) => onEnterPress(e)}
        />
      </div>
      <div className="formButtons">
        <button className="addTodoButton" onClick={() => onAddTodo()}>
          Add
        </button>
        <div className="filters">
          <button
            name="completed"
            className="completedFilterButton"
            onClick={(e) => onFilterList(e)}
          >
            Completed
          </button>
          <button className="clearListButton" onClick={() => onClearList()}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(Form));
