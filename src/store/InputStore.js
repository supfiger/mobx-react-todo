import { decorate, observable, action } from "mobx";

const myStore = new (class myStore {
  @observable age = 20;
  @observable bntNewVal = "";

  @action increment() {
    this.age++;
  }
  @action decrement() {
    this.age--;
  }
  @action onChangeBntNewVal(e) {
    this.bntNewVal = e.target.value;
  }
})();

export default myStore;
