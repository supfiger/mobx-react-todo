import React from "react";
import "./List.sass";
import { observer, inject } from "mobx-react";

import { Todo } from "../index";

const List = (props) => {
  const { list } = props.store;

  return (
    <ul className="List">
      {list.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default inject("store")(observer(List));
