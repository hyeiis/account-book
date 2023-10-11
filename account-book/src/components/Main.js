import "../scss/react-calender.scss";
import "../scss/main.scss";
import React, { useState } from "react";
import CalendarCustom from "./Calendar";
import expenseBox from "../assets/in&outcome-box.svg";

export default function Main() {
  const [income, setIncome] = useState(0); // 수입
  const [expenditure, setExpenditure] = useState(0); //지출

  return (
    <>
      <section>
        <div className="main-box">
          <CalendarCustom />
          <img src={expenseBox} alt="box" className="expenseBox" />
          <div className="btnGroup">
            <button>1</button>
            <button>2</button>
          </div>
        </div>
        <div className="second-box"></div>
      </section>
    </>
  );
}
