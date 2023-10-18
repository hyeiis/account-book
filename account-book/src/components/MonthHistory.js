import React from "react";
import { useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import ClearIcon from "@mui/icons-material/Clear";
import "../scss/monthHistory.scss";

export default function MonthHistory({ selectedDate, onClear }) {
  // Redux 스토어에서 내역 가져오기
  const expenses = useSelector((state) => state || []);

  // 선택한 연도와 월 가져오기
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // 0부터 시작하므로 +1
  const selectedYearMonth = `${year}-${String(month).padStart(2, "0")}`;

  // 선택한 연도와 월에 해당하는 내역 필터링
  const selectedDateExpenses = expenses.filter((expense) => {
    const expenseYearMonth = expense.date.substring(0, 7); // 내역의 연도와 월 (예: "2023-10")
    return expenseYearMonth === selectedYearMonth;
  });

  return (
    <div className="month-history">
      <div className="top">
        <h2>{`${year}년 ${month}월 내역`}</h2>
        <ClearIcon
          className="x-icon"
          onClick={() => {
            onClear();
          }}
        />
      </div>
      <div className="main">
        <ExpenseList expenses={selectedDateExpenses} />
      </div>
    </div>
  );
}
