import React, { useContext, useEffect, useState } from "react";
import { addComma } from "../util/_numberUtils";
// import { FilterContext } from "./PocketContainer";
import "../scss/expenseBox.scss";

export default function ExpenseBox() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(
    () => {
      let total = { balance: 0, income: 0, expense: 0 };

      // if (filteredItems.length > 0) {
      //   // 자산, 수입, 지출 합계 계산
      //   filteredItems.forEach((item) => {
      //     if (item.amountType === "income") {
      //       total.balance += +item.amount;
      //       total.income += +item.amount;
      //     } else {
      //       total.balance -= +item.amount;
      //       total.expense += +item.amount;
      //     }
      //   });
      // }

      setTotalBalance(total.balance);
      setTotalIncome(total.income);
      setTotalExpense(total.expense);
    },
    //  [filteredItems]
  );

  return (
    <div className="budget__status">
      <div className="budget__status-title">
        <strong>{addComma(totalBalance.toString())}원</strong>
      </div>

      <div className="budget__status-detail">
        <div className="budget__status-detail--desc">
          <span>수입</span>
          <strong>{addComma(totalIncome.toString())}원</strong>
        </div>
        <div className="budget__status-detail--desc">
          <span>지출</span>
          <strong>{addComma(totalExpense.toString())}원</strong>
        </div>
      </div>
    </div>
  );
}
