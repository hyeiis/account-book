import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_EXPENSE, UPDATE_EXPENSE } from "../store/expense-store";
import { addComma } from "../util/_numberUtils";
import "../scss/daysHistory.scss";

export default function DaysHistory({ selectedDate }) {
  const expenses = useSelector((state) => state || []);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const correctedDate = new Date(selectedDate);
    correctedDate.setDate(selectedDate.getDate() + 1);

    const filtered = expenses.filter(
      (expense) =>
        expense.date === correctedDate.toISOString().substring(0, 10),
    );
    setFilteredExpenses(filtered);
  }, [selectedDate, expenses]);

  const totalIncome = filteredExpenses
    .filter((expense) => expense.amountType === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = filteredExpenses
    .filter((expense) => expense.amountType === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  const handleRemoveExpense = (id) => {
    dispatch({ type: REMOVE_EXPENSE, id });
  };

  const handleEditExpense = (id, updatedExpense) => {
    dispatch({ type: UPDATE_EXPENSE, id, updatedExpense });
  };

  return (
    <div className="day-history">
      <div className="day-summary">
        <div className="day-summary__item">
          <span>수입:</span>
          <span>{addComma(totalIncome.toString())}원</span>
        </div>
        <div className="day-summary__item">
          <span>지출:</span>
          <span>{addComma(totalExpense.toString())}원</span>
        </div>
      </div>
      {filteredExpenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <span>{expense.date}</span>
          <span>{addComma(expense.amount.toString())}원</span>
          <span>{expense.title}</span>
          <button
            onClick={() => handleEditExpense(expense.id)}
            className="edit-button">
            수정
          </button>
          <button
            onClick={() => handleRemoveExpense(expense.id)}
            className="remove-button">
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
