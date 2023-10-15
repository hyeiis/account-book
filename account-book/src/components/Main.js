import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_EXPENSE, REMOVE_EXPENSE } from "../store/expense-store"; // Redux에서 사용할 액션 타입 가져오기
import CalendarCustom from "./Calendar";
import ExpenseBox from "./ExpenseBox";
import ExpenseForm from "./ExpenseForm";
import MonthHistory from "./MonthHistory";
import DayHistory from "./DaysHistory";
import "../scss/main.scss";

export default function Main() {
  const [income, setIncome] = useState(0); // 수입
  const [expenditure, setExpenditure] = useState(0); //지출
  const [displayCase, setDisplayCase] = useState(0);

  const dispatch = useDispatch();

  const handleClear = () => {
    setDisplayCase(0);
  };

  const handleAddExpense = (expense) => {
    dispatch({ type: ADD_EXPENSE, payload: expense }); // Redux에 내역 추가 액션 디스패치

    // ...
  };

  return (
    <>
      <section>
        <div className="main-box">
          <CalendarCustom className="calendar" />
          <ExpenseBox
            income={income}
            expenditure={expenditure}
            className="expenseBox"
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
          {displayCase === 0 && <DayHistory />}
          {displayCase === 1 && (
            <ExpenseForm onClear={handleClear} onSubmit={handleAddExpense} />
          )}
          {displayCase === 2 && <MonthHistory />}
        </div>
      </section>
    </>
  );
}
