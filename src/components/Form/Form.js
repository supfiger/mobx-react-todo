import React from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Form.sass";

const Form = (props) => {
  const {
    onChangeInput,
    onAddTodo,
    onEnterPress,
    todo,
    isInputEmpty,
  } = props.store;
  const { text } = todo;

  return (
    <div className="Form">
      <div
        className={classNames("inputWrap", {
          inputWrapEmpty: isInputEmpty,
        })}
      >
        <input
          className="addTodoInput"
          type="text"
          placeholder="Type something here..."
          value={text}
          onChange={(e) => onChangeInput(e)}
          onKeyPress={(e) => onEnterPress(e)}
        />
      </div>
      <div className="buttonWrap">
        <button className="addTodoButton" onClick={() => onAddTodo()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default inject("store")(observer(Form));
