import { createStore } from "redux";

export const ADD_EXPENSE = "ADD_EXPENSE";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";

//reducer
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      return state.filter((expense) => expense.id !== action.id);
    default:
      return state;
  }
};
//store
const store = createStore(reducer);

export default store;
