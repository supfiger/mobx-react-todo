import React from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Todo.sass";

const TodoContent = (props) => {
  const {
    todo: { completed, text, isEdit },
    onChangeInput,
    onSaveTodo,
  } = props;

  if (isEdit) {
    return (
      <div className="saveTodoWrap">
        <input onChange={(e) => onChangeInput(e)} type="text" value={text} />
        <button onClick={() => onSaveTodo()}>Save</button>
      </div>
    );
  } else {
    return (
      <div className={classNames("todoText", { textCrossOut: completed })}>
        {text}
      </div>
    );
  }
};

const Todo = (props) => {
  const {
    todo: {
      completed,
      text,
      id,
      isEdit,
      date: { time, day },
    },
    store: { onDeleteTodo, toggleComplete, onEditTodo, onChangeInput },
  } = props;

  return (
    <li className="Todo">
      <div
        onClick={() => toggleComplete(id)}
        className={classNames("todoCompleted", {
          isCompleted: completed,
        })}
      >
        {completed && `✓`}
      </div>
      <TodoContent {...props} />
      <div className="todoActions">
        <div
          onClick={() => onEditTodo(id)}
          className={classNames("todoEdit", {
            isEdit: isEdit,
          })}
        >
          ✎
        </div>
        <div onClick={() => onDeleteTodo(id)} className="todoDelete">
          ×
        </div>
      </div>
      <div className="todoDate">
        <div className="todoTime">{time}</div>
        <div className="todoDay">{day}</div>
      </div>
    </li>
  );
};

export default inject("store")(observer(Todo));
