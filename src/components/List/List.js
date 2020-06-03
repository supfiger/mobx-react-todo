import React from "react";
import { observer, inject } from "mobx-react";

import { Todo } from "../index";
import "./List.sass";

const List = (props) => {
  const { list } = props.store.TodoStore;

  return (
    <ul className="List">
      {list.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default inject("store")(observer(List));
