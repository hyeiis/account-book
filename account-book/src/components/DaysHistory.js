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
    const updatedExpenses = filteredExpenses.filter(
      (expense) => expense.id !== id,
    );
    setFilteredExpenses(updatedExpenses);

    dispatch({ type: REMOVE_EXPENSE, id });
  };

  const handleEditExpense = (id, updatedExpense) => {
    dispatch({ type: UPDATE_EXPENSE, id, updatedExpense });
  };

  return (
    <div className="day-history">
      <div className="day-summary">
        <h2>{selectedDate.getDate()}일</h2>
        <div className="day-summary__item">
          <h4>수입:</h4>
          <h4 className="income">{addComma(totalIncome.toString())}원</h4>
        </div>
        <div className="day-summary__item">
          <h4>지출:</h4>
          <h4 className="expense">{addComma(totalExpense.toString())}원</h4>
        </div>
      </div>
      <div className="expense-list">
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <span>{expense.title}</span>
            <span>{addComma(expense.amount.toString())}원</span>

            <div>
              <button
                onClick={() => handleEditExpense(expense.id)}
                className="edit-button">
                수정
              </button>
              &nbsp;
              <button
                onClick={() => handleRemoveExpense(expense.id)}
                className="remove-button">
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
