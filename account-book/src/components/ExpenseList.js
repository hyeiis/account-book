import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses }) {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.3vw",
    color: "gray",
  };

  // 내역을 날짜순으로 정렬
  expenses.sort((a, b) => (a.date < b.date ? -1 : 1));

  // 중복되지 않는 날짜 목록 가져오기
  const uniqueDates = Array.from(
    new Set(expenses.map((expense) => expense.date)),
  );

  return (
    <div className="expense-list">
      {uniqueDates.map((date, index) => {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate();
        const today = new Date();
        let dayString = day + "일";
        let dayOfWeek = parsedDate.toLocaleDateString("ko-KR", {
          weekday: "long",
        });
        if (parsedDate.toDateString() === today.toDateString()) {
          dayOfWeek = "오늘";
        }

        // 해당 날짜의 수입 및 지출 계산
        const incomeTotal = expenses
          .filter(
            (expense) =>
              expense.date === date && expense.amountType === "income",
          )
          .reduce((total, expense) => total + expense.amount, 0);

        const expenseTotal = expenses
          .filter(
            (expense) =>
              expense.date === date && expense.amountType === "expense",
          )
          .reduce((total, expense) => total + expense.amount, 0);

        return (
          <div key={date}>
            <p style={style}>
              <span>
                {dayString} ({dayOfWeek})
              </span>
              <span style={{ color: "lightgreen" }}>
                {incomeTotal > 0 ? ` +${incomeTotal.toLocaleString()}원` : ""}
                <span style={{ color: "lightcoral" }}>
                  {expenseTotal > 0
                    ? ` -${expenseTotal.toLocaleString()}원`
                    : ""}
                </span>
              </span>
            </p>
            {expenses
              .filter((expense) => expense.date === date)
              .map((filteredExpense) => (
                <ExpenseItem
                  key={filteredExpense.id}
                  expense={filteredExpense}
                />
              ))}
            {index < uniqueDates.length - 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
}
