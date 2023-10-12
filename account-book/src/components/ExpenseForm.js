import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_EXPENSE, CLEAR_FORM } from "./store/expense-store";
import ClearIcon from "@mui/icons-material/Clear";
import { addComma, deleteComma } from "../util/numberUtils";
import "../scss/expenseForm.scss";

export default function ExpenseForm({ onSubmit, onClear }) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);
  const [expenseType, setExpenseType] = useState("income");
  const dispatch = useDispatch();
  // const isEnteredWrongAmount = useSelector((state) => state.isEnteredWrongAmount);  // Redux 스토어에서 상태 가져오기

  const getDate = useCallback(() => {
    return new Date().toISOString().substring(0, 10);
  }, []);

  const handleAmount = (e) => {
    let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(e.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    const formattedAmount = deleteComma(e.target.value); // 쉼표 제거
    setAmount(addComma(formattedAmount)); // 쉼표 추가
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredData = {};
    setDate("");
    setTitle("");
    setAmount("");
    setExpenseType("income");
  };

  return (
    <div className="form-group">
      <div className="top">
        <h2>내역 추가</h2>
        <ClearIcon
          className="x-icon"
          onClick={() => {
            onClear();
          }}
        />
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="main">
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            max={getDate()}
            required
          />
          <br />
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <br />
          <label>금액</label>
          <input
            type="text" // type 변경
            value={amount}
            onChange={(e) => {
              handleAmount(e);
            }}
            maxLength={10}
            required
          />
          <br />
          <div className="type">
            <label>수입</label>
            <input
              type="radio"
              name="type"
              value="income"
              checked={expenseType === "income"}
              onChange={(e) => {
                setExpenseType(e.target.value);
              }}
            />
            <label>지출</label>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={expenseType === "expense"}
              onChange={(e) => {
                setExpenseType(e.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit">완료</button>
      </form>
    </div>
  );
}
