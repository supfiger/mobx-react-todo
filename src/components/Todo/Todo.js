import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { observer, inject } from "mobx-react";

import "./Todo.sass";

const Todo = (props) => {
  const {
    completed,
    text,
    id,
    editing,
    date: { time, day },
    store: {
      TodoStore: {
        onDeleteTodo,
        toggleComplete,
        onEditTodo,
        onChangeTodoInput,
        onSaveTodo,
        onEnterPress,
      },
    },
  } = props;

  const inputRef = useRef();

  useEffect(() => {
    editing && inputRef.current.focus();
  });

  const editTodo = () => {
    onEditTodo(id);
  };

  return (
    <li className="Todo">
      <div
        onClick={() => toggleComplete(id)}
        className={classNames("todoCompleted", { isCompleted: completed })}
      >
        {completed && `✓`}
      </div>
      {editing ? (
        <div className="editTodoWrap">
          <input
            name="editTodo"
            data-id={id}
            type="text"
            value={text}
            onChange={(e) => onChangeTodoInput(id, e)}
            onKeyPress={(e) => onEnterPress(e, "save", id)}
            ref={inputRef}
          />
          <button onClick={() => onSaveTodo(id)}>Save</button>
        </div>
      ) : (
        <div className={classNames("todoText", { textCrossOut: completed })}>
          {text}
        </div>
      )}
      <div className="todoActions">
        <div
          onClick={editTodo}
          className={classNames("todoEdit", { editing: editing })}
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
