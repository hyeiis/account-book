import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_EXPENSE } from "../store/expense-store";
import ClearIcon from "@mui/icons-material/Clear";
import { enteredOnlyNumber, addComma, deleteComma } from "../util/_numberUtils";
import { generateUniqueId } from "../util/generateUniqueId";
import "../scss/expenseForm.scss";

export default function ExpenseForm({ onSubmit, onClear }) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);
  const [expenseType, setExpenseType] = useState("income");
  const dispatch = useDispatch();

  const getDate = useCallback(() => {
    return new Date().toISOString().substring(0, 10);
  }, []);

  const handleAmount = (e) => {
    let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(e.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    const numericValue = enteredOnlyNumber(e.target.value);
    const formattedAmount = deleteComma(numericValue); // 쉼표 제거
    setAmount(addComma(formattedAmount)); // 쉼표 추가
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredData = {
      id: generateUniqueId(), // 고유 ID 생성
      date,
      title,
      amount: parseFloat(deleteComma(amount)),
      amountType: expenseType,
    };

    dispatch({ type: ADD_EXPENSE, expense: enteredData });

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
      <form onSubmit={handleSubmit}>
        <div className="main">
          <div>
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
          </div>
          <div>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>

          <div>
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
            {/* {isEnteredWrongAmount && (
              <p className="error-message">금액은 10자 이하로 입력하세요.</p>
            )} */}
          </div>
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
