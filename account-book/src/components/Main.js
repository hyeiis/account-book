import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_EXPENSE } from "../store/expense-store"; // Redux에서 사용할 액션 타입 가져오기
import CalendarCustom from "./Calendar";
import ExpenseBox from "./ExpenseBox";
import ExpenseForm from "./ExpenseForm";
import MonthHistory from "./MonthHistory";
import DaysHistory from "./DaysHistory";
import "../scss/main.scss";

export default function Main() {
  const [income, setIncome] = useState(0); // 수입
  const [expenditure, setExpenditure] = useState(0); //지출
  const [displayCase, setDisplayCase] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜 상태
  const [filteredMonthExpenses, setFilteredMonthExpenses] = useState([]);
  const [filteredDayExpenses, setFilteredDayExpenses] = useState([]);
  const expenses = useSelector((state) => state || []);

  const dispatch = useDispatch();

  const handleClear = () => {
    setDisplayCase(0);
  };

  const handleAddExpense = (expense) => {
    expense.date = selectedDate.toISOString().substring(0, 10);
    dispatch({ type: ADD_EXPENSE, expense });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    // Handle data updates for MonthHistory based on selectedDate
    const monthExpenses = expenses.filter(
      (expense) =>
        new Date(expense.date).getFullYear() === selectedDate.getFullYear() &&
        new Date(expense.date).getMonth() === selectedDate.getMonth(),
    );
    setFilteredMonthExpenses(monthExpenses);

    // Handle data updates for DaysHistory based on selectedDate
    const dayExpenses = expenses.filter(
      (expense) =>
        new Date(expense.date).toDateString() === selectedDate.toDateString(),
    );
    setFilteredDayExpenses(dayExpenses);
  }, [selectedDate, expenses]);

  return (
    <>
      <section>
        <div className="main-box">
          <CalendarCustom
            className="calendar"
            onDateChange={setSelectedDate}
            selectedDate={selectedDate}
          />
          <ExpenseBox
            income={income}
            expenditure={expenditure}
            className="expenseBox"
            selectedDate={selectedDate}
          />
          <div className="btnGroup">
            <div
              className="addHistory"
              onClick={() => {
                setDisplayCase(1);
              }}>
              내역 추가하기
            </div>
            <div
              className="showHistory"
              onClick={() => {
                setDisplayCase(2);
              }}>
              이번 달 내역 보기
            </div>
          </div>
        </div>
        <div className="second-box">
          {displayCase === 0 && (
            <DaysHistory
              selectedDate={selectedDate}
              expenses={filteredMonthExpenses}
            />
          )}
          {displayCase === 1 && (
            <ExpenseForm onClear={handleClear} onSubmit={handleAddExpense} />
          )}
          {displayCase === 2 && (
            <MonthHistory
              selectedDate={selectedDate}
              onClear={handleClear}
              expenses={filteredMonthExpenses}
            />
          )}
        </div>
      </section>
    </>
  );
}
