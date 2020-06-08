import React from "react";
import { observer, inject } from "mobx-react";

import { Todo } from "../index";
import "./List.sass";

const List = (props) => {
  const { list, filteredList } = props.store.TodoStore;

  const currentList = filteredList.length > 0 ? filteredList : list;
  const isList = currentList !== null && currentList.length > 0;

  return (
    <ul className="List">
      {isList &&
        currentList.reverse().map((todo) => <Todo key={todo.id} {...todo} />)}
    </ul>
  );
};

export default inject("store")(observer(List));
