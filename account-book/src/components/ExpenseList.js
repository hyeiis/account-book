import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses }) {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
