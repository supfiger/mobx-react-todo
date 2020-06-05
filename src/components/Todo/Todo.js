import React from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Todo.sass";

const Todo = (props) => {
  const {
    todo: {
      completed,
      text,
      id,
      isEdit,
      date: { time, day },
    },
    store: {
      TodoStore: {
        onDeleteTodo,
        toggleComplete,
        onEditTodo,
        onChangeInput,
        onSaveTodo,
      },
    },
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
      {isEdit ? (
        <div className="saveTodoWrap">
          <input onChange={(e) => onChangeInput(e)} type="text" value={text} />
          <button onClick={() => onSaveTodo()}>Save</button>
        </div>
      ) : (
        <div className={classNames("todoText", { textCrossOut: completed })}>
          {text}
        </div>
      )}
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
