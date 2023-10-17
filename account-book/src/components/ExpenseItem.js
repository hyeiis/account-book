import React from "react";
import { addComma } from "../util/_numberUtils";

export default function ExpenseItem({ expense }) {
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5vh",
    fontSize: "1.3vw",
  };

  return (
    <div className="expense-item" style={style}>
      <span>{expense.title}</span>
      <span>
        {expense.amountType === "income"
          ? `+${addComma(expense.amount.toString())}`
          : `-${addComma(expense.amount.toString())}`}
        원
      </span>
    </div>
  );
}
