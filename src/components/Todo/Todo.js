import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";

import "./Todo.sass";

const Todo = (props) => {
  const {
    completed,
    text,
    id,
    isEdit,
    date: { time, day },
  } = props.todo;

  const {
    onDeleteTodo,
    toggleComplete,
    onEditTodo,
    onSaveTodo,
    onChangeInput,
  } = props.store;

  const todoInfo = () => {
    if (isEdit) {
      return (
        <div className="saveTodoWrap">
          <input onChange={(e) => onChangeInput(e)} type="text" value={text} />
          <button onClick={() => onSaveTodo()}>Save</button>
        </div>
      );
    }

    return (
      <div className={classNames("todoText", { textCrossOut: completed })}>
        {text}
      </div>
    );
  };

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
      {todoInfo()}
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

export default observer(Todo);
