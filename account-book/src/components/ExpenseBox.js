import React from "react";
import { addComma } from "../util/_numberUtils";
import "../scss/expenseBox.scss";
import { useSelector } from "react-redux";

export default function ExpenseBox({ selectedDate }) {
  const expenses = useSelector((state) => state || []);
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;

  // 선택한 연도 및 월을 "YYYY-MM" 형식으로 표현
  const selectedYearMonth = `${selectedYear}-${String(selectedMonth).padStart(
    2,
    "0",
  )}`;

  // 수입 및 지출 계산
  const totalIncome = expenses
    .filter(
      (expense) =>
        expense.amountType === "income" &&
        expense.date.startsWith(selectedYearMonth),
    )
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter(
      (expense) =>
        expense.amountType === "expense" &&
        expense.date.startsWith(selectedYearMonth),
    )
    .reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="budget__status">
      <div className="budget__status-title">
        <h4>{`${selectedYear}년 ${selectedMonth}월 현황`}</h4>
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
