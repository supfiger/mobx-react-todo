import React from "react";
import { observer, inject } from "mobx-react";

import { Todo } from "../index";
import "./List.sass";

const List = (props) => {
  const { list, filteredList } = props.store.TodoStore;

  const currentList = filteredList.length > 0 ? filteredList : list;
  const reverseList = currentList.slice().reverse();

  const isList = reverseList !== null && reverseList.length > 0;

  return (
    <ul className="List">
      {isList && reverseList.map((todo) => <Todo key={todo.id} {...todo} />)}
    </ul>
  );
};

export default inject("store")(observer(List));
