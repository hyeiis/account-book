import React from "react";
import { addComma } from "../util/_numberUtils";
import "../scss/expenseBox.scss";
import { useSelector } from "react-redux";

export default function ExpenseBox() {
  const expenses = useSelector((state) => state || []);

  // 수입과 지출을 계산합니다
  const totalIncome = expenses
    .filter((expense) => expense.amountType === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.amountType === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="budget__status">
      <div className="budget__status-title">
        <h4>이번 달 현황</h4>
        <strong>{addComma(totalBalance.toString())}원</strong>
      </div>

      <div className="budget__status-detail">
        <div className="budget__status-detail--desc">
          <span>수입</span>
          <strong className="income_strong">
            {addComma(totalIncome.toString())}원
          </strong>
        </div>
        <div className="budget__status-detail--desc">
          <span>지출</span>
          <strong className="expense_strong">
            {addComma(totalExpense.toString())}원
          </strong>
        </div>
      </div>
    </div>
  );
}
