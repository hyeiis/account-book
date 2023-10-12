import { createStore } from "redux";

export const ADD_EXPENSE = "ADD_EXPENSE";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";

//reducer
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_EXPENSE:
      return;
    case REMOVE_EXPENSE:
      return;
    default:
      return state;
  }
};
//store
const store = createStore(reducer);

export default store;