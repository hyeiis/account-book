import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "../scss/expenseEdit.scss";

export default function EditExpenseModal({ expense, onSave, onClose }) {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });

  const handleSave = () => {
    onSave(updatedExpense); // 수정된 내역을 상위 컴포넌트로 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="edit-expense-modal">
      <div className="top">
        <h2>내역 수정</h2>
        <ClearIcon
          className="x-icon"
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <div className="main">
        <div>
          <label>제목</label>
          <input
            type="text"
            value={updatedExpense.title}
            onChange={(e) =>
              setUpdatedExpense({ ...updatedExpense, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>금액</label>
          <input
            type="text" // type 변경
            value={updatedExpense.amount}
            onChange={(e) =>
              setUpdatedExpense({
                ...updatedExpense,
                amount: parseFloat(e.target.value),
              })
            }
            maxLength={10}
            required
          />
        </div>
        <div className="type">
          <label>수입</label>
          <input
            type="radio"
            name="type"
            value="income"
            checked={updatedExpense.amountType === "income"}
            onChange={() =>
              setUpdatedExpense({
                ...updatedExpense,
                amountType: "income",
              })
            }
          />
          <label>지출</label>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={updatedExpense.amountType === "expense"}
            onChange={() =>
              setUpdatedExpense({
                ...updatedExpense,
                amountType: "expense",
              })
            }
          />
        </div>
        <button onClick={handleSave}>완료</button>
      </div>
    </div>
  );
}
