import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_EXPENSE } from "../store/expense-store";
import { addComma } from "../util/_numberUtils";

export default function ExpenseItem({ expense }) {
  const dispatch = useDispatch();

  const handleRemoveExpense = () => {
    dispatch({ type: REMOVE_EXPENSE, id: expense.id });
  };

  return (
    <div className="expense-item">
      <span>{expense.date}</span>
      <span>{addComma(expense.amount.toString())}원</span>
      <span>{expense.title}</span>
      <button onClick={handleRemoveExpense} className="remove-button">
        삭제
      </button>
    </div>
  );
}
