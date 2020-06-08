import React from "react";
import { observer, inject } from "mobx-react";

import "./Filters.sass";

const Filters = (props) => {
  const { onFilterList } = props.store.TodoStore;

  return (
    <div className="Filters">
      <div className="filtersFixedWrap">
        <button name="active" onClick={(e) => onFilterList(e)}>
          Active
        </button>
        <button name="completed" onClick={(e) => onFilterList(e)}>
          Completed
        </button>
        <button name="all" onClick={(e) => onFilterList(e)}>
          All
        </button>
        <button
          name="clear"
          className="clearListButton"
          onClick={(e) => onFilterList(e)}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};

export default inject("store")(observer(Filters));
