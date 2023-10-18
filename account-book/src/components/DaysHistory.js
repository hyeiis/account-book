import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_EXPENSE, UPDATE_EXPENSE } from "../store/expense-store";
import { addComma } from "../util/_numberUtils";
import "../scss/daysHistory.scss";
import EditExpenseModal from "./ExpenseEdit";

export default function DaysHistory({ selectedDate }) {
  const expenses = useSelector((state) => state || []);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // 선택한 날짜의 다음 날을 계산하여 날짜 맞춤
    const correctedDate = new Date(selectedDate);
    correctedDate.setDate(selectedDate.getDate() + 1);

    // 선택한 날짜에 해당하는 내역필터링
    const dayExpenses = expenses.filter(
      (expense) =>
        expense.date === correctedDate.toISOString().substring(0, 10),
    );
    setFilteredExpenses(dayExpenses); // filteredExpenses 업데이트
  }, [selectedDate, expenses]);

  // 수입 및 지출 계산
  const totalIncome = filteredExpenses
    .filter((expense) => expense.amountType === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = filteredExpenses
    .filter((expense) => expense.amountType === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  // 내역 삭제
  const handleRemoveExpense = (id) => {
    dispatch({ type: REMOVE_EXPENSE, id });
  };

  // 내역 수정
  const handleEditExpense = (expense) => {
    // 모달 열기
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  // 수정된 내역 저장
  const handleSaveEditedExpense = (updatedExpense) => {
    dispatch({ type: UPDATE_EXPENSE, id: updatedExpense.id, updatedExpense });
    setIsEditModalOpen(false);
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
            <span>
              {expense.amountType === "income"
                ? `+${addComma(expense.amount.toString())}`
                : `-${addComma(expense.amount.toString())}`}
              원
            </span>

            <div>
              <button
                onClick={() => handleEditExpense(expense)}
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

      {isEditModalOpen && (
        // 모달 열기
        <EditExpenseModal
          expense={selectedExpense}
          onSave={handleSaveEditedExpense}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
