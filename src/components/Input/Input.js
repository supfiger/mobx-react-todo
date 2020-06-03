import React, { Component } from "react";
import { observer } from "mobx-react";
import { decorate, observable, action } from "mobx";

const TodoStore = observable({
  age: 20,

  increment() {
    this.age++;
  },
  decrement() {
    this.age++;
  },
});

@observer
export default class Input extends Component {
  render() {
    return (
      <div className="Input">
        <h1>{TodoStore.age}</h1>
        <button onClick={TodoStore.increment}>+1</button>
        <button onClick={TodoStore.decrement}>+1</button>
      </div>
    );
  }
}
