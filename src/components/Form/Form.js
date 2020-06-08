import React from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Form.sass";

const Form = (props) => {
  const {
    text,
    onChangeFormInput,
    onAddTodo,
    onEnterPress,
    isInputEmpty,
    onClearInput,
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
          onKeyPress={(e) => onEnterPress(e, "add")}
        />
        <button className="clearInputButton" onClick={() => onClearInput()}>
          ×
        </button>
      </div>
      <div className="formButtons">
        <button className="addTodoButton" onClick={() => onAddTodo()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default inject("store")(observer(Form));
