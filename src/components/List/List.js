import React from "react";
import "./List.sass";
import { observer } from "mobx-react";

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

export default observer(List);
