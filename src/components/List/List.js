import React from "react";
import { observer, inject } from "mobx-react";

import { Todo } from "../index";
import "./List.sass";

const List = (props) => {
  const { list } = props.store.TodoStore;
  const isList = list !== null && list.length > 0;

  return (
    <ul className="List">
      {isList && list.map((todo) => <Todo key={todo.id} {...todo} />)}
    </ul>
  );
};

export default inject("store")(observer(List));
